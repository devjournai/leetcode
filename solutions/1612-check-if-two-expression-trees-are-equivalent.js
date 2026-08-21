/**
 * Check If Two Expression Trees Are Equivalent
 * Intuition: With only '+', two trees are equivalent iff they contain the same multiset of variables. Count leaves and compare maps.
 * Approach: 1. Recurse: a non-'+' leaf yields {var: 1}; a '+' node merges left and right count maps. 2. Compare key sets and counts of both roots. 3. Return true only if they match exactly.
 * Dry Run: a+(b+c) vs (c+a)+b.
 *   - Both maps {a:1,b:1,c:1} → true.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var checkEquivalence = function (root1, root2) {
  function collectVariableCounts(currentNode) {
    if (!currentNode) {
      return {};
    }

    if (currentNode.val !== "+") {
      return { [currentNode.val]: 1 };
    }

    let leftSubtreeVariableMap = collectVariableCounts(currentNode.left);
    let rightSubtreeVariableMap = collectVariableCounts(currentNode.right);
    let combinedVariableMap = { ...leftSubtreeVariableMap };

    let rightEntries = Object.entries(rightSubtreeVariableMap);

    for (let entryIndex = 0; entryIndex < rightEntries.length; entryIndex++) {
      let currentEntry = rightEntries[entryIndex];
      let variableName = currentEntry[0];
      let variableValue = currentEntry[1];
      combinedVariableMap[variableName] =
        (combinedVariableMap[variableName] || 0) + variableValue;
    }

    return combinedVariableMap;
  }

  let firstTreeCounts = collectVariableCounts(root1);
  let secondTreeCounts = collectVariableCounts(root2);

  let firstTreeKeys = Object.keys(firstTreeCounts);
  let secondTreeKeys = Object.keys(secondTreeCounts);

  if (firstTreeKeys.length !== secondTreeKeys.length) {
    return false;
  }

  for (
    let currentKeyIndex = 0;
    currentKeyIndex < firstTreeKeys.length;
    currentKeyIndex++
  ) {
    let currentVariableName = firstTreeKeys[currentKeyIndex];
    if (
      firstTreeCounts[currentVariableName] !==
      secondTreeCounts[currentVariableName]
    ) {
      return false;
    }
  }

  return true;
};
