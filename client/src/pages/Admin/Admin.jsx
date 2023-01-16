import Layout from "../../components/Layout";
import { Link, useNavigate } from "react-router-dom";
import "./Admin.css";
import { useEffect } from "react";
import URI from "../../constants";
import axios from "axios";
const Admin = () => {
	const navigate = useNavigate();

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
		<Layout header={"Admin"}>
			<div className="admin-links">
				<Link to="/admin/vouchers/new">Add Vouchers</Link>
				<Link to="/admin/tariffs/set">Change Tariffs</Link>
			</div>
		</Layout>
	);
};

export default Admin;
