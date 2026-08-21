/**
 * Nested List Weight Sum II
 * Intuition: Inverse depth means a number’s weight is `maxDepth - depth + 1`, so first BFS/queue-walk the nest to discover every integer and the deepest level, then weight by that formula.
 * Approach: 1. Enqueue every top-level NestedInteger at level 1. 2. While scanning the queue, track `deepestLevel`; integers go into `numbersByLevel[depth-1]`, lists enqueue children at depth+1. 3. For each stored number at depth d, add `value * (deepestLevel - d + 1)`.
 * Dry Run: [[1,1],2,[1,1]] → four 1s at depth 2 and 2 at depth 1, deepest = 2 → 1+1+2*2+1+1 = 8.
 * Time Complexity: O(N + L)
 * Space Complexity: O(N + L)
 */
var depthSumInverse = function (nestedList) {
  let collectQueue = [];
  let deepestLevel = 0;
  let numbersByLevel = [];

  for (let initialItem of nestedList) {
    collectQueue.push({ element: initialItem, level: 1 });
  }

  let readPointer = 0;
  while (readPointer < collectQueue.length) {
    let currentEntry = collectQueue[readPointer];
    let currentNest = currentEntry.element;
    let currentDepth = currentEntry.level;
    readPointer++;

    deepestLevel = Math.max(deepestLevel, currentDepth);

    if (currentNest.isInteger()) {
      if (!numbersByLevel[currentDepth - 1]) {
        numbersByLevel[currentDepth - 1] = [];
      }
      numbersByLevel[currentDepth - 1].push(currentNest.getInteger());
    } else {
      let innerList = currentNest.getList();
      for (let innerItem of innerList) {
        collectQueue.push({ element: innerItem, level: currentDepth + 1 });
      }
    }
  }

  let finalSumAccumulator = 0;
  let levelIterator = 0;
  while (levelIterator < deepestLevel) {
    let numbersAtSpecificLevel = numbersByLevel[levelIterator];
    let actualCurrentDepth = levelIterator + 1;

    if (numbersAtSpecificLevel) {
      for (let numberValue of numbersAtSpecificLevel) {
        let currentWeight = deepestLevel - actualCurrentDepth + 1;
        finalSumAccumulator += numberValue * currentWeight;
      }
    }
    levelIterator++;
  }

  return finalSumAccumulator;
};
