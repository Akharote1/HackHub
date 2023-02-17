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
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUser } from "../hooks/AuthContext";

function Login() {
	const router = useRouter();
	const [userInfo, setUserInfo] = useState({
		email: "",
		password: "",
	});
	const { user, login } = useUser();
	const [loading, setLoading] = useState(false);

	const disabled = userInfo.email == "" || userInfo.password == "" || loading;

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
			<Form
				className="w-50 h-100 pl-l-5 d-flex flex-column justify-content-center form"
				onSubmit={async (e) => {
					e.preventDefault();
					setLoading(true)
					try {
						await login(userInfo)
						router.push('/')
					} catch (error) {
						console.log(error)
					}
					setLoading(false)
					
				}}
			>
				<h1 className="ms-5 mb-5">Welcome to HackHub!</h1>
				{/* <div> */}
				<div className="d-flex pl-xl-5 flex-column  w-100 px-lg-5">
					<InputBox
						label={"Email"}
						placeholder={"Enter your email"}
						type={"email"}
						controlClass={"w-100"}
						onChange={(e) => {
							setUserInfo({ ...userInfo, email: e.target.value });
						}}
						userInfo={userInfo}
					/>
					<InputBox
						label={"Password"}
						placeholder={"Enter your password"}
						type={"password"}
						controlClass={"w-100"}
						onChange={(e) => {
							setUserInfo({ ...userInfo, password: e.target.value });
						}}
						userInfo={userInfo}
					/>

					<div className="d-flex flex-column w-100">
						<Link href="/register">Don't have an account? Register</Link>
						<Button className="w-25 mt-5" variant="primary" type="submit" disabled={disabled}>
							Submit
						</Button>
					</div>
				</div>
			</Form>
			<div className="w-50  h-100 d-flex justify-content-center align-items-center">
				<img src="illustration.jpg" alt="" width={"600px"} />
			</div>
		</div>
	);
}

Login.getLayout = (page) => {
	return <>{page}</>;
};

export default Login;
