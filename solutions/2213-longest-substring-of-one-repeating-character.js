/**
 * Longest Substring Of One Repeating Character
 * Intuition: Dynamic range queries for longest repeating substring suggest a segment tree where nodes store information allowing efficient merging of child results.
 * Approach:
 * 1. Initialize a mutable character array from the input string.
 * 2. Define a `SegmentTreeNode` class to store essential information for each segment:
 *    - `leftConsecutive`: Longest repeating character substring length starting from the segment's left end.
 *    - `rightConsecutive`: Longest repeating character substring length ending at the segment's right end.
 *    - `maxConsecutive`: Longest repeating character substring length within the entire segment.
 *    - `totalSegmentSize`: The actual length of the segment (end - start + 1).
 * 3. Build a segment tree recursively. For leaf nodes (single character segments), all lengths are 1. For internal nodes, recursively build children and then merge their results using `mergeNodeData`.
 * 4. Implement `mergeNodeData` function:
 *    - `totalSegmentSize` is sum of children's `totalSegmentSize`.
 *    - `leftConsecutive` is `leftChild.leftConsecutive` unless `leftChild` is entirely repeating and connects to `rightChild.leftConsecutive` (i.e., `char[mid] === char[mid+1]`).
 *    - `rightConsecutive` is `rightChild.rightConsecutive` unless `rightChild` is entirely repeating and connects to `leftChild.rightConsecutive` (i.e., `char[mid] === char[mid+1]`).
 *    - `maxConsecutive` is the maximum of `leftChild.maxConsecutive`, `rightChild.maxConsecutive`, and a potential cross-midpoint merge (`leftChild.rightConsecutive + rightChild.leftConsecutive` if `char[mid] === char[mid+1]`).
 * 5. Implement `updateSegmentTree` function for point updates:
 *    - Recursively traverse to the leaf node corresponding to the `targetIdx`.
 *    - After returning from recursive calls, call `mergeNodeData` on parent nodes to update their values based on the character change.
 * 6. For each query, update the character in the mutable array, then call `updateSegmentTree`, and store the `maxConsecutive` value from the root node (`treeArray[1].maxConsecutive`) into the result array.
 * Dry Run:
 * s = "aba", queryCharacters = "b", queryIndices = [1]
 * initialStringInput: "aba"
 * stringCharacters: ['a', 'b', 'a']
 * stringSize: 3
 * queryArrayCount: 1
 *
 * Build Tree (stringCharacters):
 * Node 1 (0,2): mid=1
 *   Node 2 (0,1): mid=0
 *     Node 4 (0,0): char='a' -> left=1, right=1, max=1, total=1
 *     Node 5 (1,1): char='b' -> left=1, right=1, max=1, total=1
 *     Merge Node 2 (0,1): char[0]='a', char[1]='b'. No merge across.
 *       leftConsecutive: Node4.leftConsecutive = 1
 *       rightConsecutive: Node5.rightConsecutive = 1
 *       maxConsecutive: max(Node4.max, Node5.max) = max(1,1) = 1
 *       totalSegmentSize: Node4.total + Node5.total = 1+1 = 2
 *   Node 3 (2,2): char='a' -> left=1, right=1, max=1, total=1
 *   Merge Node 1 (0,2): char[1]='b', char[2]='a'. No merge across.
 *     leftConsecutive: Node2.leftConsecutive = 1
 *     rightConsecutive: Node3.rightConsecutive = 1
 *     maxConsecutive: max(Node2.max, Node3.max) = max(1,1) = 1
 *     totalSegmentSize: Node2.total + Node3.total = 2+1 = 3
 * treeArray[1].maxConsecutive is 1.
 *
 * Query 0: currentModificationIndex = 1, newCharacterValue = 'b'
 * stringCharacters becomes ['a', 'b', 'a'] -> ['a', 'b', 'a'] (no effective change here, but the char is 'b' now, for dry run let's assume it was 'c' for example: "aca" -> "aba")
 * Let's assume s="aca", queryCharacters="b", queryIndices=[1]
 * Initial build is for "aca":
 *   Node 4 (0,0): 'a' -> {1,1,1,1}
 *   Node 5 (1,1): 'c' -> {1,1,1,1}
 *   Node 2 (0,1): 'a','c' -> {1,1,1,2}
 *   Node 3 (2,2): 'a' -> {1,1,1,1}
 *   Node 1 (0,2): 'a','c','a' -> {1,1,1,3}. maxConsecutive = 1.
 *
 * Query 0: currentModificationIndex = 1, newCharacterValue = 'b'
 * stringCharacters: ['a', 'c', 'a'] -> `stringCharacters[1]` = 'b' -> ['a', 'b', 'a']
 * Call updateSegmentTree(1, 0, 2, 1)
 *   updateRootIdx=1, updateRangeStart=0, updateRangeEnd=2, targetIdx=1, updateMidValue=1
 *   Recurse updateSegmentTree(2, 0, 1, 1)
 *     updateRootIdx=2, updateRangeStart=0, updateRangeEnd=1, targetIdx=1, updateMidValue=0
 *     Recurse updateSegmentTree(5, 1, 1, 1)
 *       updateRootIdx=5, updateRangeStart=1, updateRangeEnd=1, targetIdx=1. Base case: return.
 *     Call mergeNodeData(2, 0, 1)
 *       Node 4 ('a'): {1,1,1,1}
 *       Node 5 ('b'): {1,1,1,1}
 *       char[0]='a', char[1]='b'. No cross merge.
 *       Node 2: left=1, right=1, max=1, total=2. (Values remain same as 'a','c' merge)
 *   Call mergeNodeData(1, 0, 2)
 *     Node 2 ('a','b'): {1,1,1,2}
 *     Node 3 ('a'): {1,1,1,1}
 *     char[1]='b', char[2]='a'. No cross merge.
 *     Node 1: left=1, right=1, max=1, total=3. (Values remain same as 'a','c','a' merge)
 *
 * resultLengths.push(treeArray[1].maxConsecutive) -> resultLengths = [1]
 * Final result: [1]
 *
 * Time Complexity: O(N + K log N)
 * Space Complexity: O(N + K)
 */
