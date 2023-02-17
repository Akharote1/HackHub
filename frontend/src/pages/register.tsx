import { useState, useEffect } from "react";
import { Button, DropdownButton, Stack } from "react-bootstrap";
import { Form } from "react-bootstrap";
import {
	FormGroup,
	FormLabel,
	FormText,
	FormControl,
	FormSelect,
} from "react-bootstrap";
import InputBox from "../components/misc/InputBox";
import data from "../../data/organization.json";
import { useRouter } from "next/router";
import Link from "next/link";

function Register() {
	const router = useRouter();
	const [userInfo, setUserInfo] = useState({
		name: "",
		email: "",
		password: "",
		confirmpassword: "",
		phone: "",
		gender: "",
		organization: "",
	});
	const { organization } = data;
	const dropdownAge = [
		{ value: "Male", label: "Male" },
		{ value: "Female", label: "Female" },
		{ value: "Other", label: "Other" },
	];

	useEffect(() => {
		console.log(userInfo);
	}, [userInfo]);

	return (
		<div
			className="d-flex"
			style={{
				height: "100vh",
				width: "100vw",
				color: "#19339b",
				backgroundColor: "#FFF",
			}}
		>
			<div className="w-50  h-100 d-flex justify-content-center align-items-center">
				<img src="illustration.jpg" alt="" width={"600px"} />
			</div>
			<Form
				className="w-50 h-100 pl-l-5 d-flex flex-column justify-content-center form"
				onSubmit={(e) => {
					e.preventDefault();
					console.log(userInfo);
				}}
			>
				<h1 className="ms-5 mb-5">Welcome!</h1>
				{/* <div> */}
				<div className="d-flex pl-xl-5 flex-wrap   w-100 px-lg-5">
					<InputBox
						label={"Name"}
						placeholder={"Enter your name"}
						type={"text"}
						controlClass={"w-75"}
						onChange={(e) => {
							setUserInfo({ ...userInfo, name: e.target.value });
						}}
						userInfo={userInfo}
					/>
					<InputBox
						label={"Email"}
						placeholder={"Enter your email"}
						type={"email"}
						controlClass={"w-75"}
						onChange={(e) => {
							setUserInfo({ ...userInfo, email: e.target.value });
						}}
						userInfo={userInfo}
					/>
					<InputBox
						label={"Password"}
						placeholder={"Enter your password"}
						type={"password"}
						controlClass={"w-75"}
						onChange={(e) => {
							setUserInfo({ ...userInfo, password: e.target.value });
						}}
						userInfo={userInfo}
					/>
					<InputBox
						label={"Confirm Password"}
						placeholder={"Confirm your password"}
						type={"password"}
						controlClass={"w-75"}
						onChange={(e) => {
							setUserInfo({ ...userInfo, confirmpassword: e.target.value });
						}}
						userInfo={userInfo}
					/>
					<FormGroup className="w-50 mb-2">
						<FormLabel>Gender</FormLabel>
						<FormSelect
							onChange={(e) => {
								setUserInfo({ ...userInfo, gender: e.target.value });
							}}
							style={{ width: "75%" }}
						>
							<option>Enter your Gender</option>
							{dropdownAge.map((item) => {
								return (
									<option value={item.value} key={item.value}>
										{item.label}
									</option>
								);
							})}
						</FormSelect>
					</FormGroup>
					<InputBox
						label={"Phone"}
						placeholder={"Enter your phone number"}
						type={"text"}
						controlClass={"w-75"}
						onChange={(e) => {
							setUserInfo({ ...userInfo, phone: e.target.value });
						}}
						userInfo={userInfo}
					/>
					<FormGroup className="w-100 mb-2">
						<FormLabel>College Name</FormLabel>
						<FormSelect
							onChange={(e) => {
								setUserInfo({ ...userInfo, organization: e.target.value });
							}}
							style={{ width: "75%" }}
						>
							<option>Enter your Organization Name</option>
							{organization.map((item) => {
								return (
									<option value={item} key={item}>
										{item}
									</option>
								);
							})}
						</FormSelect>
					</FormGroup>
					<div className="d-flex flex-column w-100">
						<Link href="/login">Already have an account? Login</Link>
						<Button className="w-25 mt-5" variant="primary" type="submit">
							Submit
						</Button>
					</div>
				</div>
			</Form>
		</div>
	);
}

Register.getLayout = (page) => {
	return <>{page}</>;
};

export default Register;
