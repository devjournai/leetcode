/**
 * Shuffle An Array
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
