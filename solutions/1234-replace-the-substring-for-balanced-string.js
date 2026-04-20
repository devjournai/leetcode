/**
 * Replace The Substring For Balanced String
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var balancedString = function (s) {
  const totalLength = s.length;
  const targetFrequency = totalLength / 4;
  const charOccurrences = { Q: 0, W: 0, E: 0, R: 0 };

  for (
    let initialScanIndex = 0;
    initialScanIndex < totalLength;
    initialScanIndex++
  ) {
    charOccurrences[s[initialScanIndex]]++;
  }

  let isStringInitiallyBalanced = true;
  for (const characterType of ["Q", "W", "E", "R"]) {
    if (charOccurrences[characterType] !== targetFrequency) {
      isStringInitiallyBalanced = false;
      break;
    }
  }

  if (isStringInitiallyBalanced) {
    return 0;
  }

  let minimumWindowSize = totalLength;
  let currentWindowLeft = 0;

  for (
    let currentWindowRight = 0;
    currentWindowRight < totalLength;
    currentWindowRight++
  ) {
    let rightChar = s[currentWindowRight];
    charOccurrences[rightChar]--;

    while (currentWindowLeft <= currentWindowRight) {
      let allCountsWithinTarget = true;
      for (const keyCharType of ["Q", "W", "E", "R"]) {
        if (charOccurrences[keyCharType] > targetFrequency) {
          allCountsWithinTarget = false;
          break;
        }
      }

      if (!allCountsWithinTarget) {
        break;
      }

      let currentWindowLength = currentWindowRight - currentWindowLeft + 1;
      minimumWindowSize = Math.min(minimumWindowSize, currentWindowLength);

      let leftChar = s[currentWindowLeft];
      charOccurrences[leftChar]++;
      currentWindowLeft++;
    }
  }

  return minimumWindowSize;
};
