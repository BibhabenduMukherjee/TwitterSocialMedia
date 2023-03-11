
import "./Logout.css"
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { useNavigate } from 'react-router-dom'

function Logout() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  const navigate = useNavigate()
    function handleLogout(){
        localStorage.removeItem("user")
        handleClose();
        navigate("/login")
        
    }
  return (
    <div className='Logout'>
    <div>
    <p className="pplogout">Bye bye for this time</p>
    <button onClick={handleShow} className='btnd btn-danger' >Logout</button>
    </div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <button onClick={handleLogout} className="btnd">Logout</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Logout