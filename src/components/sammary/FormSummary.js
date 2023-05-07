import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Card, Alert } from 'react-bootstrap';
import { validarUrlYoutube, getVideoId } from './helpers';
import Spinner from './spinner/Spinner';

const FormSammary = () => {
    const [valor, setValor] = useState('');
    const [valorVacio, setValorVacio] = useState(false);
    const [summary, setSumamary] = useState(null);
    const [spiner, setSpiner] = useState(false);
    const URL = 'http://localhost:4000/getSumary/:';

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (validarUrlYoutube(valor)) {
            setValorVacio(false)
            setSumamary(null)
            setSpiner(true);
            const idVideo = getVideoId(valor)
            try {
                const token = JSON.parse(localStorage.getItem('tokenUser')).token
                const resp = await fetch(URL + idVideo, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                        //esta linea no estoy seguro xq
                        'Authorization': 'Bearer'+ token
                    },
                })

                if (resp.status === 200) {
                    const data = await resp.json()
                    setSumamary(data.summary)
                    setSpiner(false);                    
                }

            } catch (error) {
                console.log(error)
            }
        } else {
            setValorVacio(true)
        }


    }

    return (
        <Container fluid className="h-100 d-flex flex-column align-items-center justify-content-center">
            <Row className="w-100">
                <Col lg={{ span: 8, offset: 2 }} className="col-12 col-lg-8">
                    <Card style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
                        <Card.Header as="h4" className="text-center">
                            Genera tu resumen en segundos de un video de YouTube
                        </Card.Header>
                        <Card.Body className='d-flex flex-column justify-content-center'>
                            <Form onSubmit={handleFormSubmit}>
                                {valorVacio ? (
                                    <Alert variant='danger' className="mt-4">
                                        URL vacia o no pertenece a YouTube
                                    </Alert>
                                ) : null}
                                <Form.Group className="m-1 d-flex flex-column flex-md-row align-items-center justify-content-center">
                                    <Form.Control
                                        type='text'
                                        placeholder='https://www.youtube.com/watch?v=nVuDtgfdgd7798zqkalo'
                                        onChange={(e) => setValor(e.target.value.trimStart())}
                                        value={valor}
                                        className={valorVacio ? "border border-danger" : ""}
                                    />
                                    <Button variant='dark' type='submit' className="mt-3 mt-md-0">
                                        Generar
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>

                    {spiner ? (
                        <div className="m-5 d-flex justify-content-center align-items-center">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : null}

                    <div className='m-5 d-flex justify-content-center text-center'>
                        {summary && (
                            <div>
                                <h3>Resumen</h3>
                                <p>{summary}</p>

                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default FormSammary;