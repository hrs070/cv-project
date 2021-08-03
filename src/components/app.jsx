import React from 'react';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Header from './header.jsx';
import ResumeForm from './resumeForm.jsx';

export default function App() {

    const theme = createTheme({
        palette: {
            primary: {
                main: "#1976d2",

            },
        }
    })


    return (

        <ThemeProvider theme={theme}>
            <Header />
            <ResumeForm />
        </ThemeProvider>

    )
}