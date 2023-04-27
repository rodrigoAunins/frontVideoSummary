import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Card, Alert } from 'react-bootstrap';
import { validarUrlYoutube } from './helpers';
import Spinner from './spinner/Spinner';

const FormSammary = () => {
    const [valor, setValor] = useState('')
    const [valorVacio, setValorVacio] = useState(false)
    const [summary, setSumamary] = useState(null)
    const [spiner, setSpiner] = useState(false)
    const URL = "https://localhost:7284/GetVideoSummary"

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        

        if (validarUrlYoutube(valor)) {
            setValorVacio(false)
            setSpiner(true);
            const URI = valor
            try {

                const resp = await fetch(URL, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(URI)
                })

                const data=  await resp.json()
                console.log(data)   

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
                            Genera tu resmuen en segundos de un video de YouTube
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
                                <h1>{summary.titulo}</h1>
                                <h3>Resumen</h3>
                                <p>{summary.resumen}</p>
                                <p>Fecha de Consulta: {summary.fecha}</p>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default FormSammary;