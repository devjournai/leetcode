/**
 * Most Frequent Subtree Sum
 * Intuition: Each node's subtree sum is `val + left + right`. Count how often each sum appears, then collect every sum that hits the maximum frequency.
 * Approach: 1. Post-order `calculateSubtreeTotal` records counts in `subtreeSumFrequencies`. 2. Scan the map: on a new max frequency, replace `mostFrequentSums`; on a tie, push the sum. 3. Empty tree returns `[]`.
 * Dry Run: root 5, left 2, right -3.
 *   - Leaf 2 → sum 2; leaf -3 → -3; root 5+2-3=4. Each frequency 1. Return [2, -3, 4] (any order).
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
