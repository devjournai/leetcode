/**
 * Encode N Ary Tree To Binary Tree
 * Intuition: First child becomes the binary left child; remaining siblings chain on `right`, so left/right encode “first child / next sibling”.
 * Approach: 1. `encode`: null → null. 2. New `TreeNode` with the N-ary value. 3. Left = encode of children[0] if any. 4. Walk that left spine setting each `right` to encode of the next sibling. 5. `decode`: walk the left child’s right-chain, decoding each into `children`.
 * Dry Run: 1 with children 2,3,4. Binary: 1.left=2, 2.right=3, 3.right=4. Decode collects 2 then 3 then 4 as children of 1.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
class Codec {
  constructor() {}

  encode = function (naryRoot) {
    if (!naryRoot) {
      return null;
    }

    const binaryRepresentationRoot = new TreeNode(naryRoot.val);

    if (naryRoot.children.length > 0) {
      binaryRepresentationRoot.left = this.encode(naryRoot.children[0]);
    }

    let currentBinaryChild = binaryRepresentationRoot.left;
    for (
      let childIndex = 1;
      childIndex < naryRoot.children.length;
      childIndex++
    ) {
      if (currentBinaryChild) {
        currentBinaryChild.right = this.encode(naryRoot.children[childIndex]);
        currentBinaryChild = currentBinaryChild.right;
      }
    }

    return binaryRepresentationRoot;
  };

  decode = function (binaryRootNode) {
    if (!binaryRootNode) {
      return null;
    }

    const naryNodeResult = new _Node(binaryRootNode.val, []);
    let currentBinarySiblingPointer = binaryRootNode.left;

    while (currentBinarySiblingPointer) {
      naryNodeResult.children.push(this.decode(currentBinarySiblingPointer));
      currentBinarySiblingPointer = currentBinarySiblingPointer.right;
    }

    return naryNodeResult;
  };
}
