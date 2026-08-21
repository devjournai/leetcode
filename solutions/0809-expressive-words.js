/**
 * Expressive Words
 * Intuition: Group runs of the same letter. Query runs must match letters, cannot be longer than S, and S may stretch only if that S-run length is ≥ 3.
 * Approach: 1. For each word call `checkStretchy`. 2. Walk both strings; on mismatch false. 3. Measure both run lengths; reject if query > source or source > query but source < 3. 4. Both pointers must finish.
 * Dry Run: S = "heeellooo", word = "hello". Groups h/eee/ll/ooo vs h/e/ll/o; e and o stretch (len≥3) → true.
 * Time Complexity: O(W * (N + K_max))
 * Space Complexity: O(1)
 */
var expressiveWords = function (sourceInputString, wordsToExamine) {
  let totalStretchyCount = 0;

  for (const currentWordConsidered of wordsToExamine) {
    if (checkStretchy(sourceInputString, currentWordConsidered)) {
      totalStretchyCount++;
    }
  }

  return totalStretchyCount;
};

function checkStretchy(mainSource, mainQuery) {
  let sourceStringPointer = 0;
  let queryWordPointer = 0;

  while (
    sourceStringPointer < mainSource.length &&
    queryWordPointer < mainQuery.length
  ) {
    if (mainSource[sourceStringPointer] !== mainQuery[queryWordPointer]) {
      return false;
    }

    const currentGroupCharacter = mainSource[sourceStringPointer];

    let nextSourcePosition = sourceStringPointer;
    while (
      nextSourcePosition < mainSource.length &&
      mainSource[nextSourcePosition] === currentGroupCharacter
    ) {
      nextSourcePosition++;
    }
    const sourceGroupLength = nextSourcePosition - sourceStringPointer;
    sourceStringPointer = nextSourcePosition;

    let nextQueryPosition = queryWordPointer;
    while (
      nextQueryPosition < mainQuery.length &&
      mainQuery[nextQueryPosition] === currentGroupCharacter
    ) {
      nextQueryPosition++;
    }
    const queryGroupLength = nextQueryPosition - queryWordPointer;
    queryWordPointer = nextQueryPosition;

    if (queryGroupLength > sourceGroupLength) {
      return false;
    }
    if (sourceGroupLength > queryGroupLength && sourceGroupLength < 3) {
      return false;
    }
  }

  return (
    sourceStringPointer === mainSource.length &&
    queryWordPointer === mainQuery.length
  );
}
