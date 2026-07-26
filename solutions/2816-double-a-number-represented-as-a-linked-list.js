/**
 * Double A Number Represented As A Linked List
 * Intuition: To double a number represented as a linked list, we need to process digits from right to left, handling carries. While a linked list is naturally traversed left to right, recursion allows processing to happen on the way back up the call stack, effectively simulating right-to-left processing without explicit list reversal.
 * Approach: 1. Define a recursive helper function, `calculateDoubledValue`, that takes a `ListNode` as input and returns any carry generated from its subtree. 2. Inside `calculateDoubledValue`: a. Base Case: If the `currentListNode` is `null`, return 0. b. Recursive Step: Recursively call `calculateDoubledValue` for `currentListNode.next` to get the `carryFromNextRecursion`. c. Calculate `doubledValueTotal = currentListNode.val * 2 + carryFromNextRecursion`. d. Update `currentListNode.val` to `doubledValueTotal % 10`. e. Return `Math.floor(doubledValueTotal / 10)` as the `carryForParent`. 3. In the main `doubleIt` function, call `calculateDoubledValue` with the `head` of the list. Store the returned value as `finalCarry`. 4. If `finalCarry` is greater than 0, create a `new ListNode` with `finalCarry` and set its `next` pointer to the original `head`. Return this new node. 5. Otherwise, return the original `head`.
 * Dry Run: Input: head = [1, 8, 9]
 * `doubleIt([1, 8, 9])` calls `calculateDoubledValue(node_1)`
 *   `calculateDoubledValue(node_1)`:
 *     calls `calculateDoubledValue(node_8)`
 *       `calculateDoubledValue(node_8)`:
 *         calls `calculateDoubledValue(node_9)`
 *           `calculateDoubledValue(node_9)`:
 *             calls `calculateDoubledValue(null)` -> returns `0`. `carryFromNextRecursion = 0`.
 *           `doubledValueTotal = 9 * 2 + 0 = 18`.
 *           `node_9.val` becomes `18 % 10 = 8`. List is now `[1, 8, 8]`.
 *           Returns `Math.floor(18 / 10) = 1`. `carryFromNextRecursion = 1`.
 *         `doubledValueTotal = 8 * 2 + 1 = 17`.
 *         `node_8.val` becomes `17 % 10 = 7`. List is now `[1, 7, 8]`.
 *         Returns `Math.floor(17 / 10) = 1`. `carryFromNextRecursion = 1`.
 *       `doubledValueTotal = 1 * 2 + 1 = 3`.
 *       `node_1.val` becomes `3 % 10 = 3`. List is now `[3, 7, 8]`.
 *       Returns `Math.floor(3 / 10) = 0`. `finalCarry = 0`.
 * `finalCarry` is `0`.
 * Return `head` (which is now `[3, 7, 8]`).
 * Output: `[3, 7, 8]`
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var doubleIt = function (head) {
  function calculateDoubledValue(currentListNode) {
    if (currentListNode === null) {
      return 0;
    }

    let carryFromNextRecursion = calculateDoubledValue(currentListNode.next);

    let doubledValueTotal = currentListNode.val * 2 + carryFromNextRecursion;
    currentListNode.val = doubledValueTotal % 10;
    let carryForParent = Math.floor(doubledValueTotal / 10);

    return carryForParent;
  }

  let finalCarry = calculateDoubledValue(head);

  if (finalCarry > 0) {
    let newHead = new ListNode(finalCarry);
    newHead.next = head;
    return newHead;
  } else {
    return head;
  }
};
