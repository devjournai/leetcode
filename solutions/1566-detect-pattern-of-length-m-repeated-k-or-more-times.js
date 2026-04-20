/**
 * Detect Pattern Of Length M Repeated K Or More Times
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