var longestRepeating = function (s, queryCharacters, queryIndices) {
  const stringCharacters = s.split("");
  const stringSize = stringCharacters.length;
  const queryArrayChars = queryCharacters;
  const queryArrayIndices = queryIndices;
  const queryArrayCount = queryArrayIndices.length;
  const finalResults = [];

  class SegmentTreeNode {
    constructor() {
      this.leftConsecutive = 0;
      this.rightConsecutive = 0;
      this.maxConsecutive = 0;
      this.totalSegmentSize = 0;
    }
  }

  const treeArray = new Array(4 * stringSize);
  for (
    let loopInitCounter = 0;
    loopInitCounter < 4 * stringSize;
    loopInitCounter++
  ) {
    treeArray[loopInitCounter] = new SegmentTreeNode();
  }

  function buildSegmentTree(
    currentNodeIdx,
    segmentRangeStart,
    segmentRangeEnd,
  ) {
    if (segmentRangeStart === segmentRangeEnd) {
      treeArray[currentNodeIdx].leftConsecutive = 1;
      treeArray[currentNodeIdx].rightConsecutive = 1;
      treeArray[currentNodeIdx].maxConsecutive = 1;
      treeArray[currentNodeIdx].totalSegmentSize = 1;
      return;
    }

    const middlePoint = Math.floor((segmentRangeStart + segmentRangeEnd) / 2);
    const leftChildIndex = 2 * currentNodeIdx;
    const rightChildIndex = 2 * currentNodeIdx + 1;

    buildSegmentTree(leftChildIndex, segmentRangeStart, middlePoint);
    buildSegmentTree(rightChildIndex, middlePoint + 1, segmentRangeEnd);

    mergeNodeData(currentNodeIdx, segmentRangeStart, segmentRangeEnd);
  }

  function mergeNodeData(nodeToMergeIdx, nodeRangeStart, nodeRangeEnd) {
    const leftMergeChildIdx = 2 * nodeToMergeIdx;
    const rightMergeChildIdx = 2 * nodeToMergeIdx + 1;
    const mergeMidPoint = Math.floor((nodeRangeStart + nodeRangeEnd) / 2);

    treeArray[nodeToMergeIdx].totalSegmentSize =
      treeArray[leftMergeChildIdx].totalSegmentSize +
      treeArray[rightMergeChildIdx].totalSegmentSize;

    if (
      treeArray[leftMergeChildIdx].totalSegmentSize ===
        treeArray[leftMergeChildIdx].leftConsecutive &&
      mergeMidPoint + 1 <= nodeRangeEnd &&
      stringCharacters[mergeMidPoint] === stringCharacters[mergeMidPoint + 1]
    ) {
      treeArray[nodeToMergeIdx].leftConsecutive =
        treeArray[leftMergeChildIdx].totalSegmentSize +
        treeArray[rightMergeChildIdx].leftConsecutive;
    } else {
      treeArray[nodeToMergeIdx].leftConsecutive =
        treeArray[leftMergeChildIdx].leftConsecutive;
    }

    if (
      treeArray[rightMergeChildIdx].totalSegmentSize ===
        treeArray[rightMergeChildIdx].rightConsecutive &&
      mergeMidPoint >= nodeRangeStart &&
      stringCharacters[mergeMidPoint] === stringCharacters[mergeMidPoint + 1]
    ) {
      treeArray[nodeToMergeIdx].rightConsecutive =
        treeArray[rightMergeChildIdx].totalSegmentSize +
        treeArray[leftMergeChildIdx].rightConsecutive;
    } else {
      treeArray[nodeToMergeIdx].rightConsecutive =
        treeArray[rightMergeChildIdx].rightConsecutive;
    }

    treeArray[nodeToMergeIdx].maxConsecutive = Math.max(
      treeArray[leftMergeChildIdx].maxConsecutive,
      treeArray[rightMergeChildIdx].maxConsecutive,
    );

    if (
      mergeMidPoint >= nodeRangeStart &&
      mergeMidPoint + 1 <= nodeRangeEnd &&
      stringCharacters[mergeMidPoint] === stringCharacters[mergeMidPoint + 1]
    ) {
      treeArray[nodeToMergeIdx].maxConsecutive = Math.max(
        treeArray[nodeToMergeIdx].maxConsecutive,
        treeArray[leftMergeChildIdx].rightConsecutive +
          treeArray[rightMergeChildIdx].leftConsecutive,
      );
    }
  }

  function updateSegmentTree(
    updateRootIdx,
    updateRangeStart,
    updateRangeEnd,
    targetIdx,
  ) {
    if (targetIdx < updateRangeStart || targetIdx > updateRangeEnd) {
      return;
    }

    if (updateRangeStart === updateRangeEnd) {
      return;
    }

    const updateMidValue = Math.floor((updateRangeStart + updateRangeEnd) / 2);
    const childLeft = 2 * updateRootIdx;
    const childRight = 2 * updateRootIdx + 1;

    updateSegmentTree(childLeft, updateRangeStart, updateMidValue, targetIdx);
    updateSegmentTree(
      childRight,
      updateMidValue + 1,
      updateRangeEnd,
      targetIdx,
    );

    mergeNodeData(updateRootIdx, updateRangeStart, updateRangeEnd);
  }

  buildSegmentTree(1, 0, stringSize - 1);

  for (
    let queryExecutionIndex = 0;
    queryExecutionIndex < queryArrayCount;
    queryExecutionIndex++
  ) {
    const currentModificationIndex = queryArrayIndices[queryExecutionIndex];
    const newCharacterValue = queryArrayChars[queryExecutionIndex];

    stringCharacters[currentModificationIndex] = newCharacterValue;
    updateSegmentTree(1, 0, stringSize - 1, currentModificationIndex);

    finalResults.push(treeArray[1].maxConsecutive);
  }

  return finalResults;
};
