/**
 * Linked List Frequency
 * Intuition: Count element occurrences first, then construct a new linked list from these counts. A hash map is ideal for frequency counting due to its efficient key-value storage and retrieval.
 * Approach: 1. Initialize a map to store frequencies of elements from the input linked list. 2. Traverse the input linked list, updating element counts in the map. 3. Extract the frequency values into an array. 4. Handle the edge case where no frequencies are found (empty input list). 5. Construct the head of the new linked list using the first frequency. 6. Iterate over the remaining frequencies using a different control flow to append new nodes to the result linked list. 7. Return the head of the newly constructed linked list.
 * Dry Run: Input: head = [1,1,2,3,2,1]
 *   1. `frequencyTracker = new Map()`
 *   2. Traverse input list:
 *      - `currentLink` points to 1: `frequencyTracker.set(1, 1)`
 *      - `currentLink` points to 1: `frequencyTracker.set(1, 2)`
 *      - `currentLink` points to 2: `frequencyTracker.set(2, 1)`
 *      - `currentLink` points to 3: `frequencyTracker.set(3, 1)`
 *      - `currentLink` points to 2: `frequencyTracker.set(2, 2)`
 *      - `currentLink` points to 1: `frequencyTracker.set(1, 3)`
 *      - `currentLink` is null. Loop ends. `frequencyTracker` is `{1: 3, 2: 2, 3: 1}`.
 *   3. `frequencyValues = Array.from(frequencyTracker.values())` results in `[3, 2, 1]`.
 *   4. `frequencyValues.length` is not 0.
 *   5. `newHeadNode = new ListNode(frequencyValues[0])` -> `newHeadNode` is `ListNode(3)`.
 *      `newListIterator = newHeadNode`.
 *   6. `remainingFrequencies = frequencyValues.slice(1)` -> `remainingFrequencies` is `[2, 1]`.
 *   7. `remainingFrequencies.forEach`:
 *      - `currentFrequency = 2`: `newListIterator.next = new ListNode(2)`, `newListIterator` points to `ListNode(2)`. List: `3 -> 2`.
 *      - `currentFrequency = 1`: `newListIterator.next = new ListNode(1)`, `newListIterator` points to `ListNode(1)`. List: `3 -> 2 -> 1`.
 *   8. Return `newHeadNode` which is `ListNode(3)`. The resulting linked list is `[3, 2, 1]`.
 * Time Complexity: O(N)
 * Space Complexity: O(K)
 */
var frequenciesOfElements = function (head) {
  const frequencyTracker = new Map();
  let currentLink = head;

  while (currentLink) {
    frequencyTracker.set(
      currentLink.val,
      (frequencyTracker.get(currentLink.val) || 0) + 1,
    );
    currentLink = currentLink.next;
  }

  const frequencyValues = Array.from(frequencyTracker.values());

  if (frequencyValues.length === 0) return null;

  const newHeadNode = new ListNode(frequencyValues[0]);
  let newListIterator = newHeadNode;

  const remainingFrequencies = frequencyValues.slice(1);
  remainingFrequencies.forEach((currentFrequency) => {
    newListIterator.next = new ListNode(currentFrequency);
    newListIterator = newListIterator.next;
  });

  return newHeadNode;
};
