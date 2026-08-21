/**
 * Phone Number Prefix
 * Intuition: After sorting strings lexicographically, a prefix relationship can only hold between neighbors: if A is a prefix of some later B, the next string after A also starts with A.
 * Approach: 1. Sort the numbers. 2. For each adjacent pair, if the later starts with the earlier, return false. 3. Otherwise return true.
 * Dry Run: numbers = ["001","0012"] sorts the same; "0012".startsWith("001") → false. numbers = ["01","10"] → true.
 * Time Complexity: O(N log N * L)
 * Space Complexity: O(L) for sort
 */
var phonePrefix = function (numbers) {
  numbers.sort();
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i].startsWith(numbers[i - 1])) {
      return false;
    }
  }
  return true;
};
