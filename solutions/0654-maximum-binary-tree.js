/**
 * Maximum Binary Tree
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var constructMaximumBinaryTree = function (nums) {
  function createTreeSegment(startPoint, endPoint) {
    if (startPoint > endPoint) {
      return null;
    }

    let greatestNumber = -Infinity;
    let greatestNumberIndex = -1;
    let scanPointer = startPoint;

    while (scanPointer <= endPoint) {
      if (nums[scanPointer] > greatestNumber) {
        greatestNumber = nums[scanPointer];
        greatestNumberIndex = scanPointer;
      }
      scanPointer++;
    }

    let newTreeRoot = new TreeNode(greatestNumber);
    newTreeRoot.left = createTreeSegment(startPoint, greatestNumberIndex - 1);
    newTreeRoot.right = createTreeSegment(greatestNumberIndex + 1, endPoint);

    return newTreeRoot;
  }

  return createTreeSegment(0, nums.length - 1);
};
