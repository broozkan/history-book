import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import FormStudentRemoveRequest from '../Form/FormStudentRemoveRequest'


const ModalNewRemoveRequest = (props) => {

    const [show, setShow] = useState(true)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Kaldırma Talebi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormStudentRemoveRequest student={props.student} />
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

export default ModalNewRemoveRequest