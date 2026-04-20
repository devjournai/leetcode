/**
 * Find All Good Strings
 * Time Complexity: O(n * M * alphabet_size)
 * Space Complexity: O(n * M)
 */
var findGoodStrings = function (n, s1, s2, evil) {
  const goodStringsModulus = 1e9 + 7;
  const dpMemoization = new Map();

  function generateLPSArray(kmpPatternInput) {
    const lpsResultArray = new Array(kmpPatternInput.length).fill(0);
    let currentMatchLength = 0;
    let patternScanIndex = 1;

    while (patternScanIndex < kmpPatternInput.length) {
      if (
        kmpPatternInput[patternScanIndex] ===
        kmpPatternInput[currentMatchLength]
      ) {
        currentMatchLength++;
        lpsResultArray[patternScanIndex] = currentMatchLength;
        patternScanIndex++;
      } else {
        if (currentMatchLength !== 0) {
          currentMatchLength = lpsResultArray[currentMatchLength - 1];
        } else {
          lpsResultArray[patternScanIndex] = 0;
          patternScanIndex++;
        }
      }
    }
    return lpsResultArray;
  }

  const precomputedEvilLPS = generateLPSArray(evil);

  function countStringsRecursive(
    stringBuildIndex,
    evilKmpState,
    lowerBoundActive,
    upperBoundActive,
    s1Reference,
    s2Reference,
    evilReference,
    lpsReference,
  ) {
    if (evilKmpState === evilReference.length) {
      return 0;
    }
    if (stringBuildIndex === n) {
      return 1;
    }

    const memoKeyString = `${stringBuildIndex}:${evilKmpState}:${lowerBoundActive}:${upperBoundActive}`;
    if (dpMemoization.has(memoKeyString)) {
      return dpMemoization.get(memoKeyString);
    }

    let functionResultAccumulator = 0;
    const charIterationStart = lowerBoundActive
      ? s1Reference[stringBuildIndex]
      : "a";
    const charIterationEnd = upperBoundActive
      ? s2Reference[stringBuildIndex]
      : "z";

    for (
      let currentCharAscii = charIterationStart.charCodeAt(0);
      currentCharAscii <= charIterationEnd.charCodeAt(0);
      currentCharAscii++
    ) {
      const currentChar = String.fromCharCode(currentCharAscii);

      let nextEvilMatchCandidate = evilKmpState;
      while (
        nextEvilMatchCandidate > 0 &&
        currentChar !== evilReference[nextEvilMatchCandidate]
      ) {
        nextEvilMatchCandidate = lpsReference[nextEvilMatchCandidate - 1];
      }
      if (currentChar === evilReference[nextEvilMatchCandidate]) {
        nextEvilMatchCandidate++;
      }

      const nextLowerBoundStatus =
        lowerBoundActive && currentChar === s1Reference[stringBuildIndex];
      const nextUpperBoundStatus =
        upperBoundActive && currentChar === s2Reference[stringBuildIndex];

      const callReturnValue = countStringsRecursive(
        stringBuildIndex + 1,
        nextEvilMatchCandidate,
        nextLowerBoundStatus,
        nextUpperBoundStatus,
        s1Reference,
        s2Reference,
        evilReference,
        lpsReference,
      );
      functionResultAccumulator =
        (functionResultAccumulator + callReturnValue) % goodStringsModulus;
    }

    dpMemoization.set(memoKeyString, functionResultAccumulator);
    return functionResultAccumulator;
  }

  const goodStringCountResult = countStringsRecursive(
    0,
    0,
    true,
    true,
    s1,
    s2,
    evil,
    precomputedEvilLPS,
  );
  return goodStringCountResult;
};
