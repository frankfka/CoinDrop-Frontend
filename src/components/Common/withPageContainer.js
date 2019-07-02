import {Container, withStyles} from "@material-ui/core";
import React from "react";

const styles = (theme) => ({
    root: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
    }
});

export default function withPageContainer(ChildComponent) {
    let wrappedComponent = class extends React.Component {
        render() {
            let {classes} = this.props;
            return (
                <Container maxWidth='md' className={classes.root}>
                    <ChildComponent {...this.props}/>
                </Container>
            );
        }
    };
    return withStyles(styles)(wrappedComponent);
}