import Header from "../Header";
import "./Layout.css";
const Layout = ({ header, children }) => {
	return (
		<div className="page-layout">
			<div className="header">
				<Header content={header} />
			</div>
			<div className="children">{children}</div>
		</div>
	);
};

export default Layout;
