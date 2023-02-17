import {Card, Form, FormGroup, FormLabel, FormControl, Button} from 'react-bootstrap'
import InputBoxx from '../../../components/misc/InputBoxx'
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
                    <InputBoxx
						
					/>
                    <Button style={{background:'#19339b', color:'white', marginTop:'20px'}}>Submit</Button>
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