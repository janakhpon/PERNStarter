import React from 'react'
import TextField from '@material-ui/core/TextField'
import { withStyles } from "@material-ui/styles"

const styles = {
    underline: {
        // normal style
        "&::before": {
            borderBottom: "1px solid #06D648"
        },
        // hover style
        "&:hover:not(.Mui-disabled):before": {
            borderBottom: "2px solid #DFEF4C"
        },
        // focus style
        "&::after": {
            borderBottom: "3px solid red"
        },

        background: 'transparent',
        color: '#ffffff',
    },
    formLabel: {
        color: '#ffffff',
        '&.Mui-focused': {
            color: '#d90429'
        }
    },
}

const CustomTextField = withStyles(styles)(props => {
    const { classes, ...other } = props;
    return <TextField InputProps={{ className: classes.underline }} InputLabelProps={{ className: classes.formLabel }} {...other} />;
});


export default CustomTextField