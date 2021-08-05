import React, { useState } from 'react';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Header from './header.jsx';
import ResumeForm from './resumeForm.jsx';
import Output from './output.jsx';

export default function App() {

    const theme = createTheme({
        palette: {
            primary: {
                main: "#1976d2",
            }
        },
    })

    const [showOutput, setShowOutput] = useState(true);
    const [editBtnName, setEditBtnName] = useState("Preview");
    const [outputValues, setOutputValues] = useState();
    const [dataOnOutputPage, setDataOnOutputPage] = useState(false);

    function handleGenerate(childData) {
        setOutputValues(childData);
        setShowOutput(false);
        setDataOnOutputPage(true);
        setEditBtnName("Edit");
    }

    function handleEdit() {
        if (showOutput) {
            setEditBtnName("Edit")
            setShowOutput(!showOutput)
        } else {
            setEditBtnName("Preview")
            setShowOutput(!showOutput)
        }
    }

    return (

        <ThemeProvider theme={theme}>
            <Header onEdit={handleEdit} name={editBtnName} />
            <ResumeForm onGenerate={handleGenerate} displayCondition={showOutput} />
            <Output displayCondition={showOutput} outputData={outputValues} dataOrNoDataState={dataOnOutputPage} />
        </ThemeProvider>
    )
}