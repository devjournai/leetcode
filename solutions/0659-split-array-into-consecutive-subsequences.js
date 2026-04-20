/**
 * Split Array Into Consecutive Subsequences
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var isPossible = function (nums) {
  const initialFrequencies = new Map();
  const subsequenceNextExpected = new Map();

  for (const numberValue of nums) {
    initialFrequencies.set(
      numberValue,
      (initialFrequencies.get(numberValue) || 0) + 1,
    );
  }

  for (const processedNumber of nums) {
    const currentNumberAvailable = initialFrequencies.get(processedNumber) || 0;
    if (currentNumberAvailable === 0) {
      continue;
    }

    const nextExpectedForSubsequence =
      subsequenceNextExpected.get(processedNumber) || 0;

    if (nextExpectedForSubsequence > 0) {
      subsequenceNextExpected.set(
        processedNumber,
        nextExpectedForSubsequence - 1,
      );
      initialFrequencies.set(processedNumber, currentNumberAvailable - 1);
      subsequenceNextExpected.set(
        processedNumber + 1,
        (subsequenceNextExpected.get(processedNumber + 1) || 0) + 1,
      );
    } else {
      const nextConsecutiveAvailable =
        initialFrequencies.get(processedNumber + 1) || 0;
      const twoAheadConsecutiveAvailable =
        initialFrequencies.get(processedNumber + 2) || 0;

      if (nextConsecutiveAvailable > 0 && twoAheadConsecutiveAvailable > 0) {
        initialFrequencies.set(processedNumber, currentNumberAvailable - 1);
        initialFrequencies.set(
          processedNumber + 1,
          nextConsecutiveAvailable - 1,
        );
        initialFrequencies.set(
          processedNumber + 2,
          twoAheadConsecutiveAvailable - 1,
        );
        subsequenceNextExpected.set(
          processedNumber + 3,
          (subsequenceNextExpected.get(processedNumber + 3) || 0) + 1,
        );
      } else {
        return false;
      }
    }
  }

  return true;
};
