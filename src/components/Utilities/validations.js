/* eslint-disable max-len */
const emailPattern = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
const dobPattern = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

const greaterThan = (value, min) => value > min;
const lessThan = (value, max) => value < max;

export const emailIsValid = email => emailPattern.test(email);
export const dobIsValid = dob => dobPattern.test(dob);
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

