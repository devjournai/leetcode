/**
 * Next Greater Element IV
 * Intuition: We need to find the second greater element for every number. Instead of checking every element to the right (which would take O(N²)), we process the array from left to right while maintaining two monotonic stacks.
 * • Stack 1 (s1): Stores indices whose first greater element has not been found yet.
 * • Stack 2 (s2): Stores indices that have already found their first greater element and are now waiting for their second greater element.
 * When the current number is:
 * 1. Greater than elements in s2 → It becomes their second greater element.
 * 2. Greater than elements in s1 → Those elements have now found their first greater element. Move them into s2.
 * Since every index moves: s1 → s2 → Answer
 * Approach:
 * 1. Create an answer array initialized with -1.
 * 2. Maintain two stacks:
 *      s1 → Waiting for first greater element.
 *      s2 → Waiting for second greater element.
 * 3. Traverse nums from left to right.
 * 4. While current number is greater than the top of s2: Current number is the second greater element. Update answer.
 * 5. While current number is greater than the top of s1: Those elements found their first greater element. Move them into a temporary stack.
 * 6. Move temporary elements into s2 to preserve their processing order.
 * 7. Push current index into s1.
 * 8. Return the answer array.
 * Dry Run:
 * nums = [2,4,0,9,6]
 * Initially: ans = [-1,-1,-1,-1,-1]
 * s1 = []
 * s2 = []
 * --------------------------------
 *
 * i = 0
 * x = 2
 *
 * s1 = [0]
 *
 * --------------------------------
 *
 * i = 1
 * x = 4
 *
 * 4 > 2
 *
 * Move index 0
 * from s1 → tmp
 *
 * tmp = [0]
 *
 * Move tmp → s2
 *
 * s2 = [0]
 *
 * Push current index
 *
 * s1 = [1]
 *
 * --------------------------------
 *
 * i = 2
 * x = 0
 *
 * Nothing happens.
 *
 * s1 = [1,2]
 *
 * --------------------------------
 *
 * i = 3
 * x = 9
 *
 * First check s2
 *
 * nums[0] = 2
 *
 * 9 > 2
 *
 * ans[0] = 9
 *
 * s2 becomes empty.
 *
 * Now process s1
 *
 * 9 > 0
 *
 * Move index 2 → tmp
 *
 * 9 > 4
 *
 * Move index 1 → tmp
 *
 * tmp = [2,1]
 *
 * Move tmp → s2
 *
 * s2 = [1,2]
 *
 * Push current index
 *
 * s1 = [3]
 *
 * ans = [9,-1,-1,-1,-1]
 *
 * --------------------------------
 *
 * i = 4
 * x = 6
 *
 * Check s2
 *
 * nums[2]=0
 *
 * 6 > 0
 *
 * ans[2]=6
 *
 * nums[1]=4
 *
 * 6 > 4
 *
 * ans[1]=6
 *
 * s2 becomes empty.
 *
 * Check s1
 *
 * nums[3]=9
 *
 * 6 is not greater.
 *
 * Push index 4
 *
 * s1=[3,4]
 *
 * --------------------------------
 *
 * Final Answer:
 *
 * [9,6,6,-1,-1]
 *
 * --------------------------------------------------
 *
 * Why Two Stacks?
 *
 * Stack 1:
 *
 * Waiting for
 * First Greater Element
 *
 *          4
 *          2
 *
 * ---------------------
 *
 * Stack 2:
 *
 * Waiting for
 * Second Greater Element
 *
 *          4
 *          2
 *
 * Every index follows:
 *
 *      s1
 *       ↓
 *      s2
 *       ↓
 *     Answer
 *
 * Therefore every element is pushed
 * and popped at most once from each stack.
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var secondGreaterElement = function (nums) {
  const n = nums.length;
  const ans = new Array(n).fill(-1);

  const s1 = [];
  const s2 = [];

  for (let i = 0; i < n; i++) {
    const x = nums[i];

    while (s2.length > 0 && nums[s2[s2.length - 1]] < x) {
      ans[s2.pop()] = x;
    }

    const tmp = [];
    while (s1.length > 0 && nums[s1[s1.length - 1]] < x) {
      tmp.push(s1.pop());
    }

    while (tmp.length > 0) {
      s2.push(tmp.pop());
    }

    s1.push(i);
  }

  return ans;
};
