/**
 * Detect Pattern Of Length M Repeated K Or More Times
 * Intuition: A pattern of length m repeating k times is k equal adjacent blocks. Try each start and count matching following blocks.
 * Approach: 1. For each start ≤ n-m*k, compare the next m-blocks to the first. 2. Return true if k matches.
 * Dry Run: arr = [1,2,4,4,4,4], m = 1, k = 3.
 *   - Four consecutive 4s → true.
 * Time Complexity: O(arr.length * k * m)
 * Space Complexity: O(1)
 */
var containsPattern = function (arr, m, k) {
  const arrayLength = arr.length;

  for (
    let patternStart = 0;
    patternStart <= arrayLength - m * k;
    patternStart++
  ) {
    let currentRepetitionsCount = 1;
    let nextPatternStart = patternStart + m;

    while (currentRepetitionsCount < k && nextPatternStart + m <= arrayLength) {
      let isBlockMatching = true;
      for (
        let patternElementIndex = 0;
        patternElementIndex < m;
        patternElementIndex++
      ) {
        if (
          arr[patternStart + patternElementIndex] !==
          arr[nextPatternStart + patternElementIndex]
        ) {
          isBlockMatching = false;
          break;
        }
      }

      if (isBlockMatching) {
        currentRepetitionsCount++;
        nextPatternStart += m;
      } else {
        break;
      }
    }

    if (currentRepetitionsCount >= k) {
      return true;
    }
  }

  return false;
};
