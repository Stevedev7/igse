import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

import { useEffect, useState } from "react";
import axios from "axios";
import Topup from "./pages/Topup/Topup";
import Reading from "./pages/Reading";
function App() {
	const URI = "http://localhost:8000";

	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token == null || token == "") {
			setLoggedIn(false);
		} else if (token) {
			axios
				.get(`${URI}/token`, {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				})
				.then((res) =>
					res.status == 200 ? setLoggedIn(true) : setLoggedIn(false)
				)
				.catch((e) => setLoggedIn(false));
		}
	}, []);
	return (
		<>
			<Router>
				<Navbar isLoggedIn={loggedIn} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/user/topup" element={<Topup />} />
					<Route path="/user/readings" element={<Reading />} />
					<Route path="*" element={<div>Not found</div>} />
				</Routes>
			</Router>
		</>
	);
}

export default App;
