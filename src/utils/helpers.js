import moment from "moment";
import { PUBLIC_TOKEN, PUBLIC_URL } from "./constants";
import numeral from "numeral";

numeral.register("locale", "vi", {
  delimiters: {
    thousands: ".",
    decimal: ",",
  },
  abbreviations: {
    thousand: "Nghìn",
    million: "Triệu",
    billion: "Tỷ",
    trillion: "Nghìn Tỷ",
  },
  currency: {
    symbol: "₫",
  },
});
numeral.locale("vi");

function formatDateDisplay(date, format = "DD/MM/YYYY") {
  if (!date) return;
  if (!moment(date).isValid()) return date;
  return moment(date).format(format);
}

// generate search keywords
const generateSearchKeywords = (obj = {}) => {
  let result = "";
  for (let key in obj) {
    result += `${!result ? "?" : "&"}${key}=${JSON.stringify(obj[key])}`;
  }
  return result;
};

// generate random string
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

// generate link image
const generateLinkImage = (link) => {
  return `${PUBLIC_URL}${link}?access_token=${PUBLIC_TOKEN}`;
};

export {
  numeral as numeralCustom,
  formatDateDisplay,
  generateSearchKeywords,
  generateRandomString,
  generateLinkImage,
};
