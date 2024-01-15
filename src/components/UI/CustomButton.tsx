import React from "react";
import { Button, ButtonProps } from "@mui/material";

/**
 * Custom button component that extends the Material-UI Button.
 *
 * This component is a wrapper around the Material-UI Button component. It includes default styling
 * and allows for additional props to be passed for further customization. It's primarily used to maintain
 * consistency in button styling across the application.
 *
 * @param {Object} props - The component props.
 * @param {string} [props.label] - The text label to display on the button.
 * @param {ButtonProps} props - Additional Material-UI ButtonProps for further customization.
 * @returns {React.ReactElement} A React element representing a styled button.
 */

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
