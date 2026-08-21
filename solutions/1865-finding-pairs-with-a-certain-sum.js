/**
 * Finding Pairs With A Certain Sum
 * Intuition: Frequency-map nums2 so count(tot) is a scan of nums1 looking up tot−nums1[i]. add updates the map for one nums2 index.
 * Approach: 1. Constructor stores arrays and `secondElementCounts`. 2. `add`: decrement old value, mutate nums2[index], increment new value. 3. `count`: sum map[tot − itemOne].
 * Dry Run: nums1=[1,1,2], nums2=[1,2,3]. count(4) → 1+3,1+3,2+2 → 3. add(1,1) nums2[1]=3. count(7) → 0.
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
      (this.secondElementCounts.get(elementTwo) || 0) + 1
    );
  }
};

FindSumPairs.prototype.add = function (index, val) {
  const originalValue = this.secondElements[index];
  this.secondElementCounts.set(
    originalValue,
    this.secondElementCounts.get(originalValue) - 1
  );

  this.secondElements[index] += val;
  const changedValue = this.secondElements[index];

  this.secondElementCounts.set(
    changedValue,
    (this.secondElementCounts.get(changedValue) || 0) + 1
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
