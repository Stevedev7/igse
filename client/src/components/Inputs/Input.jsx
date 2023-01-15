import { StyledInput } from "./styles";
import "./Input.css";

const Input = ({ id, type, onChange }) => {
	return (
		<div className="input">
			{type === "text" || "password" || "number" || "date" ? (
				<StyledInput
					type={type}
					id={id}
					onChange={onChange}
					placeholder={id.split("-").join(" ").toUpperCase()}
					min={1}
					max={10}
				/>
			) : (
				""
			)}
		</div>
	);
};

export default Input;
