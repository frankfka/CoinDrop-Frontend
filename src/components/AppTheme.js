import { createMuiTheme } from '@material-ui/core/styles';

const appTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#ef6c00',
        },
    },
    props: {
        MuiButtonBase: {
            disableRipple: true, // No ripple effect on click
        },
    },
});

export default appTheme