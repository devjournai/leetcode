/**
 * Number Of Visible People In A Queue
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var canSeePersonsCount = function (personHeights) {
  const totalPersons = personHeights.length;
  const visibleCounts = new Array(totalPersons).fill(0);
  const monotonicStack = [];

  for (
    let currentPersonIndex = totalPersons - 1;
    currentPersonIndex >= 0;
    currentPersonIndex--
  ) {
    while (
      monotonicStack.length > 0 &&
      personHeights[currentPersonIndex] >
        monotonicStack[monotonicStack.length - 1]
    ) {
      monotonicStack.pop();
      visibleCounts[currentPersonIndex]++;
    }
    if (monotonicStack.length > 0) {
      visibleCounts[currentPersonIndex]++;
    }
    monotonicStack.push(personHeights[currentPersonIndex]);
  }

  return visibleCounts;
};
