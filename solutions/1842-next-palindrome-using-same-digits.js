/**
 * Next Palindrome Using Same Digits
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var nextPalindrome = function (num) {
  const inputLength = num.length;
  const halfSize = Math.floor(inputLength / 2);
  const originalLeftHalf = num.slice(0, halfSize).split("");

  const nextPermutationFound = advanceToNextPermutation(originalLeftHalf);

  if (!nextPermutationFound) {
    return "";
  }

  const newLeftHalfString = originalLeftHalf.join("");
  const newRightHalfArray = originalLeftHalf.slice().reverse();
  const newRightHalfString = newRightHalfArray.join("");

  let middleDigitCharacter = "";
  if (inputLength % 2 === 1) {
    middleDigitCharacter = num[halfSize];
  }

  return newLeftHalfString + middleDigitCharacter + newRightHalfString;
};

function advanceToNextPermutation(workingDigits) {
  let pivotLocation = -1;
  const arraySize = workingDigits.length;

  for (
    let currentPosition = arraySize - 2;
    currentPosition >= 0;
    currentPosition--
  ) {
    if (workingDigits[currentPosition] < workingDigits[currentPosition + 1]) {
      pivotLocation = currentPosition;
      break;
    }
  }

  if (pivotLocation === -1) {
    return false;
  }

  for (
    let swapCandidatePosition = arraySize - 1;
    swapCandidatePosition > pivotLocation;
    swapCandidatePosition--
  ) {
    if (workingDigits[swapCandidatePosition] > workingDigits[pivotLocation]) {
      let temporaryHolder = workingDigits[pivotLocation];
      workingDigits[pivotLocation] = workingDigits[swapCandidatePosition];
      workingDigits[swapCandidatePosition] = temporaryHolder;
      break;
    }
  }

  const prefixSegment = workingDigits.slice(0, pivotLocation + 1);
  const suffixSegment = workingDigits.slice(pivotLocation + 1).reverse();

  for (
    let reconstructionIndex = 0;
    reconstructionIndex < arraySize;
    reconstructionIndex++
  ) {
    if (reconstructionIndex < prefixSegment.length) {
      workingDigits[reconstructionIndex] = prefixSegment[reconstructionIndex];
    } else {
      workingDigits[reconstructionIndex] =
        suffixSegment[reconstructionIndex - prefixSegment.length];
    }
  }

  return true;
}
