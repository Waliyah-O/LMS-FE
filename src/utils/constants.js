export const hasSpecialCharacter = (value) => {
    return /[!@#$%^&*()\-_=+{};:,<.>]/.test(value);
};

export const hasCaps = (value) => {
    return /(.*[A-Z].*)/.test(value);
};

export const hasLowerCase = (value) => {
    return /(.*[a-z].*)/.test(value);
};

export const hasDigit = (value) => {
    return /(.*\d.*)/.test(value);
};


