import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import URI from "../../constants";

import "./HomePage.css";

const HomePage = () => {
	const [tariffs, setTariffs] = useState([]);

	useEffect(() => {
		axios
			.get(`${URI}/igse/tariff`)
			.then((res) => {
				console.log(res.data.tariffs);
				setTariffs(res.data.tariffs);
			})
			.catch((e) => console.log(e.response));
	}, []);

	return (
		<Layout header={"Welcome"}>
			<div>
				<h2>Tariff</h2>
				<div className="tariffs">
					{tariffs.map((tariff) => (
						<h3 key={tariff.tariffType}>
							{tariff.tarrifType}{" "}
							<span>
								{" -> "}£ {tariff.rate} / {tariff.unit}
							</span>
						</h3>
					))}
					<div>
						<Link to="/login">Login</Link>
						<Link to="/register">Registeer</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default HomePage;
