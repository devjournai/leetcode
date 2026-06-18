/**
 * Longest Ideal Subsequence
 * Intuition: This problem asks for the longest subsequence satisfying a specific condition on adjacent characters, which strongly suggests a dynamic programming approach. We can build the solution by considering each character in the input string and determining the maximum length of an ideal subsequence ending with that character.
 * Approach: 1. Initialize a dynamic programming array, `dpLengths`, of size 26 (for 'a' through 'z') with all elements set to 0. `dpLengths[i]` will store the length of the longest ideal subsequence ending with the `i`-th character of the alphabet. 2. Initialize `maximumOverallLength` to 0 to keep track of the maximum length found across all possible ending characters. 3. Iterate through the input string `stringInput` using an index `stringIndex` from 0 to `stringInput.length - 1`. 4. For each character `charOfS` at `stringInput[stringIndex]`: a. Determine its alphabet `charCodeOffset` (0 for 'a', 1 for 'b', etc.). b. Calculate the valid range of alphabet indices for a preceding character: `[charCodeOffset - maxDiff, charCodeOffset + maxDiff]`. c. Find `currentIdealLength`: Iterate `searchIterator` through this valid range (clamped between 0 and 25). `currentIdealLength` becomes the maximum value found in `dpLengths[searchIterator]` within this range. d. Update `dpLengths[charCodeOffset]` to `currentIdealLength + 1` (adding 1 for `charOfS` itself). e. Update `maximumOverallLength` with the maximum of its current value and `dpLengths[charCodeOffset]`. 5. After processing all characters in `stringInput`, return `maximumOverallLength`.
 * Dry Run: s = "acf", k = 2
 * dpLengths = [0, ..., 0] (26 zeros)
 * maximumOverallLength = 0
 *
 * 1. Process stringIndex = 0, charOfS = 'a':
 *    charCodeOffset = 0 ('a')
 *    leftBoundary = 0 - 2 = -2, rightBoundary = 0 + 2 = 2
 *    Clamped search range: [max(0, -2), min(25, 2)] = [0, 2]
 *    currentIdealLength = 0
 *    searchIterator from 0 to 2:
 *      searchIterator = 0: currentIdealLength = max(0, dpLengths[0]) = 0
 *      searchIterator = 1: currentIdealLength = max(0, dpLengths[1]) = 0
 *      searchIterator = 2: currentIdealLength = max(0, dpLengths[2]) = 0
 *    dpLengths[0] = 0 + 1 = 1
 *    dpLengths = [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
 *    maximumOverallLength = max(0, 1) = 1
 *
 * 2. Process stringIndex = 1, charOfS = 'c':
 *    charCodeOffset = 2 ('c')
 *    leftBoundary = 2 - 2 = 0, rightBoundary = 2 + 2 = 4
 *    Clamped search range: [max(0, 0), min(25, 4)] = [0, 4]
 *    currentIdealLength = 0
 *    searchIterator from 0 to 4:
 *      searchIterator = 0: currentIdealLength = max(0, dpLengths[0]) = max(0, 1) = 1
 *      searchIterator = 1: currentIdealLength = max(1, dpLengths[1]) = max(1, 0) = 1
 *      searchIterator = 2: currentIdealLength = max(1, dpLengths[2]) = max(1, 0) = 1
 *      searchIterator = 3: currentIdealLength = max(1, dpLengths[3]) = max(1, 0) = 1
 *      searchIterator = 4: currentIdealLength = max(1, dpLengths[4]) = max(1, 0) = 1
 *    dpLengths[2] = 1 + 1 = 2
 *    dpLengths = [1,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
 *    maximumOverallLength = max(1, 2) = 2
 *
 * 3. Process stringIndex = 2, charOfS = 'f':
 *    charCodeOffset = 5 ('f')
 *    leftBoundary = 5 - 2 = 3, rightBoundary = 5 + 2 = 7
 *    Clamped search range: [max(0, 3), min(25, 7)] = [3, 7]
 *    currentIdealLength = 0
 *    searchIterator from 3 to 7:
 *      searchIterator = 3: currentIdealLength = max(0, dpLengths[3]) = max(0, 0) = 0
 *      searchIterator = 4: currentIdealLength = max(0, dpLengths[4]) = max(0, 0) = 0
 *      searchIterator = 5: currentIdealLength = max(0, dpLengths[5]) = max(0, 0) = 0
 *      searchIterator = 6: currentIdealLength = max(0, dpLengths[6]) = max(0, 0) = 0
 *      searchIterator = 7: currentIdealLength = max(0, dpLengths[7]) = max(0, 0) = 0
 *    dpLengths[5] = 0 + 1 = 1
 *    dpLengths = [1,0,2,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
 *    maximumOverallLength = max(2, 1) = 2
 *
 * Final result: 2
 * Time Complexity: O(N * k)
 * Space Complexity: O(1)
 */
var longestIdealString = function (stringInput, maxDiff) {
  const dpLengths = new Array(26).fill(0);
  let maximumOverallLength = 0;

  for (let stringIndex = 0; stringIndex < stringInput.length; stringIndex++) {
    const charOfS = stringInput[stringIndex];
    const charCodeOffset = charOfS.charCodeAt(0) - "a".charCodeAt(0);

    let currentIdealLength = 0;

    const leftBoundary = charCodeOffset - maxDiff;
    const rightBoundary = charCodeOffset + maxDiff;

    let searchIterator = Math.max(0, leftBoundary);
    while (searchIterator <= Math.min(25, rightBoundary)) {
      currentIdealLength = Math.max(
        currentIdealLength,
        dpLengths[searchIterator],
      );
      searchIterator++;
    }

    dpLengths[charCodeOffset] = currentIdealLength + 1;
    maximumOverallLength = Math.max(
      maximumOverallLength,
      dpLengths[charCodeOffset],
    );
  }

  return maximumOverallLength;
};
