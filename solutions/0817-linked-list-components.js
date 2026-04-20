/**
 * Linked List Components
 * Time Complexity: O(N + L)
 * Space Complexity: O(N)
 */
var numComponents = function (head, nums) {
  const targetValuesSet = new Set(nums);
  let totalComponentsFound = 0;
  let currentlyInComponent = false;

  let currentNodePtr = head;
  while (currentNodePtr) {
    if (targetValuesSet.has(currentNodePtr.val)) {
      if (!currentlyInComponent) {
        totalComponentsFound++;
        currentlyInComponent = true;
      }
    } else {
      currentlyInComponent = false;
    }
    currentNodePtr = currentNodePtr.next;
  }

  return totalComponentsFound;
};
