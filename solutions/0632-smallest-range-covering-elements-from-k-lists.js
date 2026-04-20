/**
 * Smallest Range Covering Elements From K Lists
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var smallestRange = function (inputLists) {
  const numberOfLists = inputLists.length;
  const listFrequencyTracker = new Map();
  let listsIncludedInWindow = 0;
  let minimumRangeDifference = Infinity;
  let rangeStartingValue = -1;
  let rangeEndingValue = -1;

  const allSortedEntries = inputLists
    .flatMap((singleList, listIdentifier) =>
      singleList.map((itemValue) => ({
        value: itemValue,
        listId: listIdentifier,
      })),
    )
    .sort((entryA, entryB) => entryA.value - entryB.value);

  let currentWindowBeginning = 0;
  for (
    let currentWindowTraversal = 0;
    currentWindowTraversal < allSortedEntries.length;
    currentWindowTraversal++
  ) {
    const elementAtCurrentTraversal = allSortedEntries[currentWindowTraversal];
    const currentListIdentifier = elementAtCurrentTraversal.listId;
    const currentListEntryCount =
      listFrequencyTracker.get(currentListIdentifier) || 0;

    if (currentListEntryCount === 0) {
      listsIncludedInWindow += 1;
    }
    listFrequencyTracker.set(currentListIdentifier, currentListEntryCount + 1);

    while (listsIncludedInWindow === numberOfLists) {
      const elementAtWindowBeginning = allSortedEntries[currentWindowBeginning];
      const currentCalculatedRange =
        elementAtCurrentTraversal.value - elementAtWindowBeginning.value;

      if (
        currentCalculatedRange < minimumRangeDifference ||
        (currentCalculatedRange === minimumRangeDifference &&
          elementAtWindowBeginning.value < rangeStartingValue)
      ) {
        minimumRangeDifference = currentCalculatedRange;
        rangeStartingValue = elementAtWindowBeginning.value;
        rangeEndingValue = elementAtCurrentTraversal.value;
      }

      const listIdentifierAtBeginning = elementAtWindowBeginning.listId;
      const listEntryCountAtBeginning = listFrequencyTracker.get(
        listIdentifierAtBeginning,
      );
      listFrequencyTracker.set(
        listIdentifierAtBeginning,
        listEntryCountAtBeginning - 1,
      );

      if (listEntryCountAtBeginning - 1 === 0) {
        listsIncludedInWindow -= 1;
      }
      currentWindowBeginning += 1;
    }
  }

  return [rangeStartingValue, rangeEndingValue];
};
