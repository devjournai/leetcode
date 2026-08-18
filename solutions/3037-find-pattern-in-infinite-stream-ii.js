/**
 * Find Pattern In Infinite Stream II
 * Intuition: The problem requires finding a pattern in an infinite stream, making brute-force O(N*M) approaches infeasible if N (stream length) grows very large. The Knuth-Morris-Pratt (KMP) algorithm is ideal for this scenario as it achieves O(N+M) complexity by avoiding re-scanning the stream upon mismatches. It preprocesses the pattern to build a "failure function" (or LPS array) which dictates how much to shift the pattern when a mismatch occurs.
 * Approach: 1. Preprocess the given `pattern` array to construct its Longest Proper Prefix which is also a Suffix (LPS) array. This array `lpsArray[i]` stores the length of the longest proper prefix of `pattern[0...i]` that is also a suffix of `pattern[0...i]`. This is done in a helper function `buildLPSFunction`. 2. Initialize two pointers: `streamReadOffset` to track the current index in the infinite stream (effectively, how many bits have been read) and `patternComparisonPosition` to track the current matching position within the `pattern`. 3. Continuously read bits from the `stream`. For each `streamCurrentBit` read: a. If there's a mismatch (`patternComparisonPosition > 0` and `pattern[patternComparisonPosition] !== streamCurrentBit`), use the `lpsArray` to shift the pattern. Specifically, set `patternComparisonPosition = lpsArray[patternComparisonPosition - 1]`. Repeat this until `patternComparisonPosition` is 0 or a match is found. b. If there's a match (`pattern[patternComparisonPosition] === streamCurrentBit`), increment `patternComparisonPosition`. c. If `patternComparisonPosition` reaches the `targetPatternLength`, a full match is found. Return the starting index of this match, which is `streamReadOffset - targetPatternLength + 1`. d. Increment `streamReadOffset` to move to the next position in the conceptual stream.
 * Dry Run:
 *   pattern = [1, 0], stream = [0, 1, 0, 1, ...]
 *   1. buildLPSFunction([1, 0]):
 *      - patternLengthValue = 2
 *      - lpsComputedArray = [0, 0]
 *      - currentPatternPrefixLength = 0
 *      - lpsIteratorIndex = 1:
 *          - pattern[currentPatternPrefixLength] (pattern[0]=1) !== pattern[lpsIteratorIndex] (pattern[1]=0).
 *          - currentPatternPrefixLength > 0 is false.
 *          - pattern[currentPatternPrefixLength] === pattern[lpsIteratorIndex] is (1 === 0) which is false.
 *          - lpsComputedArray[1] = 0.
 *      - Returns [0, 0].
 *   2. findPattern(stream, [1, 0]):
 *      - targetPatternLength = 2
 *      - lpsFunctionOutput = [0, 0]
 *      - streamReadOffset = 0
 *      - patternComparisonPosition = 0
 *      - Loop (streamReadOffset = 0):
 *          - streamCurrentBit = stream.next() (reads 0)
 *          - while condition (patternComparisonPosition > 0...) is false (patternComparisonPosition is 0).
 *          - if (pattern[patternComparisonPosition] === streamCurrentBit) (pattern[0]=1 === 0) is false.
 *          - patternComparisonPosition remains 0.
 *          - if (patternComparisonPosition === targetPatternLength) (0 === 2) is false.
 *          - streamReadOffset becomes 1.
 *      - Loop (streamReadOffset = 1):
 *          - streamCurrentBit = stream.next() (reads 1)
 *          - while condition is false.
 *          - if (pattern[patternComparisonPosition] === streamCurrentBit) (pattern[0]=1 === 1) is true.
 *          - patternComparisonPosition becomes 1.
 *          - if (patternComparisonPosition === targetPatternLength) (1 === 2) is false.
 *          - streamReadOffset becomes 2.
 *      - Loop (streamReadOffset = 2):
 *          - streamCurrentBit = stream.next() (reads 0)
 *          - while condition (patternComparisonPosition > 0 (1 > 0) && pattern[patternComparisonPosition] (pattern[1]=0) !== streamCurrentBit (0)) is false (0 !== 0 is false).
 *          - if (pattern[patternComparisonPosition] === streamCurrentBit) (pattern[1]=0 === 0) is true.
 *          - patternComparisonPosition becomes 2.
 *          - if (patternComparisonPosition === targetPatternLength) (2 === 2) is true.
 *          - Return streamReadOffset - targetPatternLength + 1 = 2 - 2 + 1 = 1.
 * Time Complexity: O(M + K)
 * Space Complexity: O(M)
 */
var findPattern = function (stream, pattern) {
  const targetPatternLength = pattern.length;
  const lpsFunctionOutput = buildLPSFunction(pattern);

  let streamReadOffset = 0;
  let patternComparisonPosition = 0;

  while (true) {
    const streamCurrentBit = stream.next();

    while (
      patternComparisonPosition > 0 &&
      pattern[patternComparisonPosition] !== streamCurrentBit
    ) {
      patternComparisonPosition =
        lpsFunctionOutput[patternComparisonPosition - 1];
    }

    if (pattern[patternComparisonPosition] === streamCurrentBit) {
      patternComparisonPosition++;
    }

    if (patternComparisonPosition === targetPatternLength) {
      return streamReadOffset - targetPatternLength + 1;
    }

    streamReadOffset++;
  }

  function buildLPSFunction(patternInput) {
    const patternLengthValue = patternInput.length;
    const lpsComputedArray = new Array(patternLengthValue).fill(0);
    let currentPatternPrefixLength = 0;

    for (
      let lpsIteratorIndex = 1;
      lpsIteratorIndex < patternLengthValue;
      lpsIteratorIndex++
    ) {
      while (
        currentPatternPrefixLength > 0 &&
        patternInput[currentPatternPrefixLength] !==
          patternInput[lpsIteratorIndex]
      ) {
        currentPatternPrefixLength =
          lpsComputedArray[currentPatternPrefixLength - 1];
      }

      if (
        patternInput[currentPatternPrefixLength] ===
        patternInput[lpsIteratorIndex]
      ) {
        currentPatternPrefixLength++;
      }

      lpsComputedArray[lpsIteratorIndex] = currentPatternPrefixLength;
    }

    return lpsComputedArray;
  }
};
