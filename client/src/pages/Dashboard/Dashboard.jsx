import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import URI from "../../constants";

import "./Dashboard.css";

const Dashboard = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState({});

	useEffect(() => {
		const token = localStorage.getItem("token");

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
				.catch((e) => navigate("/login"));
		} else {
			navigate("/login");
		}
	}, []);

	return (
		<Layout header="About me">
			<div className="dashboard">
				<div className="about">
					<ul>
						<li>
							Property type:
							<span id="property-type"> {user.propertyType}</span>
						</li>
						<li>
							Bedrooms: <span> {user.bedrooms}</span>
						</li>
					</ul>
					<h3>Balance: {user.balance}</h3>
					<div className="button-container">
						<button onClick={(e) => navigate("/user/topup")}>Topup</button>
						<button onClick={(e) => navigate("/user/readings")}>
							Readings
						</button>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default Dashboard;
