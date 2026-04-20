/**
 * All Elements In Two Binary Search Trees
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
