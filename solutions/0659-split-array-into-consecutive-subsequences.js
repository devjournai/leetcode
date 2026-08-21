/**
 * Split Array Into Consecutive Subsequences
 * Intuition: Prefer appending a number onto an existing chain that needs it; otherwise start a new chain of length 3. Fail if neither is possible.
 * Approach: 1. Count frequencies. 2. For each num still available: if `subsequenceNextExpected` wants it, consume and expect num+1. 3. Else if num+1 and num+2 exist, start a chain and expect num+3. 4. Else return false.
 * Dry Run: nums=[1,2,3,3,4,5].
 *   - 1 starts 1,2,3 expecting 4. Next 3 starts 3,4,5 expecting 6. All consumed → true.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var isPossible = function (nums) {
  const initialFrequencies = new Map();
  const subsequenceNextExpected = new Map();

  for (const numberValue of nums) {
    initialFrequencies.set(
      numberValue,
      (initialFrequencies.get(numberValue) || 0) + 1
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
        nextExpectedForSubsequence - 1
      );
      initialFrequencies.set(processedNumber, currentNumberAvailable - 1);
      subsequenceNextExpected.set(
        processedNumber + 1,
        (subsequenceNextExpected.get(processedNumber + 1) || 0) + 1
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
          nextConsecutiveAvailable - 1
        );
        initialFrequencies.set(
          processedNumber + 2,
          twoAheadConsecutiveAvailable - 1
        );
        subsequenceNextExpected.set(
          processedNumber + 3,
          (subsequenceNextExpected.get(processedNumber + 3) || 0) + 1
        );
      } else {
        return false;
      }
    }
  }

  return true;
};
