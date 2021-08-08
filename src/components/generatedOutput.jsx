import React from 'react';
import moment from 'moment';
import { Grid, Button, Card, CardContent, makeStyles } from '@material-ui/core';
import EducationCard from './EducationCard';
import { Page, Text, View, Image, Document, StyleSheet, PDFDownloadLink, PDFViewer, Link } from '@react-pdf/renderer';
import profileIcon from './images/profile.png';
import locationIcon from './images/location.png';
import phoneIcon from './images/phone.png';
import emailIcon from './images/email.png';
import dobIcon from './images/dob.png';
import githubIcon from './images/githubIcon.png';
import linkedinIcon from './images/linkedin.png';
import websiteIcon from './images/website.png';
import languageIcon from './images/language.png';

const useStyles = makeStyles((theme) => ({
    card: {
        width: "90%",
        minWidth: "300px",
        maxWidth: "793px",
        marginBottom: theme.spacing(3)
    },
    cardContent: {
        padding: "0",
        "&:last-child": {
            paddingBottom: 0
        },
    },
    downloadButton: {
        marginBottom: theme.spacing(3)
    }
}))

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        height: "100vh",
        width: "100vw",
        fontSize: "12px",
    },

    sideBar: {
        flexDirection: "column",
        backgroundColor: "#3a3b38",
        height: "100%",
        width: "30%",
        color: "#dadbd8",
        alignItems: "center",
    },
    nameSection: {
        alignItems: "center",
        marginTop: "20px",
        marginBottom: "20px",
    },
    firstName: {
        fontSize: "25px",
        textTransform: "uppercase",
        color: "#e6e8e1",
    },
    lastName: {
        fontSize: "25px",
        textTransform: "uppercase",
        color: "#46a5df",
    },
    sectionContainer: {
        marginBottom: "30px",
        width: "80%"
    },
    sectionHeading: {
        color: "#e6e8e1",
        padding: "5px 0",
        borderTop: "1px solid #a6a6a6",
        borderBottom: "1px solid #a6a6a6",
        fontSize: "14px",
    },
    sectionBody: {
        margin: "7px 0",
    },
    icons: {
        width: "20px",
        marginRight: "8px"
    },
    infoGroup: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: "7px 0"
    },
    infoDataName: {
        fontSize: "10px",
        lineHeight: "1.4"
    },
    infoData: {
        color: "#e6e8e1"
    },
    infoGroupSameLine: {
        flexDirection: "row",

    },
    downloadButton: {
        textDecoration: "none",
        color: "white",
    }
});


