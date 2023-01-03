import Button from "../Button";
import Header from "../Header";
import { StyledForm } from "./styles";

const Form = ({ children, onSubmit, header, buttonClassName, buttonText }) => {
	return (
		<StyledForm onSubmit={onSubmit}>
			<Header content={header} className="form-header" />
			{children}
			<Button text={buttonText} className={buttonClassName} />
		</StyledForm>
	);
};

export default Form;
