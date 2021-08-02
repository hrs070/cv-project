import React, { useState } from 'react';
import { Grid, Button, Card, Step, StepLabel, Stepper, CardContent, CircularProgress, Typography, makeStyles } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { Formik, Form, Field, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';
import MomentUtils from '@date-io/moment';
import { DatePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import InputAdornment from '@material-ui/core/InputAdornment';
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
                                keySkills: [{ skill: '' }], projects: [{ projectTitle: '', description: '' }],
                                certifications: [{ certificateFor: '', certificateIssuer: '', date: new Date() }],
                                languages: [{ language: '' }], hobbies: [{ hobby: '' }], linkedIn: '', github: ''
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
                                                        <Grid container justifyContent="center">
                                                            <Grid item >
                                                                <Button onClick={() => push({ number: '' })} variant="outlined" color="primary">Add Another Number</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </>
                                                )}
                                            </FieldArray>
                                        </Grid>

                                        <Grid item xs={12} className={classes.bottomMargin}>
                                            <Field fullWidth component={TextField} name="summary" label="Add a Bio" multiline minRows={1} maxRows={7} size="small" />
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
                                                                    <Field fullWidth name={`education[${index}].fromYear`} component={DatePicker} label="Started From" openTo="year" views={["year", "month"]} inputVariant="outlined" autoOk="true" />
                                                                </Grid>
                                                                <Grid item xs={6} sm={6}>
                                                                    <Field fullWidth name={`education[${index}].toYear`} component={DatePicker} label="Completed In" openTo="year" views={["year", "month"]} inputVariant="outlined" autoOk="true" />
                                                                </Grid>

                                                                <Grid item xs={12} sm={12}>
                                                                    <Button onClick={() => remove(index)} variant="outlined" color="secondary">Remove This Education</Button>
                                                                </Grid>
                                                            </Grid>
                                                        ))}
                                                        <Grid item>
                                                            {typeof form.errors.education === "string" ? <Typography color="error">{form.errors.education}</Typography> : null}
                                                        </Grid>
                                                        <Grid container justifyContent="center" >
                                                            <Grid item className={classes.bottomMargin}>
                                                                <Button onClick={() => push({ degree: '', institution: '', score: '', fromYear: new Date(), toYear: new Date(), city: '', country: '' })} variant="outlined" color="primary">Add More Education Details</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </>
                                                )}
                                            </FieldArray>
                                        </Grid>
                                    </Grid>
                                </FormikStep>

                                {/* Certifications Section*/}
                                <FormikStep label="Certifications">
                                    <Grid container spacing={3} >
                                        <Grid item xs={12} sm={12}>
                                            <FieldArray name="certifications">
                                                {({ push, remove, form }) => (
                                                    <>
                                                        {form.values.certifications.map((_, index) => (
                                                            <Grid container spacing={3} key={index} justifyContent="space-between" alignItems="center" className={classes.bottomMargin}>
                                                                <Grid item xs={12} sm={12}>
                                                                    <Field fullWidth name={`certifications[${index}].certificateFor`} component={TextField} label="Certificate Name" size="small" />
                                                                </Grid>
                                                                <Grid item xs={6} sm={6}>
                                                                    <Field fullWidth name={`certifications[${index}].certificateIssuer`} component={TextField} label="Certificate Issued By" size="small" />
                                                                </Grid>
                                                                <Grid item xs={6} sm={6}>
                                                                    <Field fullWidth name={`certifications[${index}].date`} component={DatePicker} label="Issued On" openTo="year" views={["year", "month"]} autoOk="true" />
                                                                </Grid>

                                                                <Grid item xs={12} sm={12}>
                                                                    <Button onClick={() => remove(index)} variant="outlined" color="secondary">Remove Certificate</Button>
                                                                </Grid>
                                                            </Grid>
                                                        ))}
                                                        <Grid item>
                                                            {typeof form.errors.certifications === "string" ? <Typography color="error">{form.errors.certifications}</Typography> : null}
                                                        </Grid>
                                                        <Grid container justifyContent="center" >
                                                            <Grid item className={classes.bottomMargin}>
                                                                <Button onClick={() => push({ certificateFor: '', certificateIssuer: '', date: new Date() })} variant="outlined" color="primary">Add More Certificates</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </>
                                                )}
                                            </FieldArray>
                                        </Grid>
                                    </Grid>
                                </FormikStep>

                                {/* Skills & Projects */}
                                <FormikStep label="Skills &amp; Projects">
                                    {/* Skills Section */}
                                    <Grid container spacing={3} >
                                        <Grid item xs={12} sm={12}>
                                            <FieldArray name="keySkills">
                                                {({ push, remove, form }) => (
                                                    <>
                                                        {form.values.keySkills.map((_, index) => (
                                                            <Grid container spacing={3} key={index} justifyContent="space-between" alignItems="center" className={classes.bottomMargin}>
                                                                <Grid item xs={8} sm={8}>
                                                                    <Field fullWidth name={`keySkills[${index}].skill`} component={TextField} label="Skill" size="small" />
                                                                </Grid>

                                                                <Grid item xs={3} sm={3}>
                                                                    <Button onClick={() => remove(index)} variant="outlined" color="secondary" >Delete</Button>
                                                                </Grid>
                                                            </Grid>
                                                        ))}
                                                        <Grid item>
                                                            {typeof form.errors.keySkills === "string" ? <Typography color="error">{form.errors.keySkills}</Typography> : null}
                                                        </Grid>
                                                        <Grid container justifyContent="center" >
                                                            <Grid item className={classes.bottomMargin}>
                                                                <Button onClick={() => push({ skill: '' })} variant="outlined" color="primary">Add Skill</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </>
                                                )}
                                            </FieldArray>
                                        </Grid>
                                        {/* Projects Section */}
                                        <Grid item xs={12} sm={12}>
                                            <FieldArray name="projects">
                                                {({ push, remove, form }) => (
                                                    <>
                                                        {form.values.projects.map((_, index) => (
                                                            <Grid container spacing={3} key={index} justifyContent="space-between" alignItems="center" className={classes.bottomMargin}>
                                                                <Grid item xs={12} sm={12}>
                                                                    <Field fullWidth name={`projects[${index}].projectTitle`} component={TextField} label="Project Title" size="small" />
                                                                </Grid>
                                                                <Grid item xs={12} sm={12}>
                                                                    <Field fullWidth name={`projects[${index}].description`} component={TextField} label="Project Description (Multi Line)" size="small" multiline minRows={3} maxRows={7} />
                                                                </Grid>

                                                                <Grid item xs={12} sm={12}>
                                                                    <Button onClick={() => remove(index)} variant="outlined" color="secondary">Remove Project</Button>
                                                                </Grid>
                                                            </Grid>
                                                        ))}
                                                        <Grid item>
                                                            {typeof form.errors.projects === "string" ? <Typography color="error">{form.errors.projects}</Typography> : null}
                                                        </Grid>
                                                        <Grid container justifyContent="center" >
                                                            <Grid item className={classes.bottomMargin}>
                                                                <Button onClick={() => push({ skill: '' })} variant="outlined" color="primary">Add More Projects</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </>
                                                )}
                                            </FieldArray>
                                        </Grid>

                                    </Grid>
                                </FormikStep>

                                {/* Additional Info */}
                                <FormikStep label="Additional Info">
                                    {/* Languages */}
                                    <Grid container spacing={3} >
                                        <Grid item xs={12} sm={12}>
                                            <FieldArray name="languages">
                                                {({ push, remove, form }) => (
                                                    <>
                                                        {form.values.languages.map((_, index) => (
                                                            <Grid container spacing={3} key={index} justifyContent="space-between" alignItems="center" className={classes.bottomMargin}>
                                                                <Grid item xs={8} sm={8}>
                                                                    <Field fullWidth name={`languages[${index}].language`} component={TextField} label="Language I Speak" size="small" />
                                                                </Grid>

                                                                <Grid item xs={3} sm={3}>
                                                                    <Button onClick={() => remove(index)} variant="outlined" color="secondary">Remove</Button>
                                                                </Grid>
                                                            </Grid>
                                                        ))}
                                                        <Grid item>
                                                            {typeof form.errors.languages === "string" ? <Typography color="error">{form.errors.languages}</Typography> : null}
                                                        </Grid>
                                                        <Grid container justifyContent="center" >
                                                            <Grid item className={classes.bottomMargin}>
                                                                <Button onClick={() => push({ language: '' })} variant="outlined" color="primary">Add Language</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </>
                                                )}
                                            </FieldArray>
                                        </Grid>
                                    </Grid>
                                    {/* Hobbies */}
                                    <Grid container spacing={3} >
                                        <Grid item xs={12} sm={12}>
                                            <FieldArray name="hobbies">
                                                {({ push, remove, form }) => (
                                                    <>
                                                        {form.values.hobbies.map((_, index) => (
                                                            <Grid container spacing={3} key={index} justifyContent="space-between" alignItems="center" className={classes.bottomMargin}>
                                                                <Grid item xs={8} sm={8}>
                                                                    <Field fullWidth name={`hobbies[${index}].hobby`} component={TextField} label="My Hobby" size="small" />
                                                                </Grid>

                                                                <Grid item xs={3} sm={3}>
                                                                    <Button onClick={() => remove(index)} variant="outlined" color="secondary">Remove</Button>
                                                                </Grid>
                                                            </Grid>
                                                        ))}
                                                        <Grid item>
                                                            {typeof form.errors.hobbies === "string" ? <Typography color="error">{form.errors.hobbies}</Typography> : null}
                                                        </Grid>
                                                        <Grid container justifyContent="center" >
                                                            <Grid item className={classes.bottomMargin}>
                                                                <Button onClick={() => push({ hobby: '' })} variant="outlined" color="primary">Add Hobby</Button>
                                                            </Grid>
                                                        </Grid>
                                                    </>
                                                )}
                                            </FieldArray>
                                        </Grid>
                                    </Grid>
                                    {/* Social Media */}
                                    <Grid container spacing={3} className={classes.bottomMargin}>
                                        <Grid item xs={12} sm={6}>
                                            <Field fullWidth component={TextField} name="linkedIn" label="LinkedIn Account (optional)" InputProps={{ startAdornment: (<InputAdornment position="start"><LinkedInIcon color="primary" /></InputAdornment>), }} />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field fullWidth component={TextField} name="github" label="GitHub Account (optional)" InputProps={{ startAdornment: (<InputAdornment position="start"><GitHubIcon /></InputAdornment>), }} />
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

            {({ isSubmitting, values, errors }) => (
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
                    {/* Output */}
                    <Grid item>
                        <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
                    </Grid>
                </Form>
            )}
        </Formik>
    )
}