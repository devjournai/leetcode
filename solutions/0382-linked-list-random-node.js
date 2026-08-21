/**
 * Linked List Random Node
 * Intuition: Reservoir sampling: walk the list once, and at node i (1-based) replace the chosen value with probability 1/i so every node is equally likely without knowing the length up front.
 * Approach: 1. Store the head. 2. `getRandom` starts with the head’s value and index 1. 3. For each next node, increment the index and replace `chosenValue` if `Math.random() < 1/index`.
 * Dry Run: 1→2→3. After node 1 choose 1; node 2 replace with p=1/2; node 3 replace with p=1/3 — each value ends with probability 1/3.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var Solution = function (head) {
  this.storedHead = head;
};

Solution.prototype.getRandom = function () {
  let currentPointer = this.storedHead;
  let chosenValue = currentPointer.val;
  let nodeIndex = 1;

  while (currentPointer.next) {
    currentPointer = currentPointer.next;
    nodeIndex++;
    let randomChance = Math.random();
    if (randomChance < 1 / nodeIndex) {
      chosenValue = currentPointer.val;
    }
  }

  return chosenValue;
};
