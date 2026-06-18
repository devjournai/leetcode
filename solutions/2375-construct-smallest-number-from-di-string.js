/**
 * Construct Smallest Number From Di String
 * Intuition: To construct the lexicographically smallest number, we process the digits 1 through (N+1) in increasing order. When a 'D' (decreasing) instruction is encountered, it means the current digit is part of a sequence that must decrease. To satisfy this and keep the overall number smallest, we temporarily store these digits in a stack. When an 'I' (increasing) instruction is encountered or the end of the pattern is reached, it signals the end of a decreasing sequence. At this point, all digits accumulated in the stack are popped and appended to the result. Popping them in reverse order (LIFO) naturally forms the required decreasing sequence using the smallest available block of consecutive numbers, thus yielding the lexicographically smallest result.
 * Approach: 1. Initialize an empty string `constructedResult` and an empty array `digitStorage` (acting as a stack). 2. Iterate `currentPosition` from `0` up to `pattern.length - 1`. 3. For each `currentPosition`, push `currentPosition + 1` onto `digitStorage`. 4. If `pattern.charAt(currentPosition)` is 'I', then pop all digits from `digitStorage` and append them to `constructedResult`. 5. After the loop, push `pattern.length + 1` (the last digit) onto `digitStorage`. 6. Finally, pop any remaining digits from `digitStorage` and append them to `constructedResult`. This handles any trailing 'D's or the very last digit. 7. Return `constructedResult`.
 * Dry Run: pattern = "DDI"
 *   patternLength = 3
 *   constructedResult = ""
 *   digitStorage = []
 *
 *   Loop (currentPosition from 0 to 2):
 *   - currentPosition = 0:
 *     Push 1 to digitStorage. digitStorage = [1].
 *     pattern.charAt(0) is 'D'. Not 'I'.
 *
 *   - currentPosition = 1:
 *     Push 2 to digitStorage. digitStorage = [1, 2].
 *     pattern.charAt(1) is 'D'. Not 'I'.
 *
 *   - currentPosition = 2:
 *     Push 3 to digitStorage. digitStorage = [1, 2, 3].
 *     pattern.charAt(2) is 'I'. True.
 *     Pop from digitStorage and append:
 *       Pop 3. constructedResult = "3".
 *       Pop 2. constructedResult = "32".
 *       Pop 1. constructedResult = "321".
 *     digitStorage = [].
 *
 *   Loop ends.
 *
 *   Push patternLength + 1 (4) to digitStorage. digitStorage = [4].
 *
 *   Pop remaining from digitStorage:
 *     Pop 4. constructedResult = "3214".
 *   digitStorage = [].
 *
 *   Return "3214".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var smallestNumber = function (pattern) {
  let constructedResult = "";
  let digitStorage = [];
  let limitLength = pattern.length;

  for (
    let currentPosition = 0;
    currentPosition < limitLength;
    currentPosition++
  ) {
    digitStorage.push(currentPosition + 1);
    if (pattern.charAt(currentPosition) === "I") {
      while (digitStorage.length > 0) {
        constructedResult += digitStorage.pop();
      }
    }
  }

  digitStorage.push(limitLength + 1);
  while (digitStorage.length > 0) {
    constructedResult += digitStorage.pop();
  }

  return constructedResult;
};
