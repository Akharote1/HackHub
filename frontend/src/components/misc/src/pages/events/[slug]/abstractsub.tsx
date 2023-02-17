import {Card, Form, FormGroup, FormLabel, FormControl} from 'react-bootstrap'
function AbstractSub() {
	return(
        <div className='d-flex flex-column justify-content-center align-items-center  py-5'>
            <Card className="shadow" style={{width:'70%', border:'none', height:'45px', background:'#19339b', color:'white'}}>                                      
                <Card.Header style={{border:'none'}}>
                    <b>Abstract Submission</b>
                </Card.Header>
            </Card>
            <Card className='mt-3 shadow' style={{width:'70%', border:'none'}}>
                <Card.Body>
                    <b>Problem Statement</b>
                </Card.Body>
            </Card>
            <Card className='mt-3 shadow' style={{width:'70%', border:'none'}}>
                <Card.Body>
                    <Form>
                    <FormGroup className="w-100 mb-3 required " >
						<FormControl type="text" placeholder="Abstract" style={{height:"50px"}}/>
					</FormGroup>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

AbstractSub.getLayout = (page) => {
	return page;
};
export default AbstractSub;