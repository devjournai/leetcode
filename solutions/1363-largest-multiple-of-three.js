/**
 * Largest Multiple Of Three
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var largestMultipleOfThree = function (digits) {
  const digitFrequencies = new Array(10).fill(0);
  let totalSumOfDigits = 0;

  for (const singleInputDigit of digits) {
    digitFrequencies[singleInputDigit]++;
    totalSumOfDigits += singleInputDigit;
  }

  const constructResultString = (currentFrequenciesSnapshot) => {
    let generatedStringOutput = "";
    for (
      let currentDigitValue = 9;
      currentDigitValue >= 0;
      currentDigitValue--
    ) {
      for (
        let frequencyLoopIterator = 0;
        frequencyLoopIterator < currentFrequenciesSnapshot[currentDigitValue];
        frequencyLoopIterator++
      ) {
        generatedStringOutput += currentDigitValue;
      }
    }
    if (generatedStringOutput.length > 0 && generatedStringOutput[0] === "0") {
      return "0";
    }
    return generatedStringOutput;
  };

  const compareAndSelectLargest = (
    firstCandidateString,
    secondCandidateString,
  ) => {
    const firstStringLength = firstCandidateString.length;
    const secondStringLength = secondCandidateString.length;

    if (firstStringLength > secondStringLength) {
      return firstCandidateString;
    }
    if (secondStringLength > firstStringLength) {
      return secondCandidateString;
    }
    if (firstStringLength === 0) {
      return "";
    }
    return firstCandidateString > secondCandidateString
      ? firstCandidateString
      : secondCandidateString;
  };

  const overallRemainder = totalSumOfDigits % 3;

  if (overallRemainder === 0) {
    return constructResultString(digitFrequencies);
  }

  const digitsWithModOne = [];
  const digitsWithModTwo = [];

  for (let digitIndexForMod = 0; digitIndexForMod < 10; digitIndexForMod++) {
    for (
      let countLoopForMod = 0;
      countLoopForMod < digitFrequencies[digitIndexForMod];
      countLoopForMod++
    ) {
      if (digitIndexForMod % 3 === 1) {
        digitsWithModOne.push(digitIndexForMod);
      } else if (digitIndexForMod % 3 === 2) {
        digitsWithModTwo.push(digitIndexForMod);
      }
    }
  }

  digitsWithModOne.sort((valA, valB) => valA - valB);
  digitsWithModTwo.sort((valA, valB) => valA - valB);

  let resultOptionOneRemoval = "";
  let resultOptionTwoRemovals = "";

  const frequenciesAdjustedOne = Array.from(digitFrequencies);
  let oneRemovalPossible = false;
  let singleDigitToRemove;

  if (overallRemainder === 1) {
    if (digitsWithModOne.length > 0) {
      singleDigitToRemove = digitsWithModOne[0];
      frequenciesAdjustedOne[singleDigitToRemove]--;
      oneRemovalPossible = true;
    }
  } else {
    // overallRemainder === 2
    if (digitsWithModTwo.length > 0) {
      singleDigitToRemove = digitsWithModTwo[0];
      frequenciesAdjustedOne[singleDigitToRemove]--;
      oneRemovalPossible = true;
    }
  }

  if (oneRemovalPossible) {
    resultOptionOneRemoval = constructResultString(frequenciesAdjustedOne);
  }

  const frequenciesAdjustedTwo = Array.from(digitFrequencies);
  let twoRemovalsPossible = false;
  let firstRemovedValue;
  let secondRemovedValue;

  if (overallRemainder === 1) {
    if (digitsWithModTwo.length >= 2) {
      firstRemovedValue = digitsWithModTwo[0];
      secondRemovedValue = digitsWithModTwo[1];
      frequenciesAdjustedTwo[firstRemovedValue]--;
      frequenciesAdjustedTwo[secondRemovedValue]--;
      twoRemovalsPossible = true;
    }
  } else {
    // overallRemainder === 2
    if (digitsWithModOne.length >= 2) {
      firstRemovedValue = digitsWithModOne[0];
      secondRemovedValue = digitsWithModOne[1];
      frequenciesAdjustedTwo[firstRemovedValue]--;
      frequenciesAdjustedTwo[secondRemovedValue]--;
      twoRemovalsPossible = true;
    }
  }

  if (twoRemovalsPossible) {
    resultOptionTwoRemovals = constructResultString(frequenciesAdjustedTwo);
  }

  let finalResult = compareAndSelectLargest(
    resultOptionOneRemoval,
    resultOptionTwoRemovals,
  );

  return finalResult;
};
