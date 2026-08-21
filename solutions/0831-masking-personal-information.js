/**
 * Masking Personal Information
 * Intuition: '@' means email: lowercase, keep first and last letters of the local name, insert "*****", then the domain from '@'. Otherwise collect digits and mask the last 10 as a phone, starring a 1–3 digit country code.
 * Approach: 1. Scan `S` for '@' into `hasAtSymbol`. 2. Email: `toLowerCase()`, find `atSymbolIndex`, return first + "*****" + char before '@' + `substring(atSymbolIndex)`. 3. Phone: push chars in '0'..'9', take last 4 digits, `countryCodeDigitCount = length - 10`, format "***-***-XXXX" or "+*...-***-***-XXXX".
 * Dry Run: S = "LeetCode@LeetCode.com" → '@' found. lower = "leetcode@leetcode.com", local ends at 'e' → "l*****e@leetcode.com".
 *   Phone "1(234)567-890" → digits "1234567890", country 0 → "***-***-7890".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maskPII = function (S) {
  let hasAtSymbol = false;
  let stringLengthCheck = S.length;

  for (
    let currentPosition = 0;
    currentPosition < stringLengthCheck;
    currentPosition++
  ) {
    if (S[currentPosition] === "@") {
      hasAtSymbol = true;
      break;
    }
  }

  if (hasAtSymbol) {
    let lowerCaseInput = S.toLowerCase();
    let atSymbolIndex = -1;
    let lowerCaseLength = lowerCaseInput.length;

    for (let searchIndex = 0; searchIndex < lowerCaseLength; searchIndex++) {
      if (lowerCaseInput[searchIndex] === "@") {
        atSymbolIndex = searchIndex;
        break;
      }
    }

    let firstCharacter = lowerCaseInput[0];
    let lastCharacterOfFirstName = lowerCaseInput[atSymbolIndex - 1];
    let domainSection = lowerCaseInput.substring(atSymbolIndex);

    let resultEmail =
      firstCharacter + "*****" + lastCharacterOfFirstName + domainSection;
    return resultEmail;
  } else {
    let numericCharacters = [];
    let initialStringLength = S.length;

    for (let scanIndex = 0; scanIndex < initialStringLength; scanIndex++) {
      let symbolInString = S[scanIndex];
      if (symbolInString >= "0" && symbolInString <= "9") {
        numericCharacters.push(symbolInString);
      }
    }

    let extractedDigits = numericCharacters.join("");
    let digitStringLength = extractedDigits.length;

    let finalFourDigits = extractedDigits.substring(digitStringLength - 4);

    let countryCodeDigitCount = digitStringLength - 10;

    let maskedPhoneOutput = "";

    if (countryCodeDigitCount === 0) {
      maskedPhoneOutput = "***-***-" + finalFourDigits;
    } else if (countryCodeDigitCount === 1) {
      maskedPhoneOutput = "+*-***-***-" + finalFourDigits;
    } else if (countryCodeDigitCount === 2) {
      maskedPhoneOutput = "+**-***-***-" + finalFourDigits;
    } else if (countryCodeDigitCount === 3) {
      maskedPhoneOutput = "+***-***-***-" + finalFourDigits;
    }

    return maskedPhoneOutput;
  }
};
