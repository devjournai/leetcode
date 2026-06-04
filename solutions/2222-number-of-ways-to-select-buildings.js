/**
 * Number Of Ways To Select Buildings
 * Intuition: We can count valid three-building sequences (010 or 101) by iteratively tracking counts of single buildings, two-building alternating sequences, and finally three-building alternating sequences in a single pass.
 * Approach: 1. Initialize counters for single '0's (countOfZeroes), single '1's (countOfOnes), two-building "01" patterns (zeroOnePairCount), two-building "10" patterns (oneZeroPairCount), and the final total valid three-building selections (totalSelectionCount). All start at zero. 2. Iterate through each character in the input string. 3. If the current character is '0': update totalSelectionCount by adding zeroOnePairCount (as this '0' completes "010" patterns), update oneZeroPairCount by adding countOfOnes (as this '0' forms new "10" patterns with previous '1's), and increment countOfZeroes. 4. If the current character is '1': update totalSelectionCount by adding oneZeroPairCount (as this '1' completes "101" patterns), update zeroOnePairCount by adding countOfZeroes (as this '1' forms new "01" patterns with previous '0's), and increment countOfOnes. 5. Return totalSelectionCount after iterating through the entire string.
 * Dry Run: s = "001101"
 * Initial: countOfZeroes = 0, countOfOnes = 0, zeroOnePairCount = 0, oneZeroPairCount = 0, totalSelectionCount = 0
 *
 * 1. char = '0' (s[0])
 *    totalSelectionCount += zeroOnePairCount (0) -> 0
 *    oneZeroPairCount += countOfOnes (0) -> 0
 *    countOfZeroes++ -> 1
 *    State: Z=1, O=0, Z1=0, O0=0, Total=0
 *
 * 2. char = '0' (s[1])
 *    totalSelectionCount += zeroOnePairCount (0) -> 0
 *    oneZeroPairCount += countOfOnes (0) -> 0
 *    countOfZeroes++ -> 2
 *    State: Z=2, O=0, Z1=0, O0=0, Total=0
 *
 * 3. char = '1' (s[2])
 *    totalSelectionCount += oneZeroPairCount (0) -> 0
 *    zeroOnePairCount += countOfZeroes (2) -> 2 (e.g., s[0]s[2], s[1]s[2])
 *    countOfOnes++ -> 1
 *    State: Z=2, O=1, Z1=2, O0=0, Total=0
 *
 * 4. char = '1' (s[3])
 *    totalSelectionCount += oneZeroPairCount (0) -> 0
 *    zeroOnePairCount += countOfZeroes (2) -> 4 (e.g., s[0]s[2], s[1]s[2], s[0]s[3], s[1]s[3])
 *    countOfOnes++ -> 2
 *    State: Z=2, O=2, Z1=4, O0=0, Total=0
 *
 * 5. char = '0' (s[4])
 *    totalSelectionCount += zeroOnePairCount (4) -> 4 (These are the 4 "010" sequences: s[0]s[2]s[4], s[1]s[2]s[4], s[0]s[3]s[4], s[1]s[3]s[4])
 *    oneZeroPairCount += countOfOnes (2) -> 2 (e.g., s[2]s[4], s[3]s[4])
 *    countOfZeroes++ -> 3
 *    State: Z=3, O=2, Z1=4, O0=2, Total=4
 *
 * 6. char = '1' (s[5])
 *    totalSelectionCount += oneZeroPairCount (2) -> 4 + 2 = 6 (These are the 2 "101" sequences: s[2]s[4]s[5], s[3]s[4]s[5])
 *    zeroOnePairCount += countOfZeroes (3) -> 4 + 3 = 7 (e.g., s[0]s[5], s[1]s[5], s[4]s[5] are new "01" pairs. Total "01" is 7)
 *    countOfOnes++ -> 3
 *    State: Z=3, O=3, Z1=7, O0=2, Total=6
 *
 * Final `totalSelectionCount = 6`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var numberOfWays = function (s) {
  let singleZeroCount = 0;
  let singleOneCount = 0;
  let zeroOneSequenceCount = 0;
  let oneZeroSequenceCount = 0;
  let finalValidWays = 0;

  for (const buildingChar of s) {
    if (buildingChar === "0") {
      finalValidWays += zeroOneSequenceCount;
      oneZeroSequenceCount += singleOneCount;
      singleZeroCount++;
    } else {
      finalValidWays += oneZeroSequenceCount;
      zeroOneSequenceCount += singleZeroCount;
      singleOneCount++;
    }
  }

  return finalValidWays;
};
