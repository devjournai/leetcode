/**
 * Maximum Nesting Depth Of Two Valid Parentheses Strings
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var maxDepthAfterSplit = function (seq) {
  const sequenceLengthValue = seq.length;
  const partitionResultArray = new Array(sequenceLengthValue);
  let currentStackDepth = 0;
  let characterIterator = 0;

  while (characterIterator < sequenceLengthValue) {
    const charOfInterest = seq[characterIterator];

    if (charOfInterest === "(") {
      partitionResultArray[characterIterator] = currentStackDepth % 2;
      currentStackDepth++;
    } else {
      currentStackDepth--;
      partitionResultArray[characterIterator] = currentStackDepth % 2;
    }
    characterIterator++;
  }
  return partitionResultArray;
};
