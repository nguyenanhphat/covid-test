import React, { useRef, useState } from 'react';
import { CovidDetail } from '../';
import { API_DETAIL, API_DETAIL_PERIOD_TIME, KEY_BOOKMARK, KEY_DELETE } from './../../constants';
import Loading from '../common/Loading';
import ModalConfirm from '../common/ModalConfirm';
import { formatDate } from '../../utils/dateHelper';
import { numberWithCommas } from '../../utils/numberHelper';
import './styles.css';

const ListCovid = ({
  data = [],
  loading = false,
  toggleLoading
}) => {
  const [showModal, setShowModal] = useState(false);

  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const idSelected = useRef(null);

  const [detailData, setDetailData] = useState([]);
  
  const [bookmarkData, setBookmarkData] = useState(localStorage.getItem(KEY_BOOKMARK) ? JSON.parse(localStorage.getItem(KEY_BOOKMARK)) : {});
  const [deleteData, setDeleteData] = useState(localStorage.getItem(KEY_DELETE) ? JSON.parse(localStorage.getItem(KEY_DELETE)) : {});
  
  const _handleShowDetail = (item) => {
    toggleLoading();
    Promise.all([
      fetch(API_DETAIL.replace('{code}', item.CountryCode)),
      fetch(API_DETAIL_PERIOD_TIME.replace('{code}', item.CountryCode))
    ])
      .then(res => Promise.all(res.map(r => r.json())))
      .then(data => {
        setDetailData(data);
        toggleLoading();
        _toggleModal();
      })
  };

  const _toggleModal = () => {
    setShowModal(prev => !prev);
  }

  const _handleBookmark = (item) => {
    const newData = {
      ...bookmarkData,
      [item.ID]: true
    };
    setBookmarkData(newData);
    localStorage.setItem(KEY_BOOKMARK, JSON.stringify(newData));
  }

  const _handleShowModalConfirm = (item) => {
    _toggleModalConfirm();
    idSelected.current = item.ID;
  }

  const _handleDelete = () => {
    if (!idSelected.current) {
      return;
    }

    const newData = {
      ...deleteData,
      [idSelected.current]: true
    };
    setDeleteData(newData);
    localStorage.setItem(KEY_DELETE, JSON.stringify(newData));
    _toggleModalConfirm();
  };

  const _toggleModalConfirm = () => {
    setShowModalConfirm(prev => !prev);
  }

  return (
    <div className="root-list-covid">
      {showModal && <CovidDetail toggleModal={_toggleModal} detailData={detailData} />}
      <ModalConfirm
        show={showModalConfirm}
        onClose={_toggleModalConfirm} 
        onConfirm={_handleDelete} 
      />
      <div className="wrapper-table">
        <table className="table-custom">
          <thead>
            <tr>
              <th>Date</th>
              <th>Country name</th>
              <th>Total confirmed</th>
              <th>Total deaths</th>
              <th>Total recovered</th>
              <th>Action</th>
            </tr>
          </thead>
          {data.length ? (
            <tbody>
              {data.map((item, index) => {
                if(!deleteData[item.ID]) {
                  return (
                    <tr key={index} className={bookmarkData[item.ID] && "item-bookmarked"}>
                      <td>{formatDate(item.Date)}</td>
                      <td>{item.Country}</td>
                      <td>{numberWithCommas(item.TotalConfirmed)}</td>
                      <td>{numberWithCommas(item.TotalDeaths)}</td>
                      <td>{numberWithCommas(item.TotalRecovered)}</td>
                      <td>
                        <button 
                          className="btn-primary mr5 mb5" 
                          onClick={() => _handleShowDetail(item)}
                        >Detail</button>
                        {!bookmarkData[item.ID] && (
                          <button 
                            onClick={() => _handleBookmark(item)} 
                            className="btn-primary mr5 mb5"
                          >Bookmark</button>
                        )}
                        <button 
                          onClick={() => _handleShowModalConfirm(item)}
                          className="btn-danger mb5"
                        >Remove</button>
                      </td>
                    </tr>
                  )
                }
              })}
            </tbody>
          ) : <tbody className="tbody-empty"></tbody>}
        </table>
        {loading && <Loading />}
      </div>
    </div>
  )
}

export default ListCovid
