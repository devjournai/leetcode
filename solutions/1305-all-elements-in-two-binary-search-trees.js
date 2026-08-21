/**
 * All Elements In Two Binary Search Trees
 * Intuition: Inorder on a BST is sorted. Two sorted lists merge in linear time into one sorted array.
 * Approach: 1. Inorder-collect both trees. 2. Two-pointer merge, taking the smaller head. 3. Append leftovers. 4. Return the merged list.
 * Dry Run: root1 = [2,1,4], root2 = [1,0,3] → [1,2,4] and [0,1,3] merge to [0,1,1,2,3,4].
 * Time Complexity: O(N1 + N2)
 * Space Complexity: O(N1 + N2)
 */
var getAllElements = function (root1, root2) {
  const listOne = [];
  const listTwo = [];

  function performInorderTraversal(nodeCurrent, collectionList) {
    if (!nodeCurrent) {
      return;
    }
    performInorderTraversal(nodeCurrent.left, collectionList);
    collectionList.push(nodeCurrent.val);
    performInorderTraversal(nodeCurrent.right, collectionList);
  }

  performInorderTraversal(root1, listOne);
  performInorderTraversal(root2, listTwo);

  const mergedElements = [];
  let pointerA = 0;
  let pointerB = 0;

  while (pointerA < listOne.length && pointerB < listTwo.length) {
    if (listOne[pointerA] <= listTwo[pointerB]) {
      mergedElements.push(listOne[pointerA]);
      pointerA++;
    } else {
      mergedElements.push(listTwo[pointerB]);
      pointerB++;
    }
  }

  while (pointerA < listOne.length) {
    mergedElements.push(listOne[pointerA]);
    pointerA++;
  }

  while (pointerB < listTwo.length) {
    mergedElements.push(listTwo[pointerB]);
    pointerB++;
  }

  return mergedElements;
};
