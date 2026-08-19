/**
 * Generate Binary Strings Without Adjacent Zeros
 * Intuition: A valid string never has "00". After a 0 we must append 1; after a 1 (or at the start) we may append 0 or 1.
 * Approach: 1. DFS remaining length while building the current string. 2. If empty or last bit is 1, try appending 0. 3. Always try appending 1. Collect strings when remaining length is 0.
 * Dry Run:
 *   n = 2
 *   "" -> "0" -> "01"; "" -> "1" -> "10" and "11". Answer ["01","10","11"].
 * Time Complexity: O(2^n)
 * Space Complexity: O(n * 2^n)
 */
var validStrings = function (n) {
  const validBinaryStrings = [];

  const depthFirstSearch = (remainingLength, currentBits) => {
    if (remainingLength === 0) {
      validBinaryStrings.push(currentBits.join(""));
      return;
    }
    if (
      currentBits.length === 0 ||
      currentBits[currentBits.length - 1] === "1"
    ) {
      currentBits.push("0");
      depthFirstSearch(remainingLength - 1, currentBits);
      currentBits.pop();
    }
    currentBits.push("1");
    depthFirstSearch(remainingLength - 1, currentBits);
    currentBits.pop();
  };

  depthFirstSearch(n, []);
  return validBinaryStrings;
};
