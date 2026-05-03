/**
 * Finding Pairs With A Certain Sum
 * Time Complexity: O(N1 + N2)
 * Space Complexity: O(N2)
 */
var FindSumPairs = function (nums1, nums2) {
  this.firstElements = nums1;
  this.secondElements = nums2;
  this.secondElementCounts = new Map();

  for (const elementTwo of nums2) {
    this.secondElementCounts.set(
      elementTwo,
      (this.secondElementCounts.get(elementTwo) || 0) + 1,
    );
  }
};

FindSumPairs.prototype.add = function (index, val) {
  const originalValue = this.secondElements[index];
  this.secondElementCounts.set(
    originalValue,
    this.secondElementCounts.get(originalValue) - 1,
  );

  this.secondElements[index] += val;
  const changedValue = this.secondElements[index];

  this.secondElementCounts.set(
    changedValue,
    (this.secondElementCounts.get(changedValue) || 0) + 1,
  );
};

FindSumPairs.prototype.count = function (tot) {
  let countResult = 0;

  for (const itemOne of this.firstElements) {
    const desiredValue = tot - itemOne;
    countResult += this.secondElementCounts.get(desiredValue) || 0;
  }

  return countResult;
};
