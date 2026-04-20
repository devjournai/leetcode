/**
 * Nested List Weight Sum II
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
