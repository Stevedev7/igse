import { Link, useParams } from "react-router-dom";
import "./Reading.css";

const Raeding = ({ reading }) => {
	const { id } = useParams();
	return (
		<div className="reading">
			<span>£ {reading.bill}</span>{" "}
			<span>
				{reading.paymentStatus} <Link to={"#"}>Veiw</Link>
			</span>
		</div>
	);
};

export default Raeding;
