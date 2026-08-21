/**
 * Maximum Number of Operations to Move Ones to the End
 * Intuition: Each operation moves a "10" to "01", so every 1 can jump right over later 0-groups. To maximize operations, every 1 should cross every 0-group to its right, which is counted when a 0-run ends.
 * Approach: 1. Scan s left to right, counting 1s seen so far. 2. When a 0 is the last character of a 0-run (next is 1 or end of string), add the current ones count to the answer.
 * Dry Run: s = "1001101". ones after first 1 is 1; first 0-run "00" ends before the next 1, add 1. Then ones=3, 0-run "0" ends, add 3. Then ones=4. Total 4.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxOperations = function (s) {
  let operationCount = 0;
  let onesCount = 0;

  for (let index = 0; index < s.length; index++) {
    if (s[index] === "1") {
      onesCount++;
    } else if (index + 1 === s.length || s[index + 1] === "1") {
      operationCount += onesCount;
    }
  }

  return operationCount;
};
