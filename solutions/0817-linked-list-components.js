/**
 * Linked List Components
 * Intuition: A component is a maximal consecutive run of nodes whose values sit in `nums`. Count rising edges into such a run.
 * Approach: 1. Put `nums` in a Set. 2. Walk the list; on a hit while not in a component, increment and set the flag; on a miss, clear the flag.
 * Dry Run: list 0-1-2-3, nums = [0,1,3]. Runs 0-1 and 3 → 2 components.
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
