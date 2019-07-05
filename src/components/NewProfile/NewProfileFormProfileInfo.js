import {Container, Grid, makeStyles} from "@material-ui/core";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {EditablePaymentMethod} from "./EditablePaymentMethod";
import {AddPaymentMethod} from "./AddPaymentMethod";
import * as PropTypes from "prop-types";
import EditablePaymentMethodSelect from "./EditablePaymentMethodSelect";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/core/SvgIcon/SvgIcon";

export const PROFILE_NAME_KEY = 'profileName';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    textField: {
        width: '100%'
    }
}));

function NewProfileFormProfileInfo(props) {
    let classes = useStyles();
    let {profileInfo, onProfileInfoChange} = props;

    return (
        <Grid container
              className={classes.root}
              spacing={2}
        >
            <Grid item xs={12}>
                <TextField
                    value={profileInfo[PROFILE_NAME_KEY] ? profileInfo[PROFILE_NAME_KEY] : ''}
                    label='Profile Name'
                    helperText='Optional'
                    className={classes.textField}
                    variant="outlined"
                    onChange={(e) => {onProfileInfoChange(PROFILE_NAME_KEY, e.target.value)}}
                />
            </Grid>
        </Grid>
    )
}

NewProfileFormProfileInfo.propTypes = {
    profileInfo: PropTypes.object.isRequired,
    onProfileInfoChange: PropTypes.func.isRequired
};

export default NewProfileFormProfileInfo