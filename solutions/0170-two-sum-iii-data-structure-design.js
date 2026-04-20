/**
 * Two Sum III Data Structure Design
 * Time Complexity: O(U)
 * Space Complexity: O(U)
 */
var TwoSum = function () {
  this.integerFrequencies = new Map();
};

TwoSum.prototype.add = function (inputNumber) {
  this.integerFrequencies.set(
    inputNumber,
    (this.integerFrequencies.get(inputNumber) || 0) + 1,
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
