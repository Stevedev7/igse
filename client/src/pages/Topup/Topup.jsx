import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import Input from "../../components/Inputs/Input";
import Layout from "../../components/Layout";
import URI from "../../constants";

const Topup = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState({});
	const [code, setCode] = useState("");
	const token = localStorage.getItem("token");

	useEffect(() => {
		if (token !== null && token !== "") {
			axios
				.get(`${URI}/token`, {
					headers: {
						Authorization: "Bearer " + token,
					},
				})
				.then((res) => {
					axios
						.get(URI + "/user", {
							headers: {
								Authorization: "Bearer " + token,
							},
						})
						.then((res) => {
							setUser(res.data);
						})
						.catch((e) => console.log(e));
				})
				.catch((e) => console.log(e));
		} else {
			navigate("/login");
		}
	}, []);

	const topUp = (e) => {
		e.preventDefault();
		axios
			.post(
				`${URI}/user/topup`,
				{ code },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then((res) => navigate("/dashboard"))
			.catch((e) => {
				console.log(e.response);
			});
	};
	return (
		<Layout>
			<Form
				buttonClassName={"form-submit"}
				buttonText={"Topup"}
				onSubmit={topUp}
				header={"EVC"}
			>
				<Input
					type={"text"}
					id="code"
					onChange={(e) => setCode(e.target.value)}
				/>
			</Form>
		</Layout>
	);
};

export default Topup;
