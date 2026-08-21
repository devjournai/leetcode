/**
 * Serialize And Deserialize N Ary Tree
 * Intuition: Preorder can round-trip an N-ary tree if each node stores its value and then its child count, so the decoder knows how many recursive children to consume.
 * Approach: 1. `serialize`: empty root → `""`. 2. DFS push `val` then `children.length`, then each child. 3. Join with commas. 4. `deserialize`: split/map to numbers; `reconstructTree` reads value and count, recurses that many times, returns `_Node`.
 * Dry Run: 1 with children 3,2,4; 3 has 5,6. Serialize `1,3,3,2,5,0,6,0,2,0,4,0`. Parse index walks the same counts and rebuilds the tree.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
class Codec {
  constructor() {}

  serialize = function (rootNode) {
    if (!rootNode) return "";

    const serializationParts = [];

    function traverseAndSerialize(currentNode) {
      serializationParts.push(currentNode.val);
      serializationParts.push(currentNode.children.length);
      for (const childNode of currentNode.children) {
        traverseAndSerialize(childNode);
      }
    }

    traverseAndSerialize(rootNode);
    return serializationParts.join(",");
  };

  deserialize = function (inputData) {
    if (!inputData) return null;

    const numberSequence = inputData.split(",").map(Number);
    let parseIndex = 0;

    function reconstructTree() {
      const currentValue = numberSequence[parseIndex++];
      const childrenQuantity = numberSequence[parseIndex++];
      const childElements = [];

      for (
        let childLoopCount = 0;
        childLoopCount < childrenQuantity;
        childLoopCount++
      ) {
        const deserializedChild = reconstructTree();
        childElements.push(deserializedChild);
      }
      return new _Node(currentValue, childElements);
    }

    return reconstructTree();
  };
}
