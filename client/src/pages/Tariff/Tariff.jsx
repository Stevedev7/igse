import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../components/Form";
import Input from "../../components/Inputs/Input";
import Layout from "../../components/Layout";
import URI from "../../constants";

const Tariff = () => {
	const navigate = useNavigate();

	const [day, setDay] = useState(0);
	const [night, setNight] = useState(0);
	const [gas, setGas] = useState(0);
	const [standing, setStanding] = useState(0);

	const [tariffs, setTariffs] = useState({});

	const token = localStorage.getItem("token");
	const submitDay = (e) => {
		e.preventDefault();
		axios
			.put(
				`${URI}/igse/admin/tariff/update/standing`,
				{
					rate: standing,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => navigate("/admin"))
			.catch((e) => {
				alert(JSON.stringify(e));
				navigate("/admin");
			});

		axios
			.put(
				`${URI}/igse/admin/tariff/update/gas`,
				{
					rate: gas,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => navigate("/admin"))
			.catch((e) => {
				alert(JSON.stringify(e));
				navigate("/admin");
			});

		axios
			.put(
				`${URI}/igse/admin/tariff/update/night`,
				{
					rate: night,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => navigate("/admin"))
			.catch((e) => {
				alert(JSON.stringify(e));
				navigate("/admin");
			});
		axios
			.put(
				`${URI}/igse/admin/tariff/update/day`,
				{
					rate: day,
				},
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

			axios
				.get(`${URI}/igse/tariff`)
				.then((res) => {
					setTariffs(res.data.tariffs);
				})
				.catch((e) => console.log(e.response.data));
		} else {
			navigate("/login");
		}
	}, []);
	return (
		<Layout header="Tariffs">
			<Form
				onSubmit={submitDay}
				header="Day Tariff"
				buttonClassName={"form-submit"}
				buttonText="Update"
			>
				<Input
					id="day-tariff"
					name={"Day Tariff"}
					type="text"
					onChange={(e) => setDay(Number(e.target.value))}
				/>
				<Input
					id="night-tariff"
					name={"Night Tariff"}
					type="text"
					onChange={(e) => setNight(Number(e.target.value))}
				/>
				<Input
					id="gas-tariff"
					name={"Gas Tariff"}
					type="text"
					onChange={(e) => setGas(Number(e.target.value))}
				/>
				<Input
					id="standing-tariff"
					name={"Gas Tariff"}
					type="text"
					onChange={(e) => setStanding(Number(e.target.value))}
				/>
			</Form>
		</Layout>
	);
};

export default Tariff;
