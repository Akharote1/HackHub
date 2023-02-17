import {Card, FormGroup, FormLabel, FormControl, Button, Form} from 'react-bootstrap'
import { uploadFilesToCloud } from "../../../utils";
import DropFileUpload from "../../../components/common/DropFileUpload";
function submission(){
    return(
        <div className='d-flex flex-column justify-content-center align-items-center  py-5'>
            
            <Card className="shadow" style={{width:'70%', border:'none', height:'45px', background:'#19339b', color:'white'}}>                                      
                <Card.Header style={{border:'none'}}>
                    <b>Final Submission</b>
                </Card.Header>
            </Card>
            <Card className='mt-3 shadow' style={{width:'70%', border:'none'}}>
                <Card.Body>
                <Form className="">
                <FormGroup className="w-100 mt-2 mb-4 required">
						<FormLabel><b>Github Link:</b></FormLabel>
						<FormControl type="text" placeholder="link" 
						/>
					</FormGroup>
                    <div className="" >
                    <FormGroup className="w-100 mb-4 me-4">
							<FormLabel><b>Video Presentation</b></FormLabel>
							<DropFileUpload
								text=" Video"
								multiple={false}
								uploadFiles={async (files, rejected) => {
									const urls = await uploadFilesToCloud(files, "testing/");
									console.log(urls);
								}}
							/>
                        </FormGroup>
					</div>
                    <div className="" >
                    <FormGroup className="w-100 mb-3 me-4">
							<FormLabel><b>Presentation</b></FormLabel>
							<DropFileUpload
								text=" presentation"
								multiple={false}
								uploadFiles={async (files, rejected) => {
									const urls = await uploadFilesToCloud(files, "testing/");
									console.log(urls);
								}}
							/>
                        </FormGroup>
					</div>
                    <Button className='mt-4'>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
            
        </div>
    )
}
submission.getLayout = (page) => {
	return page;
};
export default submission;