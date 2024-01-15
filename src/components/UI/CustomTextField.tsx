import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

/**
 * Custom TextField component that extends the Material-UI TextField.
 *
 * This component is a wrapper around the Material-UI TextField component. It includes default styling
 * and allows for additional props to be passed for further customization. It's primarily used to maintain
 * consistency in TextField styling across the application.
 *
 * @param {Object} props - The component props.
 * @param {TextFieldProps} props - Additional Material-UI TextFieldProps for further customization.
 * @returns {React.ReactElement} A React element representing a styled TextField.
 */

type Props = TextFieldProps;

function CustomTextField(props: Props) {
    const { ...rest } = props;
    return <TextField multiline fullWidth={true} size="small" sx={{ m: 1 }} {...rest} />;
}

export default CustomTextField;
