import React, { useState } from 'react';
import { Grid, Button, Card, Step, StepLabel, Stepper, CardContent, CircularProgress, Typography, makeStyles } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Formik, Form, Field, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';
import MomentUtils from '@date-io/moment';
import { DatePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { object, number, string, boolean, array, ValidationError } from 'yup';

// FieldArray :- education, keySkills, projects, projects{features}, certifications,languages, hobbies, socialMedia
const theme = createTheme({
    palette: {
        primary: {
            main: "#1976d2",

        },
    }
})

const useStyles = makeStyles((theme) => ({
    errorColor: {
        color: theme.palette.error.main,
    },
    card: {
        width: "90%",
        minWidth: "300px",
        maxWidth: "750px",
        marginBottom: theme.spacing(3)
    },
    bottomMargin: {
        marginBottom: "10px"
    }
}))

export default function ResumeForm() {

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <Grid container alignItems="center" justifyContent="center">
                    <Card raised={true} className={classes.card} >
                        <CardContent>

                            <FormikStepper initialValues={{
                                firstName: '', lastName: '', email: '', phoneNumber: [{ number: '' }], city: '',
                                country: '', summary: '', jobTitle: '',
                                education: [{ degree: '', institution: '', score: '', fromYear: new Date(), toYear: new Date(), city: '', country: '' }],
                                keySkills: [{ skill: '' }], projects: [{ projectTitle: '', features: [{ feature: '' }] }],
                                certifications: [{ certificateFor: '', certificateIssuer: '', date: '' }],
                                languages: [{ language: '' }], hobbies: [{ hobby: '' }], socialMedia: [{ name: '', link: '' }]
                            }}
                                onSubmit={(values) => console.log("values", values)}>

                                {/* Genaral Info Section*/}
                                <FormikStep label="General info">
                                    <Grid container spacing={3} >
                                        <Grid item xs={12} sm={6}>
                                            <Field fullWidth component={TextField} name="firstName" label="First Name" />
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <Field fullWidth component={TextField} name="lastName" label="Last Name" />
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <Field fullWidth component={TextField} name="jobTitle" label="Job Title" />
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <Field fullWidth component={TextField} name="email" label="Email" />
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <Field fullWidth component={TextField} name="city" label="City" />
                                        </Grid>
                                        <Grid item xs={12} sm={6} >
                                            <Field fullWidth component={TextField} name="country" label="Country" />
                                        </Grid>

                                        <Grid item xs={12} sm={12}>
                                            <FieldArray name="phoneNumber">
                                                {({ push, remove, form }) => (
                                                    <>
                                                        {form.values.phoneNumber.map((_, index) => (
                                                            <Grid container spacing={3} key={index} justifyContent="space-between" alignItems="center" className={classes.bottomMargin}>
                                                                <Grid item xs={8} sm={8}>
                                                                    <Field fullWidth name={`phoneNumber[${index}].number`} component={TextField} label="Phone Number" size="small" />
                                                                </Grid>

                                                                <Grid item xs={3} sm={3}>
                                                                    <Button onClick={() => remove(index)} variant="outlined" color="secondary" >Delete</Button>
                                                                </Grid>
                                                            </Grid>
                                                        ))}
                                                        <Grid item>
                                                            {typeof form.errors.phoneNumber === "string" ? <Typography color="error">{form.errors.phoneNumber}</Typography> : null}
                                                        </Grid>
                                                        <Grid item>
                                                            <Button onClick={() => push({ number: '' })} variant="outlined" color="primary">Add Another Number</Button>
                                                        </Grid>
                                                    </>
                                                )}
                                            </FieldArray>
                                        </Grid>

                                        <Grid item xs={12} className={classes.bottomMargin}>
                                            <Field fullWidth component={TextField} name="summary" label="Add a Bio" multiline minRows={1} maxRows={7} />
                                        </Grid>
                                    </Grid>
                                </FormikStep>

                                {/* Eaducation Section */}
                                <FormikStep label="Education">
                                    <Grid container spacing={3} >
                                        <Grid item xs={12} sm={12}>
                                            <FieldArray name="education">
                                                {({ push, remove, form }) => (
                                                    <>
                                                        {form.values.education.map((_, index) => (
                                                            <Grid container spacing={3} key={index} justifyContent="space-between" alignItems="center" className={classes.bottomMargin}>
                                                                <Grid item xs={12} sm={12}>
                                                                    <Field fullWidth name={`education[${index}].institution`} component={TextField} label="Institution Name" size="small" />
                                                                </Grid>
                                                                <Grid item xs={6} sm={6}>
                                                                    <Field fullWidth name={`education[${index}].degree`} component={TextField} label="Degree Name" size="small" />
                                                                </Grid>
                                                                <Grid item xs={6} sm={6}>
                                                                    <Field fullWidth name={`education[${index}].score`} component={TextField} label="Percentage Obtained" size="small" />
                                                                </Grid>
                                                                <Grid item xs={6} sm={6}>
                                                                    <Field fullWidth name={`education[${index}].city`} component={TextField} label="City" size="small" />
                                                                </Grid>
                                                                <Grid item xs={6} sm={6}>
                                                                    <Field fullWidth name={`education[${index}].country`} component={TextField} label="Country" size="small" />
                                                                </Grid>
                                                                <Grid item xs={6} sm={6}>
                                                                    <Field fullWidth name={`education[${index}].fromYear`} component={DatePicker} label="Started From" openTo="year" views={["year", "month"]} inputVariant="outlined" autoOk="true" variant="inline" />
                                                                </Grid>
                                                                <Grid item xs={6} sm={6}>
                                                                    <Field fullWidth name={`education[${index}].toYear`} component={DatePicker} label="Finished In" openTo="year" views={["year", "month"]} inputVariant="outlined" autoOk="true" variant="inline" />
                                                                </Grid>

                                                                <Grid item xs={3} sm={3}>
                                                                    <Button onClick={() => remove(index)} variant="outlined" color="secondary" >Delete</Button>
                                                                </Grid>
                                                            </Grid>
                                                        ))}
                                                        <Grid item>
                                                            {typeof form.errors.phoneNumber === "string" ? <Typography color="error">{form.errors.phoneNumber}</Typography> : null}
                                                        </Grid>
                                                        <Grid item>
                                                            <Button onClick={() => push({ number: '' })} variant="outlined" color="primary">Add Another Number</Button>
                                                        </Grid>
                                                    </>
                                                )}
                                            </FieldArray>
                                        </Grid>

                                        <Grid item xs={12} className={classes.bottomMargin}>
                                            <Field fullWidth component={TextField} name="summary" label="Summary" multiline minRows={1} maxRows={7} />
                                        </Grid>
                                    </Grid>
                                </FormikStep>

                            </FormikStepper>

                        </CardContent>
                    </Card>
                </Grid>
            </MuiPickersUtilsProvider>
        </ThemeProvider>
    )
}

