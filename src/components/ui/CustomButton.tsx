import React from "react";
import { Button, ButtonProps } from "@mui/material";

type Props = { label?: string } & ButtonProps;

function CustomButton(props: Props) {
    const { label, ...rest } = props;
    return (
        <Button color="primary" variant="contained" sx={{ m: 1 }} {...rest}>
            {label}
        </Button>
    );
}

export default CustomButton;
