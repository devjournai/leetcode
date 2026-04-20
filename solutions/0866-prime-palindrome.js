/**
 * Prime Palindrome
 * Time Complexity: O(P)
 * Space Complexity: O(log P)
 */
var primePalindrome = function (initialN) {
  let currentNum = initialN;

  while (true) {
    let numAsString = currentNum.toString();
    let numLength = numAsString.length;

    if (numLength % 2 === 0 && currentNum > 11) {
      let nextOddLengthStart = Math.pow(10, numLength);
      currentNum = nextOddLengthStart;
      continue;
    }

    let isCurrentValuePalindrome = checkStringPalindrome(numAsString);
    if (!isCurrentValuePalindrome) {
      currentNum++;
      continue;
    }

    let isCurrentValuePrime = checkIfPrime(currentNum);
    if (isCurrentValuePrime) {
      return currentNum;
    }

    currentNum++;
  }
};

function checkIfPrime(numValue) {
  if (numValue <= 1) return false;
  if (numValue <= 3) return true;
  if (numValue % 2 === 0 || numValue % 3 === 0) return false;

  let testDivisor = 5;
  while (testDivisor * testDivisor <= numValue) {
    if (numValue % testDivisor === 0 || numValue % (testDivisor + 2) === 0) {
      return false;
    }
    testDivisor += 6;
  }
  return true;
}

function checkStringPalindrome(targetString) {
  for (
    let startCharIndex = 0, endCharIndex = targetString.length - 1;
    startCharIndex < endCharIndex;
    startCharIndex++, endCharIndex--
  ) {
    if (targetString[startCharIndex] !== targetString[endCharIndex]) {
      return false;
    }
  }
  return true;
}
