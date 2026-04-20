/**
 * Serialize And Deserialize N Ary Tree
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
