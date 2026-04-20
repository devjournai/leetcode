/**
 * Random Pick Index
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var Solution = function (nums) {
  this.collectedIndices = new Map();

  for (let indexIterator = 0; indexIterator < nums.length; indexIterator++) {
    let currentValue = nums[indexIterator];
    if (!this.collectedIndices.has(currentValue)) {
      this.collectedIndices.set(currentValue, []);
    }
    this.collectedIndices.get(currentValue).push(indexIterator);
  }
};

Solution.prototype.pick = function (target) {
  let candidateIndices = this.collectedIndices.get(target);
  let numberOfCandidates = candidateIndices.length;
  let randomSlot = Math.floor(Math.random() * numberOfCandidates);
  let chosenIndex = candidateIndices[randomSlot];
  return chosenIndex;
};
