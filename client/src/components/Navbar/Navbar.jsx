import { StyledLi, StyledNav, StyledUl, StyledBranding } from "./styles";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
	return (
		<StyledNav>
			<StyledBranding className="branding">
				<Link to="/">iGSE</Link>
			</StyledBranding>
			<StyledUl>
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
