import { faClock, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect, useContext } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useRouter } from 'next/router';
import axios from 'axios';
import ReactImageGallery from "react-image-gallery";
import Chip from '../../../components/common/Chip';
import Link from "next/link"

const Event = () => {

    const EVENT_CAPACITY = 3;


    const router = useRouter();
    const data = router.query;
    return (
        <>
            <div
                className='d-flex justify-content-center align-items-center flex-column'
                style={{
                    backgroundColor: 'black',
                    height: '40vh'
                }}>
                <Image
                    className=''
                    style={{
                        width: '100%',
                        height: '40vh',
                        opacity: '0.5',
                        objectFit: 'cover',
                        objectPosition: 'center',
                        filter: 'blur(8px)',
                        position: 'absolute'
                    }}
                    src="https://via.placeholder.com/1535x420"
                />

                <h1
                    className=''
                    style={{
                        zIndex: 111,
                        color: '#FFF',
                        textShadow: '0 4px 8px rgba(0,0,0,0.5)'
                    }}>
                    SPIT Hackathon
                </h1>

                <span
                    className='text-white fw-semibold'
                    style={{
                        fontSize: '1.125rem',
                        textShadow: '0 4px 8px rgba(0,0,0,0.5)'
                    }}
                >
                    By Unknown
                </span>
            </div>

            <div className='d-flex justify-content-center px-4 py-3 align-items-center text-center '>
                <Card style={{ height: 'auto', width: '100%', maxWidth: '1028px' }} className="shadow">
                    <Container className="d-flex justify-content-start align-items-center flex-row mt-2 border-none">
                        <HighlightItem
                            icon={faClock}
                            name="Start Date"
                            value=""
                        />

                        <HighlightItem
                            icon={faClock}
                            name="End Date"
                            value=""
                        />

                        <HighlightItem
                            icon={faMapMarker}
                            name="Location"
                            value="Online"
                        />
                        <HighlightItem
                            icon={faClock}
                            name="Registration Deadline"
                            value=""
                        />

                        <span className='ms-auto px-3 text-secondary'>
                            0 registered
                        </span>

                       <Link href="#"> <Button className='me-3' style={{ background: "#19339b" }}>
                            {'Register For Event'}
                        </Button></Link>
                    </Container>
                    <div className="d-flex justify-content-center align-items-center flex-row mt-2">
                        <Chip
                            name="Web Dev"
                        ></Chip>
                        <Chip
                            name="App Dev"
                        ></Chip>
                        <Chip
                            name="Machine Learning"
                        ></Chip>
                        <Chip
                            name="Blockchain"
                        ></Chip>
                        <Chip
                            name="Cloud Computing"
                        ></Chip>
                    </div>
                </Card>
            </div>

            <div>

                <Container>
                    <Card className="mb-2 shadow border-none rounded-3" style={{ background: "transparent", border: "none" }}>
                        <Card.Header className='rounded-3' style={{ background: "white", border: "none" }}>
                            <b>Event Description</b>
                        </Card.Header>
                    </Card><Card className="mb-2 shadow border-none rounded-3" style={{ background: "transparent", border: "none" }}>
                        <Card.Body className='rounded-3' style={{ background: "white", border: "none" }}>
                            
                                <Card style={{ border: "none", }}>
                                    <Card.Header style={{ border: "none", background: "white" }}><b>Time Line and Stages</b></Card.Header>
                                <Card.Body>
                                        
                                    
                                  

                                        
                                            <Row className=" bg-white rounded border">
                                                <div>Round 1</div>
                                                <p>description</p>
                                                <b>Start Date: </b>
                                                <b>End Date: </b>
                                            </Row>
                                            <Row className="mt-4 bg-white rounded border">
                                                <div>Round 2</div>
                                                <p>description</p>
                                                <b>Start Date: </b>
                                                <b>End Date: </b>
                                            </Row>
                                        
                                    </Card.Body>

                                </Card>
                                
                                </Card.Body></Card>
                             
                                    
                            
                                <Card className="mb-2 shadow border-none rounded-3 p-2" style={{ border: "none", background: "white" }}>
                                    <Card.Header style={{ border: "none", background: "white" }}>
                                        <b>All that you need to know about the Hackathon:</b>
                                    </Card.Header>
                                    <Card.Body>

                                            <b>Description:</b>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti harum id alias minus aut, doloremque temporibus illo maiores sit repudiandae, esse dolore, quo fugit fugiat at eius modi ut quae.</p>
                                            <b>
                                                Date:
                                            </b>
                                            <br/>
                                            <br />
                                            <b>Team size: </b>
                                            <br/>
                                            <br />
                                            <b>Eligibility criteria:</b>
                                            
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, recusandae maxime distinctio quia quis voluptates natus fugit cumque, porro dignissimos nisi temporibus ex eius a dolore mollitia odio magni sit?</p>
                                            <b>Fees:</b>
                                            <br/>
                                            <br />
                                            <b>Prize Pool: </b>
                                            <br/>
                                            <br />
                                            <b>Discord server: </b>
                                            <br/>
                                            <br />
                                            <b>Venue:</b>
                                            <br/>
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, repellendus voluptatum vel accusamus ex soluta officia ab, pariatur eaque quisquam minima hic expedita nisi facere debitis dolor blanditiis, adipisci enim.</p>
                                            <b>Contact the organizers:</b>
                                            <br/>
                                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam blanditiis doloribus iste, laboriosam ea dignissimos id voluptas dolorum asperiores corrupti obcaecati quae, beatae ipsa sint nesciunt minus aspernatur ipsum perspiciatis.</p>
                                        
                                    </Card.Body>

                                </Card>
                                
                            </Container>
                        
                
            </div>
        </>
    );
};

const HighlightItem = ({
    icon,
    name,
    value
}) => {
    return (
        <div className="d-flex align-items-center justify-item-center flex-column px-3 border-end">
            <div className='d-flex align-items-center h-100 text-secondary fw-semibold' style={{ fontSize: '12px' }}>
                <FontAwesomeIcon
                    className="text-primary"
                    style={{ width: '28px' }}
                    icon={icon}
                />
                {name}
            </div>
            <span className="fw-semibold">{value}</span>
        </div>
    )
}

Event.getLayout = (page) => {
    return <>{page}</>;
};

export default Event;