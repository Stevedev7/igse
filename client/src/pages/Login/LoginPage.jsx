import { useState } from "react";
import axios from "axios";

import Form from "../../components/Form";
import Input from "../../components/Inputs/Input";
import Layout from "../../components/Layout";

const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const URI = "http://localhost:8000";axios
			.post(
				`${URI}/user/login`,
				{
					email,
					password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((res) => res.data)
			.then(({ accessToken }) => localStorage.setItem("token", accessToken))
			.catch((e) => alert(e.response.data.error));

	const onSubmit = (e) => {
		e.preventDefault();
		axios
			.post(
				`${URI}/user/login`,
				{
					email,
					password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((res) => res.data)
			.then(({ accessToken }) => localStorage.setItem("token", accessToken))
			.catch((e) => alert(e.response.data.error));
	};
	return (
		<Layout header={"Login"}>
			<Form
				onSubmit={onSubmit}
				header="login"
				buttonClassName={"form-submit"}
				buttonText="Login"
			>
				<Input
					id="email"
					name={"Email"}
					type="text"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					id="password"
					name={"Password"}
					type="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Form>
		</Layout>
	);
};

export default LoginPage;
