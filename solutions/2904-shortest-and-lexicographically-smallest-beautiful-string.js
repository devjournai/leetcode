/**
 * Shortest And Lexicographically Smallest Beautiful String
 * Intuition: Utilize a sliding window to find all substrings with exactly 'k' ones. Maintain track of the shortest length found and the lexicographically smallest string for that shortest length. The inner loop ensures that for each ending position, we find the shortest possible valid substring by shrinking the window from the left.
 * Approach: 1. Initialize `minimumLengthFound` to infinity and `finalResultString` to an empty string. 2. Use two pointers, `leftPointer` and `rightPointer`, to define the sliding window. Initialize `currentOneCounter` to 0. 3. Iterate `rightPointer` from the start to the end of the input string `s`. 4. If the character at `s[rightPointer]` is '1', increment `currentOneCounter`. 5. While `currentOneCounter` is exactly `k`: a. Calculate the `currentWindowLen`. b. Extract the `currentSubstringValue`. c. Compare `currentWindowLen` with `minimumLengthFound`. If it's shorter, update `minimumLengthFound` and `finalResultString`. d. If `currentWindowLen` is equal to `minimumLengthFound`, compare `currentSubstringValue` lexicographically with `finalResultString` and update if `currentSubstringValue` is smaller. e. To shrink the window, check `s[leftPointer]`. If it's '1', decrement `currentOneCounter`. f. Increment `leftPointer`. 6. After the `rightPointer` loop finishes, return `finalResultString`.
 * Dry Run: s = "101101", k = 2
 *   minimumLengthFound = Infinity, finalResultString = "", leftPointer = 0, currentOneCounter = 0
 *   rightPointer = 0 (s[0]='1'): currentOneCounter = 1
 *   rightPointer = 1 (s[1]='0'): currentOneCounter = 1
 *   rightPointer = 2 (s[2]='1'): currentOneCounter = 2
 *     While currentOneCounter == k (true):
 *       currentWindowLen = 2 - 0 + 1 = 3
 *       currentSubstringValue = s.substring(0, 3) = "101"
 *       currentWindowLen (3) < minimumLengthFound (Infinity) -> true.
 *         minimumLengthFound = 3, finalResultString = "101"
 *       s[leftPointer] (s[0]='1') is '1' -> currentOneCounter = 1
 *       leftPointer = 1
 *     While condition (currentOneCounter == k) now false.
 *   rightPointer = 3 (s[3]='1'): currentOneCounter = 2
 *     While currentOneCounter == k (true):
 *       currentWindowLen = 3 - 1 + 1 = 3
 *       currentSubstringValue = s.substring(1, 4) = "011"
 *       currentWindowLen (3) < minimumLengthFound (3) -> false.
 *       currentWindowLen (3) === minimumLengthFound (3) -> true.
 *         currentSubstringValue ("011") < finalResultString ("101") -> true.
 *           finalResultString = "011"
 *       s[leftPointer] (s[1]='0') is '0' -> currentOneCounter remains 2
 *       leftPointer = 2
 *     While currentOneCounter == k (true) again:
 *       currentWindowLen = 3 - 2 + 1 = 2
 *       currentSubstringValue = s.substring(2, 4) = "11"
 *       currentWindowLen (2) < minimumLengthFound (3) -> true.
 *         minimumLengthFound = 2, finalResultString = "11"
 *       s[leftPointer] (s[2]='1') is '1' -> currentOneCounter = 1
 *       leftPointer = 3
 *     While condition (currentOneCounter == k) now false.
 *   rightPointer = 4 (s[4]='0'): currentOneCounter = 1
 *   rightPointer = 5 (s[5]='1'): currentOneCounter = 2
 *     While currentOneCounter == k (true):
 *       currentWindowLen = 5 - 3 + 1 = 3
 *       currentSubstringValue = s.substring(3, 6) = "101"
 *       currentWindowLen (3) < minimumLengthFound (2) -> false.
 *       currentWindowLen (3) === minimumLengthFound (2) -> false.
 *       s[leftPointer] (s[3]='1') is '1' -> currentOneCounter = 1
 *       leftPointer = 4
 *     While condition (currentOneCounter == k) now false.
 *   End of loop. Return "11".
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var shortestBeautifulSubstring = function (s, k) {
  let minimumLengthFound = Infinity;
  let finalResultString = "";
  let leftPointer = 0;
  let currentOneCounter = 0;

  for (let rightPointer = 0; rightPointer < s.length; rightPointer++) {
    if (s[rightPointer] === "1") {
      currentOneCounter++;
    }

    while (currentOneCounter === k) {
      const currentWindowLen = rightPointer - leftPointer + 1;
      const currentSubstringValue = s.substring(leftPointer, rightPointer + 1);

      if (currentWindowLen < minimumLengthFound) {
        minimumLengthFound = currentWindowLen;
        finalResultString = currentSubstringValue;
      } else if (currentWindowLen === minimumLengthFound) {
        if (currentSubstringValue < finalResultString) {
          finalResultString = currentSubstringValue;
        }
      }

      if (s[leftPointer] === "1") {
        currentOneCounter--;
      }
      leftPointer++;
    }
  }

  return finalResultString;
};
