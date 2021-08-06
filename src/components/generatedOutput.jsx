import React from 'react';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import EducationCard from './EducationCard';

export default function GeneratedOutput({ recievedData }) {

    const { firstName, lastName, email, phoneNumber, education } = recievedData;

    console.log(JSON.stringify(recievedData, null, 6));
    console.log(recievedData);

    function returnMomentDate(date) {
        return (
            <Typography> {moment(date).format('MMMM YYYY')}</Typography>
        )
    }
    function createPhoneNumberField(contact) {
        return (
            <Typography>{contact.number}</Typography>
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

        <div>
            <Typography>First Name is {firstName}</Typography>
            <Typography>Last Name is {lastName}</Typography>
            <Typography>Email is {email}</Typography>
            {phoneNumber.map(createPhoneNumberField)}
            {education.map(createEducationCard)}

        </div>

    )
}
