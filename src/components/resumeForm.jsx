import React, { useState } from 'react';
import { Grid, Button, Card, Step, StepLabel, Stepper, CardContent, CircularProgress, Typography, makeStyles, Box } from '@material-ui/core';
import { Formik, Form, Field, FieldArray } from 'formik';
import { TextField } from 'formik-material-ui';
import MomentUtils from '@date-io/moment';
import { DatePicker } from 'formik-material-ui-pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import InputAdornment from '@material-ui/core/InputAdornment';
import { object, string, array } from 'yup';

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
    },
    step_label_root: {
        fontSize: '0',
    },
    icon_root: {
        fontSize: "20px",
    },
    icon_completed: {
        color: "#00c853 !important",
        fontSize: "20px",
    },
    icon_active: {
        fontSize: "25px",
    },
}))

export default function ResumeForm({ onGenerate, displayCondition }) {

    const classes = useStyles();

    return (

        <MuiPickersUtilsProvider utils={MomentUtils}>
            <Grid container alignItems="center" justifyContent="center" style={{ display: displayCondition ? null : 'none' }}>
                <Card raised={true} className={classes.card}>
                    <CardContent>

                        <FormikStepper initialValues={{
                            firstName: '', lastName: '', email: '', phoneNumber: [{ number: '' }], city: '',
                            country: '', summary: '', jobTitle: '',
                            education: [{ degree: '', institutionName: '', specialization: '', percentage: '', fromYear: new Date(), toYear: new Date(), city: '', country: '' }],
                            workExperience: [{ companyName: '', position: '', achievements: '', fromYear: new Date(), toYear: new Date(), city: '', country: '' }],
                            keySkills: [{ skill: '' }], projects: [{ projectTitle: '', description: '' }],
                            certifications: [{ certificateFor: '', certificateIssuer: '', date: new Date() }],
                            languages: [{ language: '' }], hobbies: [{ hobby: '' }], linkedIn: '', github: ''
                        }}
                            onSubmit={(values) => { onGenerate(values) }}>

                            {/* Genaral Info Section*/}
                            <FormikStep label="General info" validationSchema={object({
                                firstName: string("Must be a valid string").required("First Name is Required").matches(/^[aA-zZ\s.]+$/, "Only alphabets are allowed for First Name").max(30, "Max 30 characters allowed"),
                                lastName: string("Must be a valid string").required("Last Name is Required").matches(/^[aA-zZ\s.]+$/, "Only alphabets are allowed for Last Name").max(30, "Max 30 characters allowed"),
                                jobTitle: string("Must be a valid string").matches(/^[aA-zZ\s&.]+$/, "Special characters and Numbers are not allowed").max(50, "Max 50 characters allowed"),
                                email: string().required("Email is Required").email("Must be a valid email").max(50, "Max 50 characters allowed"),
                                city: string().required("City is Required").matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for City Name").max(30, "Max 30 characters allowed"),
                                country: string().required("Country is Required").matches(/^[aA-zZ\s.]+$/, "Only alphabets are allowed for Country Name").max(56, "Max 56 characters allowed"),
                                phoneNumber: array(object({ number: string().required("Phone number is Required").matches(/^([+(?=0-9){3}])?[0-9]{10,12}$/, "Please enter a Valid Number") })).min(1, "At least 1 Phone Number is required").max(2, "Upto 2 Phone Numbers allowed")
                            })}>

                                <Box display={{ xs: 'block', sm: 'block' }} mb={2}>
                                    <Typography align="center" variant="h5" color="textSecondary">General info</Typography>
                                </Box>
                                <Grid container spacing={3} >
                                    <Grid item xs={12} sm={6}>
                                        <Field fullWidth component={TextField} name="firstName" label="First Name *" />
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <Field fullWidth component={TextField} name="lastName" label="Last Name *" />
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <Field fullWidth component={TextField} name="jobTitle" label="Job Title" />
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <Field fullWidth component={TextField} name="email" label="Email *" />
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <Field fullWidth component={TextField} name="city" label="City *" />
                                    </Grid>
                                    <Grid item xs={12} sm={6} >
                                        <Field fullWidth component={TextField} name="country" label="Country *" />
                                    </Grid>

                                    <Grid item xs={12} sm={12}>
                                        <FieldArray name="phoneNumber">
                                            {({ push, remove, form }) => (
                                                <>
                                                    {form.values.phoneNumber.map((_, index) => (
                                                        <Grid container spacing={3} key={index} justifyContent="space-between" alignItems="center" className={classes.bottomMargin}>
                                                            <Grid item xs={8} sm={8}>
                                                                <Field fullWidth name={`phoneNumber[${index}].number`} component={TextField} label="Phone Number *" size="small" />
                                                            </Grid>
                                                            <Grid item xs={4} sm={4}>
                                                                <Grid container justifyContent="center">
                                                                    <Grid item >
                                                                        <Button onClick={() => remove(index)} variant="outlined" color="secondary" >Remove</Button>
                                                                    </Grid>
                                                                </Grid>
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
                                        <Field fullWidth component={TextField} name="summary" label="Add a Bio" multiline minRows={2} maxRows={7} variant="outlined" size="small" />
                                    </Grid>
                                </Grid>
                            </FormikStep>

                            {/* Eaducation Section */}
                            <FormikStep label="Education" validationSchema={object({
                                education: array(object({
                                    institutionName: string().required("Institution Name is Required").matches(/^[aA-zZ\s&.]+$/, "Special characters and Numbers are not allowed").max(80, "Max 80 characters allowed"),
                                    degree: string().required("Degree is Required").matches(/^[aA-zZ\s&.]+$/, "Special characters and Numbers are not allowed").max(80, "Max 80 characters allowed"),
                                    specialization: string().matches(/^[aA-zZ\s&.]+$/, "Special characters and Numbers are not allowed").max(80, "Max 80 characters allowed"),
                                    percentage: string().matches(/^100%?$|^[0-9]{1,2}%?$|^[0-9]{1,2}\.[0-9]{1,2}%?$/, "Enter Percentage or CGPA Obtained"),
                                    city: string().required("Institution City is Required").matches(/^[aA-zZ\s&.]+$/, "Special characters and Numbers are not allowed").max(80, "Max 80 characters allowed"),
                                    country: string().required("Institution Country is Required").matches(/^[aA-zZ\s&.]+$/, "Special characters and Numbers are not allowed").max(80, "Max 80 characters allowed"),
                                })).min(1, "At least 1 Education Detail is required").max(5, "Upto 5 Education Detail accepted")
                            })}>

                                <Box display={{ xs: 'block', sm: 'block' }} mb={2}>
                                    <Typography align="center" variant="h5" color="textSecondary">Education</Typography>
                                </Box>
                                <Grid container spacing={3} >
                                    <Grid item xs={12} sm={12}>
                                        <FieldArray name="education">
                                            {({ push, remove, form }) => (
                                                <>
                                                    {form.values.education.map((_, index) => (
                                                        <Grid container spacing={3} key={index} justifyContent="space-between" alignItems="center" className={classes.bottomMargin}>
                                                            <Grid item xs={12} sm={12}>
                                                                <Field fullWidth name={`education[${index}].institutionName`} component={TextField} label="Institution Name *" size="small" />
                                                            </Grid>
                                                            <Grid item xs={12} sm={12}>
                                                                <Field fullWidth name={`education[${index}].degree`} component={TextField} label="Degree / High School *" size="small" />
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <Field fullWidth name={`education[${index}].specialization`} component={TextField} label="Specialization" size="small" />
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <Field fullWidth name={`education[${index}].percentage`} component={TextField} label="Percentage Obtained" size="small" />
                                                            </Grid>
                                                            <Grid item xs={6} sm={6}>
                                                                <Field fullWidth name={`education[${index}].city`} component={TextField} label="City *" size="small" />
                                                            </Grid>
                                                            <Grid item xs={6} sm={6}>
                                                                <Field fullWidth name={`education[${index}].country`} component={TextField} label="Country *" size="small" />
                                                            </Grid>
                                                            <Grid item xs={6} sm={6}>
                                                                <Field fullWidth name={`education[${index}].fromYear`} component={DatePicker} label="Started From" openTo="year" views={["year", "month"]} inputVariant="outlined" autoOk="true" size="small" />
                                                            </Grid>
                                                            <Grid item xs={6} sm={6}>
                                                                <Field fullWidth name={`education[${index}].toYear`} component={DatePicker} label="Passing Year" openTo="year" views={["year", "month"]} inputVariant="outlined" autoOk="true" size="small" />
                                                            </Grid>

                                                            <Grid container justifyContent="center">
                                                                <Grid item>
                                                                    <Button onClick={() => remove(index)} variant="outlined" color="secondary">Remove This Education</Button>
                                                                </Grid>
                                                            </Grid>

                                                        </Grid>
                                                    ))}
                                                    <Grid item>
                                                        {typeof form.errors.education === "string" ? <Typography color="error">{form.errors.education}</Typography> : null}
                                                    </Grid>
                                                    <Grid container justifyContent="center" >
                                                        <Grid item className={classes.bottomMargin}>
                                                            <Button onClick={() => push({ degree: '', institutionName: '', specialization: '', percentage: '', fromYear: new Date(), toYear: new Date(), city: '', country: '' })} variant="outlined" color="primary">Add More Education Details</Button>
                                                        </Grid>
                                                    </Grid>
                                                </>
                                            )}
                                        </FieldArray>
                                    </Grid>
                                </Grid>
                            </FormikStep>

                            {/* Work Experience Section */}
                            <FormikStep label="Education" validationSchema={object({
                                workExperience: array(object({
                                    companyName: string().matches(/^[aA-zZ\s&.]+$/, "Special characters and Numbers are not allowed").max(80, "Max 80 characters allowed"),
                                    position: string().matches(/^[aA-zZ\s&.]+$/, "Special characters and Numbers are not allowed").max(80, "Max 80 characters allowed"),
                                    achievements: string(),
                                    city: string().matches(/^[aA-zZ\s&.]+$/, "Special characters and Numbers are not allowed").max(80, "Max 80 characters allowed"),
                                    country: string().matches(/^[aA-zZ\s&.]+$/, "Special characters and Numbers are not allowed").max(80, "Max 80 characters allowed"),
                                }))
                            })}>

                                <Box display={{ xs: 'block', sm: 'block' }} mb={2}>
                                    <Typography align="center" variant="h5" color="textSecondary">Work Experience (Optional)</Typography>
                                </Box>
                                <Grid container spacing={3} >
                                    <Grid item xs={12} sm={12}>
                                        <FieldArray name="workExperience">
                                            {({ push, remove, form }) => (
                                                <>
                                                    {form.values.workExperience.map((_, index) => (
                                                        <Grid container spacing={3} key={index} justifyContent="space-between" alignItems="center" className={classes.bottomMargin}>
                                                            <Grid item xs={12} sm={12}>
                                                                <Field fullWidth name={`workExperience[${index}].companyName`} component={TextField} label="Company Name" size="small" />
                                                            </Grid>
                                                            <Grid item xs={12} sm={12}>
                                                                <Field fullWidth name={`workExperience[${index}].position`} component={TextField} label="Previous Position" size="small" />
                                                            </Grid>
                                                            <Grid item xs={6} sm={6}>
                                                                <Field fullWidth name={`workExperience[${index}].city`} component={TextField} label="City" size="small" />
                                                            </Grid>
                                                            <Grid item xs={6} sm={6}>
                                                                <Field fullWidth name={`workExperience[${index}].country`} component={TextField} label="Country" size="small" />
                                                            </Grid>
                                                            <Grid item xs={6} sm={6}>
                                                                <Field fullWidth name={`workExperience[${index}].fromYear`} component={DatePicker} label="From" openTo="year" views={["year", "month"]} inputVariant="outlined" autoOk="true" size="small" />
                                                            </Grid>
                                                            <Grid item xs={6} sm={6}>
                                                                <Field fullWidth name={`workExperience[${index}].toYear`} component={DatePicker} label="To" openTo="year" views={["year", "month"]} inputVariant="outlined" autoOk="true" size="small" />
                                                            </Grid>
                                                            <Grid item xs={12} sm={12}>
                                                                <Field fullWidth name={`workExperience[${index}].achievements`} component={TextField} label="Acheivements" size="small" multiline minRows={2} maxRows={7} variant="outlined" />
                                                            </Grid>

                                                            <Grid container justifyContent="center">
                                                                <Grid item>
                                                                    <Button onClick={() => remove(index)} variant="outlined" color="secondary">Remove This Experience</Button>
                                                                </Grid>
                                                            </Grid>

                                                        </Grid>
                                                    ))}
                                                    <Grid item>
                                                        {typeof form.errors.education === "string" ? <Typography color="error">{form.errors.education}</Typography> : null}
                                                    </Grid>
                                                    <Grid container justifyContent="center" >
                                                        <Grid item className={classes.bottomMargin}>
                                                            <Button onClick={() => push({ companyName: '', position: '', achievements: '', fromYear: new Date(), toYear: new Date(), city: '', country: '' })} variant="outlined" color="primary">Add More Experience Details</Button>
                                                        </Grid>
                                                    </Grid>
                                                </>
                                            )}
                                        </FieldArray>
                                    </Grid>
                                </Grid>
                            </FormikStep>

                            {/* Certifications Section*/}
                            <FormikStep label="Certifications" validationSchema={object({
                                certifications: array(object({
                                    certificateFor: string().matches(/^[aA-zZ\s&.]+$/, "Special characters and Numbers are not allowed").max(80, "Max 80 characters allowed"),
                                    certificateIssuer: string().matches(/^[aA-zZ\s&.]+$/, "Special characters and Numbers are not allowed").max(80, "Max 80 characters allowed")
                                }))
                            })}>

                                <Box display={{ xs: 'block', sm: 'block' }} mb={2}>
                                    <Typography align="center" variant="h5" color="textSecondary">Certifications (optional)</Typography>
                                </Box>
                                <Grid container spacing={3} >
                                    <Grid item xs={12} sm={12}>
                                        <FieldArray name="certifications">
                                            {({ push, remove, form }) => (
                                                <>
                                                    {form.values.certifications.map((_, index) => (
                                                        <Grid container spacing={3} key={index} justifyContent="space-between" alignItems="center" className={classes.bottomMargin}>
                                                            <Grid item xs={12} sm={12}>
                                                                <Field fullWidth name={`certifications[${index}].certificateFor`} component={TextField} label="Certificate Title" size="small" />
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <Field fullWidth name={`certifications[${index}].certificateIssuer`} component={TextField} label="Certificate Issued By" size="small" />
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <Field fullWidth name={`certifications[${index}].date`} component={DatePicker} label="Issued In" openTo="year" views={["year", "month"]} autoOk="true" size="small" inputVariant="outlined" />
                                                            </Grid>

                                                            <Grid container justifyContent="center">
                                                                <Grid item>
                                                                    <Button onClick={() => remove(index)} variant="outlined" color="secondary">Remove Certificate</Button>
                                                                </Grid>
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
                            <FormikStep label="Skills &amp; Projects" validationSchema={object({
                                keySkills: array(object({
                                    skill: string().required("Add a Skill").max(50, "Max 50 characters allowed"),
                                })).min(3, "At least 3 skills are required"),
                                projects: array(object({
                                    projectTitle: string().required("Add a Project Title").max(50, "Max 50 characters allowed"),
                                    description: string().required("Add a Project Description")
                                })).min(1, "At least 1 Project is required")
                            })}>

                                {/* Skills Section */}
                                <Box display={{ xs: 'block', sm: 'block' }} mb={2}>
                                    <Typography align="center" variant="h5" color="textSecondary">Skills</Typography>
                                </Box>
                                <Grid container spacing={3} >
                                    <Grid item xs={12} sm={12}>
                                        <FieldArray name="keySkills">
                                            {({ push, remove, form }) => (
                                                <>
                                                    {form.values.keySkills.map((_, index) => (
                                                        <Grid container spacing={3} key={index} justifyContent="space-between" alignItems="center" className={classes.bottomMargin}>
                                                            <Grid item xs={8} sm={8}>
                                                                <Field fullWidth name={`keySkills[${index}].skill`} component={TextField} label="Key Skill *" size="small" />
                                                            </Grid>

                                                            <Grid item xs={4} sm={4}>
                                                                <Grid container justifyContent="center">
                                                                    <Grid item>
                                                                        <Button onClick={() => remove(index)} variant="outlined" color="secondary" >Remove</Button>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    ))}
                                                    <Grid item>
                                                        {typeof form.errors.keySkills === "string" ? <Typography color="error">{form.errors.keySkills}</Typography> : null}
                                                    </Grid>
                                                    <Grid container justifyContent="center" >
                                                        <Grid item >
                                                            <Button onClick={() => push({ skill: '' })} variant="outlined" color="primary">Add Skill</Button>
                                                        </Grid>
                                                    </Grid>
                                                </>
                                            )}
                                        </FieldArray>
                                    </Grid>
                                    {/* Projects Section */}
                                    <Grid item xs={12} sm={12}>
                                        <Box display={{ xs: 'block', sm: 'block' }} mt={3} mb={-1}>
                                            <Typography align="center" variant="h5" color="textSecondary">Projects</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <FieldArray name="projects">
                                            {({ push, remove, form }) => (
                                                <>
                                                    {form.values.projects.map((_, index) => (
                                                        <Grid container spacing={3} key={index} justifyContent="space-between" alignItems="center" className={classes.bottomMargin}>
                                                            <Grid item xs={12} sm={12}>
                                                                <Field fullWidth name={`projects[${index}].projectTitle`} component={TextField} label="Project Title *" size="small" />
                                                            </Grid>
                                                            <Grid item xs={12} sm={12}>
                                                                <Field fullWidth name={`projects[${index}].description`} component={TextField} label="Project Description *" variant="outlined" size="small" multiline minRows={2} maxRows={10} />
                                                            </Grid>

                                                            <Grid container justifyContent="center">
                                                                <Grid item >
                                                                    <Button onClick={() => remove(index)} variant="outlined" color="secondary">Remove Project</Button>
                                                                </Grid>
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
                            <FormikStep label="Additional Info" validationSchema={object({
                                languages: array(object({
                                    language: string().required("Add a Language").max(50, "Max 50 characters allowed"),
                                })).min(1, "At least 1 language is required"),
                            })}>

                                <Box display={{ xs: 'block', sm: 'block' }} mb={2}>
                                    <Typography align="center" variant="h5" color="textSecondary">Additional Info</Typography>
                                </Box>
                                {/* Languages */}
                                <Grid container spacing={3} >
                                    <Grid item xs={12} sm={12}>
                                        <FieldArray name="languages">
                                            {({ push, remove, form }) => (
                                                <>
                                                    {form.values.languages.map((_, index) => (
                                                        <Grid container spacing={3} key={index} justifyContent="space-between" alignItems="center" className={classes.bottomMargin}>
                                                            <Grid item xs={8} sm={8}>
                                                                <Field fullWidth name={`languages[${index}].language`} component={TextField} label="Language I Speak *" size="small" />
                                                            </Grid>

                                                            <Grid item xs={4} sm={4}>
                                                                <Grid container justifyContent="center">
                                                                    <Grid item>
                                                                        <Button onClick={() => remove(index)} variant="outlined" color="secondary">Remove</Button>
                                                                    </Grid>
                                                                </Grid>
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
                                                            <Grid item xs={4} sm={4}>
                                                                <Grid container justifyContent="center">
                                                                    <Grid item>
                                                                        <Button onClick={() => remove(index)} variant="outlined" color="secondary">Remove</Button>
                                                                    </Grid>
                                                                </Grid>
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
        </MuiPickersUtilsProvider >

    )
}

export function FormikStep({ children }) {
    return <>{children}</>
}


export function FormikStepper({ children, ...props }) {

    const classes = useStyles();

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

            {({ isSubmitting, values, errors, isValid }) => (
                <Form autoComplete="off">

                    <Stepper alternativeLabel activeStep={step}>
                        {childrenArray.map((child, index) => (
                            <Step key={child.props.label} completed={step > index || completed} >
                                <StepLabel StepIconProps={{ classes: { root: classes.icon_root, completed: classes.icon_completed, active: classes.icon_active } }} classes={{ label: classes.step_label_root }}>{child.props.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {currentChild}

                    <Grid container spacing={2} justifyContent="flex-end">
                        <Grid item>
                            {step > 0 ? <Button disabled={isSubmitting} variant="contained" color="primary" onClick={() => setStep(currentStep => currentStep - 1)}>Back</Button> : null}
                        </Grid>
                        <Grid item>
                            <Button startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null} disabled={!isValid || isSubmitting} variant="contained" color={"primary"} type="submit">{isSubmitting ? "Generating" : isLastStep() ? "Generate" : "Next"}</Button>
                        </Grid>
                    </Grid>
                    {/* Output */}
                    {/* <Grid item>
                        <pre>{JSON.stringify({ values, errors }, null, 4)}</pre>
                    </Grid> */}
                </Form>
            )
            }
        </Formik >
    )
}