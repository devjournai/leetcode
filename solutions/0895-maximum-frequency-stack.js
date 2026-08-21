/**
 * Maximum Frequency Stack
 * Intuition: Track each value's count and a stack per frequency. Push onto the stack of the new frequency; pop from the max-frequency stack so the most recent among the most frequent wins.
 * Approach: 1. Constructor: `elementCounts`, `frequencyStacks`, `currentMaxCount=0`. 2. `push`: increment count, update max, append val to that frequency's stack. 3. `pop`: pop from max-frequency stack, decrement the value's count; if that stack empties, delete it and decrement `currentMaxCount`. 4. Return the popped value.
 * Dry Run: push 5,7,5,7,4,5 then pop thrice.
 *   - After pushes, freq 3 stack is [5]. Pop 5 (freq 3 empty). Freq 2 stack [7,5] → pop 7 then 5.
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
