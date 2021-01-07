import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import FormStudentVerifyRequest from '../Form/FormVerifyStudent'


const ModalNewStudentVerifyRequest = (props) => {

    const [show, setShow] = useState(true)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Onaylama Talebi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormStudentVerifyRequest student={props.student} />
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

export default ModalNewStudentVerifyRequest