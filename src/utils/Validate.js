import { _ } from 'lodash';

export const PHONE_PREFIX = '+84';

export const PHONE_REGEX = /^0+[3,5,7,8,9]{1}[0-9]{1}[1-9]{1}[0-9]{6}$/;
export const NUMBER_REGEX = /^[0-9]*$/;
export const EMAIL_REGEX = /^[\w+][\w\.\-]+@[\w\-]+(\.\w{2,10})+$/;
export const PASSWORD_REGEX = /^\w{6,20}$/;

export const SECONDS_IN_DAY = 864e5;
export const DELAY_CLICK = 3e2;
export const MIN_MONEY = 1e5;
export const ZERO = '0';
const YOUTUBE_LINK_REGEX = /^(http(s)?:\/\/)?((w){3}.)?(m.)?youtu(be|.be)?(\.com)?\/.+/;
const FACEBOOK_LINK_REGEX = /^(?:(?:http|https):\/\/)?(?:www.)?facebook.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[?\w\-]*\/)?(?:profile.php\?id=(?=\d.*))?([\w\-]*)?/;


function isEmpty(...data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i]) return false;
    }
    return true;
}

function isStringEmpty(string) {
    return !string || string === 'null' || String.prototype.trim.call(string) === '';
}

function isEmptyValue(value) {
    return typeof value === 'undefined' || value === null || value.toString().length === 0;
}

function isObjectEmpty(obj) {
    return _.isEmpty(obj);
}

function isListEmpty(obj) {
    return typeof obj === 'undefined' || obj === null || obj.length === 0;
}

function isEmptyNumber(value) {
    const _isEmpty = isEmptyValue(`${value}`);
    if (!_isEmpty) {
        const number = Number((`${value}`).replace(/[^0-9]/g, ''));
        return number === 0;
    }
    return true;
}

function stringIsNumberOnly(value) {
    if (value) {
        return NUMBER_REGEX.test(value);
    }
    return false;
}

function isValidPhone(phone) {
    if (phone) {
        return PHONE_REGEX.test(phone);
    }
    return false;
}

function isValidEmail(orgEmail) {
    if (orgEmail) {
        return EMAIL_REGEX.test(orgEmail);
    }
    return false;
}

function isValidPassword(orgPass) {
    if (orgPass) {
        // password cho phep nhap tieng viet -> ko check regex nua, chi check length
        // return PASSWORD_REGEX.test(orgPass);
        return orgPass.length >= 6 && orgPass.length <= 20;
    }
    return false;
}

function isFbYoutubeLink(link) {
    return YOUTUBE_LINK_REGEX.test(link) || FACEBOOK_LINK_REGEX.test(link);
}

function trim(str) {
    if (str) {
        return String.prototype.trim.call(str);
    }
    return '';
}

function upperOneChar(str) {
    if (str) {
        const char = /[A-Z]/;
        return char.test(str);
    }
    return false;
}

function checkSpecialChar(str) {
    if (str) {
        const char = /[^A-Za-z 0-9]/g;
        return char.test(str);
    }
    return false;
}
function checkSpaceChar(str) {
    if (str) {
        const char = /(\s+\S+\s*)/;
        return char.test(str);
    }
    return false;
}

function formatMoney(number) {
    if (!number) {
        return '0 đ';
    }
    return (
        `${Math.ceil(Number(number))
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ`
    );
}

export default {
    isEmpty,
    isStringEmpty,
    isEmptyValue,
    isObjectEmpty,
    isListEmpty,
    isEmptyNumber,
    isValidPhone,
    trim,
    isValidEmail,
    isValidPassword,
    stringIsNumberOnly,
    isFbYoutubeLink,
    upperOneChar,
    checkSpecialChar,
    checkSpaceChar,
    formatMoney
};