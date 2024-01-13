import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

type Props = TextFieldProps;

function CustomTextField(props: Props) {
    const { ...rest } = props;
    return <TextField multiline fullWidth={true} size="small" sx={{ m: 1 }} {...rest} />;
}

export default CustomTextField;
