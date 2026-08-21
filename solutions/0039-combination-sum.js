/**
 * Combination Sum
 * Intuition: Every combination that sums to the target can be built by repeatedly picking a candidate. Reusing the same number is allowed, so we stay on the current index after a pick. Backtracking undoes a pick so we can try the next candidate.
 * Approach: 1. Recurse with remaining sum, start index, and the path so far. 2. If remaining is 0, copy the path into the answer. 3. If remaining is negative, prune. 4. From startIndex onward, push a candidate, recurse with the same index (reuse allowed), then pop.
 * Dry Run: candidates = [2, 3, 6, 7], target = 7.
 *   - Pick 2: remaining 5 → pick 2: remaining 3 → pick 2: remaining 1 → fail; backtrack; pick 3: remaining 0 → [2, 2, 3].
 *   - Later branch picks 7: remaining 0 → [7]. Answer [[2,2,3],[7]].
 * Time Complexity: O(N^(T/M) * (T/M))
 * Space Complexity: O(T/M)
 */
var combinationSum = function (candidates, target) {
  const allCombinations = [];

  const findCombinations = (currentSum, startIndex, currentPath) => {
    if (currentSum === 0) {
      allCombinations.push([...currentPath]);
      return;
    }

    if (currentSum < 0) {
      return;
    }

    for (
      let loopIndex = startIndex;
      loopIndex < candidates.length;
      loopIndex++
    ) {
      const chosenCandidate = candidates[loopIndex];
      currentPath.push(chosenCandidate);
      findCombinations(currentSum - chosenCandidate, loopIndex, currentPath);
      currentPath.pop();
    }
  };

  findCombinations(target, 0, []);
  return allCombinations;
};
