import { Typography } from '@material-ui/core';
import React from 'react';
import moment from 'moment';

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
    function createEducationField(education) {
        return (
            <div>
                <Typography>{education.institutionName}</Typography>
                <Typography>{education.degree}</Typography>
                <Typography>{education.specialization}</Typography>
                <Typography>{education.percentage}</Typography>
                {education.fromYear !== null ? returnMomentDate(education.fromYear._d) : null}
                {education.toYear !== null ? returnMomentDate(education.toYear._d) : null}
                <Typography>{education.city}</Typography>
                <Typography>{education.country}</Typography>
            </div>
        )
    }


    return (

        <div>
            <Typography>First Name is {firstName}</Typography>
            <Typography>Last Name is {lastName}</Typography>
            <Typography>Email is {email}</Typography>
            {phoneNumber.map(createPhoneNumberField)}
            {education.map(createEducationField)}

        </div>

    )
}