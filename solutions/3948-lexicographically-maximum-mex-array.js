/**
 * Lexicographically Maximum MEX Array
 * Intuition: Greedy: always take the longest prefix whose MEX is maximized (prefer large first MEX), then repeat. First MEX is as large as possible, so take the shortest prefix that contains 0..t-1 for the max possible t, i.e. the prefix until all of 0..mex-1 appear. To maximize first element, maximize that MEX, which means extend until we cannot increase MEX further without... Actually to max lex, maximize first MEX, so take the shortest prefix that achieves the maximum possible MEX of some prefix (the MEX of the whole array if we take all, but shorter prefix may have smaller MEX). The maximum first MEX is MEX of the entire array (taking k=n). That gives a 1-element result [mex(all)] which is longest. Lex: [3] vs [2,1] - [3]>[2,1]. So always dump the whole remaining array? Example [0,1,0] whole MEX=2 gives [2] but answer is [2,1]. [2] vs [2,1]: they equal at first pos, longer is greater! So after tying first MEX we still want more elements... Wait 'If the first min(len) elements do not differ, the longer array is greater.' So [2,1] > [2]. We should produce as many high MEX chunks as possible with greedy: repeatedly take the shortest prefix that attains the maximum achievable MEX of the remaining array. Max MEX of remaining is mex of remaining. Shortest prefix with that MEX is the position where the last missing 0..mex-1 appears.
 * Approach: 1. For remaining suffix, compute mex. 2. Find the rightmost first-occurrence covering 0..mex-1. 3. Append mex, cut there.
 * Dry Run: Input: nums = [0,1,0]. Output: [2,1].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var lexMaxMex = function (nums) {
  const n = nums.length;
  const result = [];
  let start = 0;
  while (start < n) {
    const seen = new Set();
    let mex = 0;
    for (let i = start; i < n; i++) {
      seen.add(nums[i]);
      while (seen.has(mex)) mex++;
    }
    const need = new Set();
    for (let x = 0; x < mex; x++) need.add(x);
    const have = new Set();
    let cut = start;
    for (let i = start; i < n; i++) {
      if (need.has(nums[i])) have.add(nums[i]);
      cut = i;
      if (have.size === need.size) break;
    }
    result.push(mex);
    start = cut + 1;
  }
  return result;
};
