import {
	Card,
	Form,
	FormGroup,
	FormLabel,
	FormControl,
	Button,
} from "react-bootstrap";

function AbstractSub() {
	const problemStatement =
		"lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Donec";

	return (
		<div className="d-flex flex-column justify-content-center align-items-center  py-5">
			<Card
				className="shadow bg-primary"
				style={{ width: "70%", border: "none", height: "45px", color: "white" }}
			>
				<Card.Header style={{ border: "none" }}>
					<b>Abstract Submission</b>
				</Card.Header>
			</Card>
			<Card className="mt-3 shadow" style={{ width: "70%", border: "none" }}>
				<Card.Body>
					<b>Problem Statement</b>
					<p>{problemStatement}</p>
					<Form className="mt-5">
						<FormGroup>
							<FormLabel>Abstract Solution</FormLabel>
							<FormControl
								as="textarea"
								rows={15}
								placeholder="Enter your solution here"
							/>
						</FormGroup>
						<Button
							style={{
								background: "#19339b",
								color: "white",
								marginTop: "20px",
							}}
						>
							Submit
						</Button>
					</Form>
					{/* </Card.Body> */}
				</Card.Body>
			</Card>
		</div>
	);
}

AbstractSub.getLayout = (page) => {
	return page;
};
export default AbstractSub;
