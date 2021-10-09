import React, { useState } from 'react';
import { CovidDetail } from '../';
import { API_DETAIL, API_DETAIL_PERIOD_TIME } from './../../constants';
import Loading from '../common/Loading/index';
import './styles.css';
import { formatDate } from '../../utils/dateHelper';
import { numberWithCommas } from '../../utils/numberHelper';

const ListCovid = ({
  data = [],
  loading = false,
  toggleLoading
}) => {
  const [showModal, setShowModal] = useState(false);
  const [detailData, setDetailData] = useState([]);
  
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

  return (
    <div className="root-list-covid">
      {showModal && <CovidDetail toggleModal={_toggleModal} detailData={detailData} />}
      <div className="wrapper-table">
        <table className="table-custom">
          <thead>
            <tr>
              <th>Date</th>
              <th>Country name</th>
              <th>Total confirmed</th>
              <th>Total deaths</th>
              <th>Total recovered</th>
            </tr>
          </thead>
          {data.length ? (
            <tbody>
              {data.map((item, index) => (
                <tr onClick={() => _handleShowDetail(item)} key={index}>
                  <td>{formatDate(item.Date)}</td>
                  <td>{item.Country}</td>
                  <td>{numberWithCommas(item.TotalConfirmed)}</td>
                  <td>{numberWithCommas(item.TotalDeaths)}</td>
                  <td>{numberWithCommas(item.TotalRecovered)}</td>
                </tr>
              ))}
            </tbody>
          ) : <tbody className="tbody-empty"></tbody>}
        </table>
        {loading && <Loading />}
      </div>
    </div>
  )
}

export default ListCovid
