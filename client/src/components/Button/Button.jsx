import "./Button.css";

const Button = ({ className, text }) => {
	return (
		<button className={className} type="submit">
			{text}
		</button>
	);
};

export default Button;
