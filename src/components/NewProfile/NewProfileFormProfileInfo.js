import {Grid, makeStyles} from "@material-ui/core";
import React from "react";
import * as PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

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
                    onChange={(e) => {
                        onProfileInfoChange(PROFILE_NAME_KEY, e.target.value)
                    }}
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