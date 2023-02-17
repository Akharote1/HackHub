import { Form } from "react-bootstrap";
import { FormGroup, FormLabel, FormText, FormControl } from "react-bootstrap";

function InputBox(props) {
	const {
		label,
		type,
		placeholder,
		className,
		controlClass,
		userInfo,
		onChange,
		...rest
	} = props;
	return (
		<FormGroup className={className + " w-50 mb-2"}>
			<FormLabel>{label}</FormLabel>
			<FormControl
				type={type}
				placeholder={placeholder}
				className={controlClass}
				{...rest}
				value={userInfo[label.toLowerCase()]}
				onChange={onChange}
			/>
		</FormGroup>
	);
}

export default InputBox;
