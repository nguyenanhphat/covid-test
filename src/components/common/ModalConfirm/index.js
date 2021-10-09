import React from 'react'
import ModalCustom from '../Modal/index';
import './styles.css';
const ModalConfirm = ({
  title = 'Are you sure delete ?',
  content = 'Item will be permanently deleted?',
  show = true,
  txtSubmit = 'Yes',
  txtCancel = 'No',
  onConfirm = () => null,
  onClose = () => null
}) => {
  return (
    <ModalCustom width="30%" onClose={onClose} show={show} title={title}>
      <div className="content-modal-confirm">
        {content}
      </div>

      <div className="action-modal-confirm">
        <button 
          onClick={onConfirm}
          className="btn-danger mr5 mb5"
        >{txtSubmit}</button>
        <button 
          className="btn-primary mb5"
          onClick={onClose}
        >{txtCancel}</button>
      </div>
    </ModalCustom>
  )
}
export default ModalConfirm