/**
 * Maximum Nesting Depth Of Two Valid Parentheses Strings
 * Intuition: Alternate groups by current depth parity so each subsequence’s max depth is about half. Assign '(' at even/odd depth before incrementing and ')' after decrementing so a pair shares a group.
 * Approach: 1. depth=0. 2. On '(', record depth%2 then depth++. 3. On ')', depth-- then record depth%2. 4. Return the assignment array.
 * Dry Run: (()). '(' depth0→A0, '(' depth1→A1, ')' depth1→A1, ')' depth0→A0 → [0,1,1,0].
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
