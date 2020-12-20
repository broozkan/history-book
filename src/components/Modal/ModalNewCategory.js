import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import FormCategory from '../Form/FormCategory'


const ModalCategory = () => {
    const [show, setShow] = useState(true)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Yeni Kategori Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormCategory />
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

export default ModalCategory