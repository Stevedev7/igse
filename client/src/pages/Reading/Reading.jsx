import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import Input from "../../components/Inputs/Input";
import Layout from "../../components/Layout";
import URI from "../../constants";

const Reading = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");
	const [dayReading, setDayReading] = useState(0);
	const [nightReading, setNightReading] = useState(0);
	const [gasReading, setGasReading] = useState(0);
	const [date, setDate] = useState(null);

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
						.then((res) => res.data)
						.catch((e) => navigate("/login"));
				})
				.catch((e) => navigate("/login"));
		} else {
			navigate("/login");
		}
	}, []);

	const topUp = (e) => {
		e.preventDefault();
		axios
			.post(
				`${URI}/user/reading/new`,
				{ dayReading, nightReading, gasReading, date },
				{ headers: { Authorization: `Bearer ${token}` } }
			)
			.then((res) => navigate("/dashboard"))
			.catch((e) => {
				alert(e.response.data.error);
			});
	};

	return (
		<Layout header="Readings">
			<Form
				buttonClassName={"form-submit"}
				buttonText={"Add Reading"}
				onSubmit={topUp}
				header={"Create"}
			>
				<Input
					type={"text"}
					id="day-Reading"
					onChange={(e) => setDayReading(e.target.value)}
				/>
				<Input
					type={"text"}
					id="night-Reading"
					onChange={(e) => setNightReading(e.target.value)}
				/>
				<Input
					type={"text"}
					id="gas-Reading"
					onChange={(e) => setGasReading(e.target.value)}
				/>

				<Input
					type="date"
					id="date"
					onChange={(e) => setDate(e.target.value)}
				/>
			</Form>
		</Layout>
	);
};

export default Reading;