export function GeneratedPDF({ recievedData }) {

    const { firstName, lastName, jobTitle, dob, email, city, country, phoneNumber, summary, education, workExperience, keySkills, projects, certifications, languages, hobbies, linkedIn, github, personalWebsite } = recievedData;

    console.log(JSON.stringify(recievedData, null, 6));
    console.log(recievedData);

    function returnMomentDate(date) {
        return (
            <Text> {moment(date).format('MMMM YYYY')}</Text>
        )
    }
    function returnMomentDOB(date) {
        return (
            <Text style={styles.infoData}> {moment(date).format('DD MMMM YYYY')}</Text>
        )
    }
    function createPhoneNumberField(contact) {
        return (
            <Text style={styles.infoData}>{contact.number}</Text>
        )
    }
    function createLanguageField(language) {
        return (
            <Text style={[styles.infoData, { marginRight: "8px" }]}>{language.language}</Text>
        )
    }
    function createHobbiesField(hobbie) {
        return (
            <Text style={[styles.infoData, { marginRight: "8px" }]}>{hobbie.hobby}</Text>
        )
    }

    function createEducationCard(education) {
        return (
            <EducationCard degree={education.degree}
                institutionName={education.institutionName}
                specialization={education.specialization}
                percentage={education.percentage}
                fromYear={education.fromYear !== null ? returnMomentDate(education.fromYear._d) : null}
                toYear={education.toYear !== null ? returnMomentDate(education.toYear._d) : null}
                city={education.city}
                country={education.country}
            />
        )
    }

    return (

        <Document title={`${firstName}-resume`} author={`${firstName}`} subject="resume" keywords="resume, cv" creator="CV Maker by Harsh" producer="CV Maker by Harsh">
            <Page size="A4" >
                <View style={styles.mainContainer}>
                    <View style={styles.sideBar}>

                        <View style={styles.nameSection}>
                            <Text style={styles.firstName}>{firstName}</Text>
                            <Text style={styles.lastName}>{lastName}</Text>
                        </View>

                        {jobTitle ?
                            <View style={[styles.sectionContainer, { alignItems: "center" }]}>
                                <Text style={styles.sectionHeading}>{jobTitle}</Text>
                            </View>
                            : <div style={{ marginBottom: "30px" }}></div>
                        }

                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionHeading}>Info</Text>
                            <View style={styles.sectionBody}>

                                <View style={styles.infoGroup}>
                                    <Image src={profileIcon} style={styles.icons}></Image>
                                    <View style={styles.infoDataGroup}>
                                        <Text style={styles.infoDataName}>Name</Text>
                                        <Text style={styles.infoData}>{firstName} {lastName}</Text>
                                    </View>
                                </View>

                                <View style={styles.infoGroup}>
                                    <Image src={dobIcon} style={styles.icons}></Image>
                                    <View style={styles.infoDataGroup}>
                                        <Text style={styles.infoDataName}>DOB</Text>
                                        {returnMomentDOB(dob)}
                                    </View>
                                </View>

                                <View style={styles.infoGroup}>
                                    <Image src={locationIcon} style={styles.icons}></Image>
                                    <View style={styles.infoDataGroup}>
                                        <Text style={styles.infoDataName}>Address</Text>
                                        <Text style={styles.infoData}>{city}, {country}</Text>
                                    </View>
                                </View>

                                <View style={styles.infoGroup}>
                                    <Image src={phoneIcon} style={styles.icons}></Image>
                                    <View style={styles.infoDataGroup}>
                                        <Text style={styles.infoDataName}>Phone</Text>
                                        {phoneNumber.map(createPhoneNumberField)}
                                    </View>
                                </View>

                                <View style={styles.infoGroup}>
                                    <Image src={emailIcon} style={styles.icons}></Image>
                                    <View style={styles.infoDataGroup}>
                                        <Text style={styles.infoDataName}>Email</Text>
                                        <Text style={styles.infoData}>{email}</Text>
                                    </View>
                                </View>

                                {personalWebsite ?
                                    <View style={styles.infoGroup}>
                                        <Image src={websiteIcon} style={styles.icons}></Image>
                                        <View style={styles.infoDataGroup}>
                                            <Text style={styles.infoDataName}>Website</Text>
                                            <Text style={styles.infoData}>{personalWebsite}</Text>
                                        </View>
                                    </View>
                                    : null}
                            </View>
                        </View>

                        {linkedIn || github ?
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionHeading}>Social</Text>
                                <View style={styles.sectionBody}>

                                    {linkedIn ?
                                        <View style={styles.infoGroup}>
                                            <Image src={linkedinIcon} style={styles.icons}></Image>
                                            <View style={styles.infoDataGroup}>
                                                <Text style={styles.infoDataName}>LinkedIn</Text>
                                                <Text style={styles.infoData}><Link src={`https://linkedin.com/${linkedIn}`}>{linkedIn}</Link></Text>
                                            </View>
                                        </View>
                                        : null}

                                    {github ?
                                        <View style={styles.infoGroup}>
                                            <Image src={githubIcon} style={styles.icons}></Image>
                                            <View style={styles.infoDataGroup}>
                                                <Text style={styles.infoDataName}>GitHub</Text>
                                                <Text style={styles.infoData}><Link src={`https://github.com/${github}`}>{github}</Link></Text>
                                            </View>
                                        </View>
                                        : null}
                                </View>
                            </View>
                            : null}

                        <View style={styles.sectionContainer}>
                            <Text style={styles.sectionHeading}>Language</Text>
                            <View style={styles.sectionBody}>
                                <View style={styles.infoGroupSameLine}>
                                    {languages.map(createLanguageField)}
                                </View>
                            </View>
                        </View>

                        {hobbies.length !== 0 ?
                            <View style={styles.sectionContainer}>
                                <Text style={styles.sectionHeading}>Hobby</Text>
                                <View style={styles.sectionBody}>
                                    <View style={styles.infoGroupSameLine}>
                                        {hobbies.map(createHobbiesField)}
                                    </View>
                                </View>
                            </View>
                            : null}



                    </View>

                    <View style={styles.bodyContainer}>
                        {education.map(createEducationCard)}
                    </View>
                </View>
            </Page>
        </Document>

    )
}

export default function GeneratedOutput({ recievedData }) {
    const classes = useStyles();
    return (
        <>
            <Grid container alignItems="center" justifyContent="center" >
                <Card raised={true} className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <PDFViewer width="100%" height="900px" showToolbar="false">
                            <GeneratedPDF recievedData={recievedData} />
                        </PDFViewer>
                    </CardContent>
                </Card>
            </Grid>

            <Button variant="contained" color="primary" className={classes.downloadButton}>
                <PDFDownloadLink document={<GeneratedPDF recievedData={recievedData} />} fileName={`${recievedData.firstName}-resume.pdf`} style={styles.downloadButton}>
                    {({ blob, url, loading, error }) =>
                        loading ? 'Loading Document' : 'Download'
                    }
                </PDFDownloadLink>
            </Button>
        </>
    )
}
