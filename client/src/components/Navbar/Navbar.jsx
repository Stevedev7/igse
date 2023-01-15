import { StyledLi, StyledNav, StyledUl, StyledBranding } from "./styles";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useState } from "react";
const Navbar = ({ isLoggedIn }) => {
	return (
		<StyledNav>
			<StyledBranding className="branding">
				<Link to="/dashboard">iGSE</Link>
			</StyledBranding>
			<StyledUl>
				<StyledLi>
					<Link to="/" onClick={() => localStorage.removeItem("token")}>
						Logout
					</Link>
				</StyledLi>
				<StyledLi>
					<Link to="/login">Login</Link>
				</StyledLi>
				<StyledLi>
					<Link to="/register">Register</Link>
				</StyledLi>
			</StyledUl>
		</StyledNav>
	);
};

export default Navbar;
