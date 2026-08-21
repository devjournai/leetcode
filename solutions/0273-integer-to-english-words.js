/**
 * Integer To English Words
 * Intuition: English groups the number in thousands. Convert each 0–999 chunk with Hundred/teens/tens tables, attach Thousand/Million/Billion, and skip zero chunks. Zero is the only special whole-number case.
 * Approach: 1. 0 → `"Zero"`. 2. `convertThreeDigits` emits hundreds, then 1–9, 10–19, or tens+units. 3. Repeatedly take `workingNumber % 1000`, convert if nonzero, append the magnitude word, `unshift` onto `constructedParts`, then divide by 1000. 4. Join with spaces and trim.
 * Dry Run: 12345.
 *   - 345 → "Three Hundred Forty Five"; 12 → "Twelve Thousand". Join "Twelve Thousand Three Hundred Forty Five".
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var numberToWords = function (initialNumber) {
  if (initialNumber === 0) {
    return "Zero";
  }

  const singleDigitWords = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teenWords = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tensWords = [
    "",
    "Ten",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];
  const magnitudeWords = ["", "Thousand", "Million", "Billion"];

  const convertThreeDigits = (segmentValue) => {
    let segmentStringRepresentation = "";

    const hundredsAmount = Math.floor(segmentValue / 100);
    const twoDigitRemainder = segmentValue % 100;

    if (hundredsAmount > 0) {
      segmentStringRepresentation +=
        singleDigitWords[hundredsAmount] + " Hundred";
    }

    if (twoDigitRemainder > 0) {
      if (segmentStringRepresentation !== "") {
        segmentStringRepresentation += " ";
      }
      if (twoDigitRemainder < 10) {
        segmentStringRepresentation += singleDigitWords[twoDigitRemainder];
      } else if (twoDigitRemainder < 20) {
        segmentStringRepresentation += teenWords[twoDigitRemainder - 10];
      } else {
        segmentStringRepresentation +=
          tensWords[Math.floor(twoDigitRemainder / 10)];
        const unitNumber = twoDigitRemainder % 10;
        if (unitNumber > 0) {
          segmentStringRepresentation += " " + singleDigitWords[unitNumber];
        }
      }
    }
    return segmentStringRepresentation;
  };

  let workingNumber = initialNumber;
  let magnitudePosition = 0;
  const constructedParts = [];

  while (workingNumber > 0) {
    const currentThreeDigits = workingNumber % 1000;
    if (currentThreeDigits > 0) {
      let localizedWords = convertThreeDigits(currentThreeDigits);
      if (magnitudePosition > 0) {
        localizedWords += " " + magnitudeWords[magnitudePosition];
      }
      constructedParts.unshift(localizedWords);
    }
    workingNumber = Math.floor(workingNumber / 1000);
    magnitudePosition++;
  }

  return constructedParts.join(" ").trim();
};
