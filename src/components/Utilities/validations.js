/* eslint-disable max-len */
import moment from 'moment';
const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const greaterThan = (value, min) => value > min;
const lessThan = (value, max) => value < max;

export const emailIsValid = email => emailPattern.test(email);
export const dobIsValid = (date) =>{

    const format = 'DD/MM/YYYY'; // Your date format
    const resultFormat = 'years'; // Result format (years, months, days)

    const age = moment().diff(moment(date, format), resultFormat, true);

    if (age >= 13){

        return true;

    } else {

        return false;

    }

};

export const isBetween = (value, min, max) => lessThan(value, max) && greaterThan(value, min);

export default {
    is: {
        valid: {
            email: emailIsValid,
            dob: dobIsValid
        },
        between: isBetween,
        greaterThan,
        lessThan
    }
};

