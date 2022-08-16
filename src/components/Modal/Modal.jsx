import PropTypes from "prop-types";
import './Modal.scss'

export default function Modal({showModal, children, title, setShowModal}) {
  return <>
    <div className={"modal " + (showModal ? 'show' : 'hide')} id="BombHouseModal">
      <div className="modal-wrapper">
        <div className="modal-header">
          <h1>{title}</h1>
          <button onClick={() => {
            setShowModal(false)
          }} className="close"><i className={'fa fa-close'}></i></button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  </>
}

Modal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired
}