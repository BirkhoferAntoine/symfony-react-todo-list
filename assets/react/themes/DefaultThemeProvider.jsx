import React from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles'
import {CssBaseline} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: 'dark'
    },
    /*components: {
        MuiTableHead: {
            styleOverrides: {
                root: ({ownerState, theme}) => ({
                    backgroundColor: theme.palette.primary.main
                })
            }
        }
    }*/
});

export const DefaultThemeProvider = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                {props.children}
            </CssBaseline>
        </ThemeProvider>
    );
}