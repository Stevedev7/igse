import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Form from "../../components/Form";
import Input from "../../components/Inputs/Input";
import Layout from "../../components/Layout";

import "./RegisterPage.css";

const RegisterPage = () => {
	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLaststName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstLine, setFirstLine] = useState("");
	const [secondLine, setSecondLine] = useState("");
	const [city, setCity] = useState("");
	const [postCode, setPostCode] = useState("");
	const [voucher, setVoucher] = useState("");
	const [bedrooms, setBedrooms] = useState(0);
	const [propertyType, setPropertyType] = useState("detached");

	const navigate = useNavigate();

	const URI = "http://localhost:8000";

	const onSubmit = (e) => {
		e.preventDefault();

		const payload = {
			name: {
				firstName,
				lastName,
			},
			address: {
				firstLine,
				city,
				postCode,
			},
			bedrooms,
			propertyType,
			email,
			password,
			confirm: confirmPassword,
			voucher,
		};
		if (middleName !== "") {
			payload.name["middleName"] = middleName;
		}

		if (secondLine !== "") {
			payload.address["secondLine"] = secondLine;
		}

		console.log(payload);
		axios
			.post(`${URI}/user/register`, payload, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				setInterval(() => {
					navigate("/login");
				}, 1000);
			})
			.catch((e) => alert(e.response.data.error));
	};

	return (
		<Layout header={"igse"}>
			<Form
				onSubmit={onSubmit}
				header="register"
				buttonClassName={"form-submit"}
				buttonText="Register"
			>
				<div className="form-group">
					<h3>Name</h3>
					<Input
						id="first-name"
						name="First Name"
						type="text"
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<Input
						id="middle-name"
						name="Middle Name"
						type="text"
						onChange={(e) => setMiddleName(e.target.value)}
					/>
					<Input
						id="last-name"
						name="Last Name"
						type="text"
						onChange={(e) => setLaststName(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<h3>Address</h3>
					<Input
						id="address-first-line"
						name="Address First-line"
						type="text"
						onChange={(e) => setFirstLine(e.target.value)}
					/>

					<Input
						id="address-second-line"
						name="Address Second-line"
						type="text"
						onChange={(e) => setSecondLine(e.target.value)}
					/>
					<Input
						id="city"
						name="City"
						type="text"
						onChange={(e) => setCity(e.target.value)}
					/>
					<Input
						id="post-code"
						name="Post Code"
						type="text"
						onChange={(e) => setPostCode(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<h3>Property Details</h3>
					<select
						placeholder="Property Type"
						onChange={(e) => setPropertyType(e.target.value)}
					>
						<option value="detached">Detached</option>
						<option value="semi-detached">Semi-detached</option>
						<option value="terraced">Terraced</option>
						<option value="flat">Flat</option>
						<option value="cottage">Cottage</option>
						<option value="bungalow">Bunglow</option>
						<option value="mansion">Mansion</option>
					</select>
					<Input
						type={"number"}
						id="no.-of-bedrooms"
						onChange={(e) => setBedrooms(Number(e.target.value))}
					/>
				</div>
				<div className="form-group">
					<h3>Credentials</h3>
					<Input
						id="email"
						name="Email"
						type="text"
						onChange={(e) => setEmail(e.target.value)}
					/>

					<Input
						id="password"
						name="Password"
						type="password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Input
						id="confirm-password"
						name="Confirm Password"
						type="password"
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<h3>Energy Voucher</h3>
					<Input
						id="voucher"
						name="voucher"
						type="text"
						onChange={(e) => setVoucher(e.target.value.toUpperCase())}
					/>
				</div>
			</Form>
		</Layout>
	);
};

export default RegisterPage;
