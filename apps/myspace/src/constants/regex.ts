export const regName = /^[a-zA-z]+/;
export const regPan = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
export const regAadharNumber =
  /^([0-9]{4}[0-9]{4}[0-9]{4}$)|([0-9]{4}\s[0-9]{4}\s[0-9]{4}$)|([0-9]{4}-[0-9]{4}-[0-9]{4}$)/;
export const regMiddleName = /^[A-Za-z]*$/;
export const emailRegex = /^\S+@\S+\.\S+$/;
export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export const Regex = {
  regName,
  regPan,
  regAadharNumber,
  regMiddleName,
  emailRegex,
  passwordRegex,
};
