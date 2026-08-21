/**
 * Minimum Operations to Make Array Elements Zero
 * Intuition: Each operation replaces a number x with floor(x/4). Numbers in [4^(p-1), 4^p - 1] need exactly p operations. A query [l,r] needs ceil(total operations across the range / 2) because each operation can process two numbers (or one leftover).
 * Approach: 1. Define getOperations(n) as the total floor-div-4 steps to reduce every integer in [1,n] to 0, by summing count * p over each power-of-four block. 2. For [l,r] add (getOperations(r) - getOperations(l-1) + 1) / 2. 3. Sum over queries.
 * Dry Run: query [1,2]. 1 needs 1 op, 2 needs 1 op, total 2, ceil(2/2)=1.
 * Time Complexity: O(Q log R)
 * Space Complexity: O(1)
 */
var minOperations = function (queries) {
  const getOperations = (n) => {
    let result = 0;
    let ops = 0;
    for (let powerOfFour = 1; powerOfFour <= n; powerOfFour *= 4) {
      const left = powerOfFour;
      const right = Math.min(n, powerOfFour * 4 - 1);
      ops++;
      result += (right - left + 1) * ops;
    }
    return result;
  };

  let answer = 0;
  for (const query of queries) {
    const l = query[0];
    const r = query[1];
    answer += Math.floor((getOperations(r) - getOperations(l - 1) + 1) / 2);
  }
  return answer;
};