export function FormikStep({ children }) {
    return <>{children}</>
}


export function FormikStepper({ children, ...props }) {

    const childrenArray = React.Children.toArray(children);
    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];
    const [completed, setCompleted] = useState(false);

    function isLastStep() {
        return step === childrenArray.length - 1;
    }

    return (
        <Formik {...props} validationSchema={currentChild.props.validationSchema} onSubmit={async (values, helpers) => {
            if (isLastStep()) {
                await props.onSubmit(values, helpers);
                setCompleted(true);
            } else {
                setStep(currentStep => currentStep + 1);
            }
        }}>

            {({ isSubmitting }) => (
                <Form autoComplete="off">

                    <Stepper alternativeLabel activeStep={step} >
                        {childrenArray.map((child, index) => (
                            <Step key={child.props.label} completed={step > index || completed}>
                                <StepLabel>{child.props.label}</StepLabel>

                            </Step>
                        ))}
                    </Stepper>

                    {currentChild}

                    <Grid container spacing={2} justifyContent="flex-end">
                        <Grid item>
                            {step > 0 ? <Button disabled={isSubmitting} variant="contained" color="primary" onClick={() => setStep(currentStep => currentStep - 1)}>Back</Button> : null}
                        </Grid>
                        <Grid item>
                            <Button startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null} disabled={isSubmitting} variant="contained" color="primary" type="submit">{isSubmitting ? "Submitting" : isLastStep() ? "Submit" : "Next"}</Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}