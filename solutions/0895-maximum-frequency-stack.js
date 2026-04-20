/**
 * Maximum Frequency Stack
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
var FreqStack = function () {
  this.elementCounts = new Map();
  this.frequencyStacks = new Map();
  this.currentMaxCount = 0;
};

FreqStack.prototype.push = function (val) {
  let previousCountForVal = this.elementCounts.get(val) || 0;
  let updatedCountForVal = previousCountForVal + 1;
  this.elementCounts.set(val, updatedCountForVal);

  this.currentMaxCount = Math.max(this.currentMaxCount, updatedCountForVal);

  let targetStack = this.frequencyStacks.get(updatedCountForVal);
  if (targetStack === undefined) {
    targetStack = [];
    this.frequencyStacks.set(updatedCountForVal, targetStack);
  }
  targetStack.push(val);
};

FreqStack.prototype.pop = function () {
  const currentMaxFreqGroup = this.frequencyStacks.get(this.currentMaxCount);
  const resultVal = currentMaxFreqGroup.pop();

  this.elementCounts.set(resultVal, this.currentMaxCount - 1);

  const remainingElementsInGroup = currentMaxFreqGroup.length;
  remainingElementsInGroup === 0 &&
    (this.frequencyStacks.delete(this.currentMaxCount), this.currentMaxCount--);

  return resultVal;
};
