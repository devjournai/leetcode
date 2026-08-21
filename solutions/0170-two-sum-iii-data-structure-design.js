/**
 * Two Sum III Data Structure Design
 * Intuition: Count how often each number is added so find can scan unique values and look up the complement in the frequency map. The same number can pair with itself only when it was added at least twice.
 * Approach: 1. Store counts in a Map. 2. add increments the count for that number. 3. find walks each unique value x and needs target - x. 4. If the partner equals x, require count > 1; otherwise check that the partner exists. 5. Return true on the first valid pair, else false.
 * Dry Run: add(1), add(3), add(5), find(4).
 *   - Map: {1:1, 3:1, 5:1}. x=1 needs 3, map has 3 → true.
 *   - find(7): x=1 needs 6 (missing); x=3 needs 4 (missing); x=5 needs 2 (missing) → false.
 * Time Complexity: O(U)
 * Space Complexity: O(U)
 */
var TwoSum = function () {
  this.integerFrequencies = new Map();
};

TwoSum.prototype.add = function (inputNumber) {
  this.integerFrequencies.set(
    inputNumber,
    (this.integerFrequencies.get(inputNumber) || 0) + 1
  );
};

TwoSum.prototype.find = function (targetSum) {
  for (const [
    currentElement,
    currentCount,
  ] of this.integerFrequencies.entries()) {
    const desiredPartner = targetSum - currentElement;

    if (desiredPartner === currentElement) {
      if (currentCount > 1) {
        return true;
      }
    } else {
      if (this.integerFrequencies.has(desiredPartner)) {
        return true;
      }
    }
  }
  return false;
};
