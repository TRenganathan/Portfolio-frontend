import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

export const SECRET_KEY = "AaBbssdgcjsdcbDatasad_93d7_dcdessssssfFgggFvdddhh";

export const setEncryptedCookie = (name, value) => {
  const encryptedValue = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
  const option = {
    httpOnly: false,
    secure: true,
  };
  Cookies.set(name, encryptedValue, option);
  // localStorage.setItem(name, encryptedValue);
  Cookies.set("toggletheme", false);
};

export const getDecryptedCookie = (name) => {
  const encryptedValue = Cookies.get(name);
  let encryptedLocalStorageValue;
  // if (typeof localStorage !== "undefined") {
  //   encryptedLocalStorageValue = localStorage.getItem(name);
  // }

  if (encryptedValue) {
    const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);

    return bytes.toString(CryptoJS.enc.Utf8);
  }
  // if (encryptedLocalStorageValue) {
  //   // const bytes = CryptoJS.AES.decrypt(encryptedValue, SECRET_KEY);
  //   const bytesLocalStorage = CryptoJS.AES.decrypt(
  //     encryptedLocalStorageValue,
  //     SECRET_KEY
  //   );
  //   if (bytesLocalStorage) {
  //     return bytesLocalStorage.toString(CryptoJS.enc.Utf8);
  //   }
  // }
  return null;
};
