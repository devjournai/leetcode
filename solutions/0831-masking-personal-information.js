/**
 * Masking Personal Information
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
