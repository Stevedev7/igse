import { StyledH1 } from "./styles";
import "./Header.css";

const Header = ({ content, className }) => {
	return <StyledH1 className={className}>{content}</StyledH1>;
};

export default Header;
