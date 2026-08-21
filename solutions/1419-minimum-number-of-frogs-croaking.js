/**
 * Minimum Number Of Frogs Croaking
 * Intuition: Each 'c' starts a frog and each 'k' finishes one. Counts of c,r,o,a,k must stay non-increasing along the word croak, and all frogs must finish.
 * Approach: 1. On 'c' increment active frogs and track the peak. On 'k' decrement. 2. Reject unknown letters or a letter whose count exceeds the previous letter in "croak". 3. At the end, active must be 0 and c-count == k-count; return the peak (or -1).
 * Dry Run: croakOfFrogs = "croakcroak".
 *   - First croak: active 1 then 0, peak 1. Second croak same. Return 1.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minNumberOfFrogs = function (croakOfFrogs) {
  let frogsCurrentlyActive = 0;
  let peakFrogCount = 0;
  const letterOccurrencesMap = { c: 0, r: 0, o: 0, a: 0, k: 0 };
  const croakPattern = "croak";

  for (
    let characterIndex = 0;
    characterIndex < croakOfFrogs.length;
    characterIndex++
  ) {
    const currentCroakChar = croakOfFrogs[characterIndex];

    if (!croakPattern.includes(currentCroakChar)) {
      return -1;
    }

    letterOccurrencesMap[currentCroakChar]++;

    switch (currentCroakChar) {
      case "c":
        frogsCurrentlyActive++;
        peakFrogCount = Math.max(peakFrogCount, frogsCurrentlyActive);
        break;
      case "k":
        frogsCurrentlyActive--;
        break;
    }

    let previousCountValue;
    let currentCountValue;

    switch (currentCroakChar) {
      case "r":
        previousCountValue = letterOccurrencesMap.c;
        currentCountValue = letterOccurrencesMap.r;
        break;
      case "o":
        previousCountValue = letterOccurrencesMap.r;
        currentCountValue = letterOccurrencesMap.o;
        break;
      case "a":
        previousCountValue = letterOccurrencesMap.o;
        currentCountValue = letterOccurrencesMap.a;
        break;
      case "k":
        previousCountValue = letterOccurrencesMap.a;
        currentCountValue = letterOccurrencesMap.k;
        break;
      default: // 'c' has no direct predecessor in the pattern for this check
        break;
    }

    if (currentCroakChar !== "c" && currentCountValue > previousCountValue) {
      return -1;
    }
  }

  if (
    frogsCurrentlyActive === 0 &&
    letterOccurrencesMap.c === letterOccurrencesMap.k
  ) {
    return peakFrogCount;
  } else {
    return -1;
  }
};
