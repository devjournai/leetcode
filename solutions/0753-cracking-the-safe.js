/**
 * Cracking The Safe
 * Time Complexity: O(k^n * n)
 * Space Complexity: O(k^n * n)
 */
var crackSafe = function (n, k) {
  if (n === 1) {
    let singleDigitResult = "";
    for (let currentNumber = 0; currentNumber < k; currentNumber++) {
      singleDigitResult += currentNumber.toString();
    }
    return singleDigitResult;
  }

  const visitedSubstrings = new Set();
  const totalExpectedCount = k ** n;
  let finalPassword = "0".repeat(n);

  visitedSubstrings.add(finalPassword);

  function exploreCombinations(currentPasswordState) {
    if (visitedSubstrings.size === totalExpectedCount) {
      return true;
    }

    const nextPrefix = currentPasswordState.slice(-n + 1);
    for (let nextPin = 0; nextPin < k; nextPin++) {
      const candidatePassword = nextPrefix + nextPin.toString();

      if (!visitedSubstrings.has(candidatePassword)) {
        visitedSubstrings.add(candidatePassword);
        finalPassword += nextPin.toString();

        if (exploreCombinations(candidatePassword)) {
          return true;
        }

        finalPassword = finalPassword.slice(0, -1);
        visitedSubstrings.delete(candidatePassword);
      }
    }
    return false;
  }

  exploreCombinations(finalPassword);

  return finalPassword;
};
