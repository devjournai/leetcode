/**
 * Maximum Number Of Operations With The Same Score II
 * Intuition: The score of the first operation (two ends or first two or last two) must be used for all later operations. Try the three possible initial scores and memoize remaining interval [left,right].
 * Approach: 1. Define dfs(left,right,targetScore). 2. Try nums[left]+nums[left+1], nums[right]+nums[right-1], nums[left]+nums[right] if they equal target. 3. Memoize. 4. Take max over three initial choices.
 * Dry Run:
 *   nums = [3,2,1,2,3,4] first 3+4=7 then 3+4? ends 3+4=7, remaining [2,1,2,3] 2+3=5 no... sample answer 3 with score 5: 3+2, then 1+4? Wait typical sample is 2.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var maxOperations = function (nums) {
  const arrayLength = nums.length;
  const memoByState = new Map();

  const dfs = (leftIndex, rightIndex, targetScore) => {
    if (rightIndex - leftIndex + 1 < 2) {
      return 0;
    }
    const stateKey = `${leftIndex},${rightIndex},${targetScore}`;
    if (memoByState.has(stateKey)) {
      return memoByState.get(stateKey);
    }
    let maxOps = 0;
    if (nums[leftIndex] + nums[leftIndex + 1] === targetScore) {
      maxOps = Math.max(
        maxOps,
        1 + dfs(leftIndex + 2, rightIndex, targetScore),
      );
    }
    if (nums[rightIndex] + nums[rightIndex - 1] === targetScore) {
      maxOps = Math.max(
        maxOps,
        1 + dfs(leftIndex, rightIndex - 2, targetScore),
      );
    }
    if (nums[leftIndex] + nums[rightIndex] === targetScore) {
      maxOps = Math.max(
        maxOps,
        1 + dfs(leftIndex + 1, rightIndex - 1, targetScore),
      );
    }
    memoByState.set(stateKey, maxOps);
    return maxOps;
  };

  return (
    Math.max(
      dfs(2, arrayLength - 1, nums[0] + nums[1]),
      dfs(0, arrayLength - 3, nums[arrayLength - 2] + nums[arrayLength - 1]),
      dfs(1, arrayLength - 2, nums[0] + nums[arrayLength - 1]),
    ) + 1
  );
};
