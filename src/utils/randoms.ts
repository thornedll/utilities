import { regNumberLetters, regionCodes } from "../constants";

export const randomIntFromInterval = (
  min: number,
  max: number,
  isInt: boolean = true
) => {
  const random = Math.random() * (max - min) + min;
  if (isInt) {
    return Math.floor(random);
  }
  return random;
};

export const randomFractionFromInterval = (
  min: number,
  max: number,
  digits: number = 2
) => {
  const randomInt = randomIntFromInterval(min, max, false);
  return Number(randomInt.toFixed(digits));
};

export const randomValueFromDictionary = (dictionary: Array<string>) => {
  const random = randomIntFromInterval(0, dictionary.length - 1);
  return dictionary[random];
};

const rndRegion = () => randomValueFromDictionary(regionCodes);

// const rndLetter = (alphabet: string): string => {
//   switch (alphabet) {
//     case "en":
//       return String.fromCharCode(0 | (Math.random() * 26 + 97));
//     case "ru":
//       return String.fromCharCode(0 | (Math.random() * 32 + 1072));
//     default:
//       return "";
//   }
// };

// const rndLineOfLetters = (size: number, alphabet: string): string => {
//   return Array<string>(size)
//     .fill("")
//     .map(() => rndLetter(alphabet))
//     .join("")
//     .toUpperCase();
// };

export const rndRegNumber = (country: string): string => {
  switch (country) {
    case "ru":
      return "".concat(
        randomValueFromDictionary(regNumberLetters.ru),
        randomIntFromInterval(0, 9).toString(),
        randomIntFromInterval(10, 99).toString(),
        randomValueFromDictionary(regNumberLetters.ru),
        randomValueFromDictionary(regNumberLetters.ru),
        rndRegion()
      );
    case "by":
      return "".concat(
        randomValueFromDictionary(regNumberLetters.by),
        randomValueFromDictionary(regNumberLetters.by),
        randomIntFromInterval(10000, 99999).toString()
      );
    default:
      return "";
  }
};

export const rndUuid = (): string => {
  return crypto.randomUUID();
};
