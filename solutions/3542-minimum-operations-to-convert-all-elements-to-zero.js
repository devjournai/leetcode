/**
 * Minimum Operations to Convert All Elements to Zero
 * Intuition: Each new local maximum that is not already the stack top needs a dedicated operation; a monotonic stack of increasing values counts them.
 * Approach: 1. Start a stack with 0. 2. For each num, pop larger values. 3. If the top is smaller, increment the answer and push num.
 * Dry Run: nums = [1, 2, 1]. Push 1 (op 1), push 2 (op 2), pop 2, top 1 equals 1 → no extra op. Answer 2.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minOperations = function (nums) {
  let answer = 0;
  const stack = [0];

  for (const num of nums) {
    while (stack.length && stack[stack.length - 1] > num) {
      stack.pop();
    }
    if (!stack.length || stack[stack.length - 1] < num) {
      answer += 1;
      stack.push(num);
    }
  }

  return answer;
};
