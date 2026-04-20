/**
 * Most Frequent Subtree Sum
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findFrequentTreeSum = function (root) {
  if (!root) {
    return [];
  }

  const subtreeSumFrequencies = new Map();
  let maxFrequencyCount = 0;
  let mostFrequentSums = [];

  function calculateSubtreeTotal(currentNode) {
    if (!currentNode) {
      return 0;
    }

    const leftSumComponent = calculateSubtreeTotal(currentNode.left);
    const rightSumComponent = calculateSubtreeTotal(currentNode.right);

    const currentSubtreeValue =
      currentNode.val + leftSumComponent + rightSumComponent;

    const updatedOccurrence =
      (subtreeSumFrequencies.get(currentSubtreeValue) || 0) + 1;
    subtreeSumFrequencies.set(currentSubtreeValue, updatedOccurrence);

    return currentSubtreeValue;
  }

  calculateSubtreeTotal(root);

  for (const [sumKey, frequencyValue] of subtreeSumFrequencies) {
    if (frequencyValue > maxFrequencyCount) {
      maxFrequencyCount = frequencyValue;
      mostFrequentSums = [sumKey];
    } else if (frequencyValue === maxFrequencyCount) {
      mostFrequentSums.push(sumKey);
    }
  }

  return mostFrequentSums;
};
