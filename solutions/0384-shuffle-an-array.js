/**
 * Shuffle An Array
 * Intuition: Keep an immutable original copy for reset, and Fisher–Yates-shuffle a working copy so each permutation is equally likely.
 * Approach: 1. Constructor clones nums into `originalNumbers` and `shuffledNumbers`. 2. `reset` recopies original into shuffled. 3. `shuffle` swaps each index i from the end with a random index in [0, i].
 * Dry Run: [1,2,3]. shuffle may swap i=2 with 0..2 then i=1 with 0..1; reset restores [1,2,3].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var Solution = function (nums) {
  this.originalNumbers = [...nums];
  this.shuffledNumbers = [...nums];
};

Solution.prototype.reset = function () {
  this.shuffledNumbers = [...this.originalNumbers];
  return this.shuffledNumbers;
};

Solution.prototype.shuffle = function () {
  const arrayLength = this.shuffledNumbers.length;
  for (let iterateIndex = arrayLength - 1; iterateIndex > 0; iterateIndex--) {
    const randomIndex = Math.floor(Math.random() * (iterateIndex + 1));

    const temporaryValue = this.shuffledNumbers[iterateIndex];
    this.shuffledNumbers[iterateIndex] = this.shuffledNumbers[randomIndex];
    this.shuffledNumbers[randomIndex] = temporaryValue;
  }
  return this.shuffledNumbers;
};
