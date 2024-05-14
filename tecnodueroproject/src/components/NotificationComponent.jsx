import React from "react";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
const NotificationComponent = ({setShowNotification, showNotification, title, body}) => {
    
    return (
        <>
            <Row>
                <Col xs={6}>
                    <ToastContainer position="bottom-end" className="p-3" style={{ zIndex: 1 }}>
                        <Toast onClose={() => setShowNotification(false)} show={showNotification} delay={5000} bg="success" autohide>
                            <Toast.Header>
                                <img
                                    src="holder.js/20x20?text=%20"
                                    className="rounded me-2"
                                    alt=""
                                />
                                <strong className="me-auto">{title}</strong>
                                <small></small>
                            </Toast.Header>
                            <Toast.Body className="text-white">{body}</Toast.Body>
                        </Toast>
                    </ToastContainer>
                </Col>
            </Row>
        </>
    )
}
export default NotificationComponent