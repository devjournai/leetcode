/**
 * Intersection Of Two Arrays
 * Intuition: Unique values from each array go into sets. Iterate the smaller set and keep values present in the other; that is the distinct intersection.
 * Approach: 1. Build a Set from numsArrayOne and a Set from numsArrayTwo via reduce. 2. Choose iteratingSet as the smaller set. 3. Push values that checkingSet.has. 4. Return the collected array.
 * Dry Run: numsArrayOne = [1, 2, 2, 1], numsArrayTwo = [2, 2].
 *   - Sets {1, 2} and {2}. Iterate {2}; 2 is in both → [2].
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */
var intersection = function (numsArrayOne, numsArrayTwo) {
  const uniqueElementsFromFirst = new Set(numsArrayOne);
  const uniqueElementsFromSecond = numsArrayTwo.reduce(
    (accumulatedSetForSecond, currentNumberFromSecond) => {
      accumulatedSetForSecond.add(currentNumberFromSecond);
      return accumulatedSetForSecond;
    },
    new Set()
  );

  const intersectionResultContainer = [];

  let iteratingSet;
  let checkingSet;

  if (uniqueElementsFromFirst.size < uniqueElementsFromSecond.size) {
    iteratingSet = uniqueElementsFromFirst;
    checkingSet = uniqueElementsFromSecond;
  } else {
    iteratingSet = uniqueElementsFromSecond;
    checkingSet = uniqueElementsFromFirst;
  }

  for (const valueFromIteratingSet of iteratingSet) {
    if (checkingSet.has(valueFromIteratingSet)) {
      intersectionResultContainer.push(valueFromIteratingSet);
    }
  }

  return intersectionResultContainer;
};
