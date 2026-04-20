/**
 * Check If Two Expression Trees Are Equivalent
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
