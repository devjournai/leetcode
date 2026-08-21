/**
 * Random Pick Index
 * Intuition: Pre-group every index of each value in `collectedIndices` so `pick` can sample uniformly from that list with `Math.random()`.
 * Approach: 1. Constructor: map each `nums[i]` to an array of indices. 2. `pick(target)`: read `candidateIndices`, choose `randomSlot` in `[0, length)`, return that index.
 * Dry Run: nums = [1,2,3,3,3], pick(3).
 *   - map: 1→[0], 2→[1], 3→[2,3,4].
 *   - randomSlot in {0,1,2} → index 2, 3, or 4 each with probability 1/3.
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
