import { Form } from "react-bootstrap";
import { FormGroup, FormLabel, FormText, FormControl } from "react-bootstrap";

function InputBoxx(props) {
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
		<FormGroup className={className + " w-100 mb-2"}>
			<FormLabel>{label}</FormLabel>
			<FormControl style={{lineHeight:'10px', height:'50vh'}}
				type={type}
				placeholder={placeholder}
				className='input-lg'
				{...rest}
				// value={userInfo[label.toLowerCase()]}
				onChange={onChange}
                maxLength={300}
				
			/>
		</FormGroup>
	);
}

export default InputBoxx;