/**
 * Linked List Random Node
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
