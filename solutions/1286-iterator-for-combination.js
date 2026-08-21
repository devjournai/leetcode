/**
 * Iterator For Combination
 * Intuition: Combinations of a sorted string correspond to increasing index tuples. next emits the current tuple then increments it like a mixed-radix counter.
 * Approach: 1. Constructor stores characters, length, and indices 0..L-1, hasMore=true. 2. next builds the string from current indices, then from the right finds a slot that can increment, resets the tail to consecutive indices, and clears hasMore if none. 3. hasNext returns the flag.
 * Dry Run: characters="abc", combinationLength=2
 *   start indices [0,1] -> "ab"; increment to [0,2] "ac"; then [1,2] "bc"; then no more, hasNext false.
 * Time Complexity: O(N*L).
 * Space Complexity: O(L)
 */
var CombinationIterator = function (characters, combinationLength) {
  this.sourceCharacters = characters;
  this.combinationLengthValue = combinationLength;
  this.currentCombinationIndices = new Array(this.combinationLengthValue);

  for (
    let initialIndex = 0;
    initialIndex < this.combinationLengthValue;
    initialIndex++
  ) {
    this.currentCombinationIndices[initialIndex] = initialIndex;
  }

  this.hasMoreCombinationsFlag = true;
};

CombinationIterator.prototype.next = function () {
  const combinationCharsBuffer = [];
  for (
    let characterBuilderIndex = 0;
    characterBuilderIndex < this.combinationLengthValue;
    characterBuilderIndex++
  ) {
    const charIndexInSource =
      this.currentCombinationIndices[characterBuilderIndex];
    const characterPicked = this.sourceCharacters[charIndexInSource];
    combinationCharsBuffer.push(characterPicked);
  }
  const currentCombinationResult = combinationCharsBuffer.join("");

  this.hasMoreCombinationsFlag = false;

  for (
    let rightToLeftIterator = this.combinationLengthValue - 1;
    rightToLeftIterator >= 0;
    rightToLeftIterator--
  ) {
    const maxPossibleIndexForSlot =
      this.sourceCharacters.length -
      (this.combinationLengthValue - rightToLeftIterator);
    const currentValueInSlot =
      this.currentCombinationIndices[rightToLeftIterator];

    if (currentValueInSlot < maxPossibleIndexForSlot) {
      this.currentCombinationIndices[rightToLeftIterator]++;
      for (
        let leftToRightFiller = rightToLeftIterator + 1;
        leftToRightFiller < this.combinationLengthValue;
        leftToRightFiller++
      ) {
        this.currentCombinationIndices[leftToRightFiller] =
          this.currentCombinationIndices[leftToRightFiller - 1] + 1;
      }
      this.hasMoreCombinationsFlag = true;
      break;
    }
  }

  return currentCombinationResult;
};

CombinationIterator.prototype.hasNext = function () {
  return this.hasMoreCombinationsFlag;
};
