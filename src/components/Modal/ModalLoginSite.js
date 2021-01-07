import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import FormLoginSite from '../Form/FormLoginSite'


const ModalLoginSite = () => {

    const [show, setShow] = useState(true)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Oturum Açın</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormLoginSite closeModal={handleClose} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Kapat
                    </Button>
           
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModalLoginSite