import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import Input from "../../components/Inputs/Input";
import Layout from "../../components/Layout";
import URI from "../../constants";

const Voucher = () => {
	const navigate = useNavigate();

	const [code, setCode] = useState("");
	const [amount, setAmount] = useState(0);

	const token = localStorage.getItem("token");
	const onSubmit = (e) => {
		e.preventDefault();
		axios
			.post(
				`${URI}/igse/admin/voucher/new`,
				{ code, amount },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => navigate("/admin"))
			.catch((e) => {
				alert(JSON.stringify(e.response.data));
				navigate("/admin");
			});
	};

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
						.get(`${URI}/admin/verify`, {
							headers: {
								Authorization: "Bearer " + token,
							},
						})
						.then((res) => {
							console.log(res.data);
						})
						.catch((e) => navigate("/dashboard"));
				})
				.catch((e) => navigate("/login"));
		} else {
			navigate("/login");
		}
	}, []);
	return (
		<Layout header="Admin">
			<Form
				onSubmit={onSubmit}
				header="New Voucher"
				buttonClassName={"form-submit"}
				buttonText="Create"
			>
				<Input
					id="code"
					name={"Code"}
					type="text"
					onChange={(e) => setCode(e.target.value)}
				/>
				<Input
					id="amount"
					name={"Amount"}
					type="text"
					onChange={(e) => setAmount(Number(e.target.value))}
				/>
			</Form>
		</Layout>
	);
};

export default Voucher;
