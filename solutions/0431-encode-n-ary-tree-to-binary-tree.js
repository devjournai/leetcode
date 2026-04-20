/**
 * Encode N Ary Tree To Binary Tree
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/
class Codec {
  constructor() { }

  encode = function (naryRoot) {
    if (!naryRoot) {
      return null;
    }

    const binaryRepresentationRoot = new TreeNode(naryRoot.val);

    if (naryRoot.children.length > 0) {
      binaryRepresentationRoot.left = this.encode(naryRoot.children[0]);
    }

    let currentBinaryChild = binaryRepresentationRoot.left;
    for (let childIndex = 1; childIndex < naryRoot.children.length; childIndex++) {
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