/**
 * Maximum Binary Tree
 * Intuition: The root is the max in the current slice; left/right subtrees are built from the subarrays on either side of that index.
 * Approach: 1. `createTreeSegment(start,end)` returns null if start>end. 2. Scan for `greatestNumberIndex`. 3. New `TreeNode`, recurse left on [start, idx-1] and right on [idx+1, end]. 4. Call on [0, n-1].
 * Dry Run: nums=[3,2,1,6,0,5].
 *   - Max 6 at index 3. Left of 6: max 3 with right chain 2→1. Right of 6: max 5 with left 0. Return that tree.
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
