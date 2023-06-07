import { useNavigate } from 'react-router-dom'
import './Modal.css'

const Modal = ({ show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none'
  const navigate = useNavigate()

  const handleClose = () => {
    navigate('/')
  }

  return (
    <div className={showHideClassName}>
      <section className='modal-main'>
        {children}
        <button type='button' onClick={handleClose}>
          Go Home
        </button>
      </section>
    </div>
  )
}

export default Modal
