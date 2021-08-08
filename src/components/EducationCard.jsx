import React from 'react';
import { Text, StyleSheet } from '@react-pdf/renderer';

export default function EducationCard({ degree, institutionName, specialization, percentage, fromYear, toYear, city, country, }) {

    return (
        <>
            <Text>{fromYear} - {toYear}</Text>
            <Text>{city}, {country}</Text>
            <Text>{degree}</Text>
            <Text>{institutionName}</Text>
            <Text>{specialization}</Text>
            <Text>{percentage}</Text>
        </>
    )
}