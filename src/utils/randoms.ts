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
  const random = randomIntFromInterval(min, max, false);
  return Number(random.toFixed(digits));
};

export const randomValueFromDictionary = (dictionary: Array<string>) => {
  const random = randomIntFromInterval(0, dictionary.length - 1);
  return dictionary[random];
};

const rndRegion = () => {
  return randomValueFromDictionary(regionCodes);
};

export const rndRegNumber = () => {
  return "".concat(
    randomValueFromDictionary(regNumberLetters),
    randomIntFromInterval(0, 9).toString(),
    randomIntFromInterval(10, 99).toString(),
    randomValueFromDictionary(regNumberLetters),
    randomValueFromDictionary(regNumberLetters),
    rndRegion()
  );
};
