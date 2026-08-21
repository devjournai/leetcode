/**
 * Merge Adjacent Equal Elements
 * Intuition: We can use a stack to simulate the process of merging adjacent equal elements. Define a stack $\textit{stk}$ to store the current processed array elements. Traverse each element $x$ of the input array $\textit{nums}$ and push it onto the stack. Then check if the top two elements of the stack are equal. If they are equal, pop them and push their sum back onto the stack. Repeat this process until the top two elements of the stack are no longer equal. Finally, the elements in the stack are the final merged array. The time complexity is $O(n)$, where $n$ is the length of the array $\textit{nums}$. The space complexity is $O(n)$, which is used to store the elements in the stack.
 * Approach: We can use a stack to simulate the process of merging adjacent equal elements. Define a stack $\textit{stk}$ to store the current processed array elements. Traverse each element $x$ of the input array $\textit{nums}$ and push it onto the stack. Then check if the top two elements of the stack are equal. If they are equal, pop them and push their sum back onto the stack. Repeat this process until the top two elements of the stack are no longer equal. Finally, the elements in the stack are the final merged array. The time complexity is $O(n)$, where $n$ is the length of the array $\textit{nums}$. The space complexity is $O(n)$, which is used to store the elements in the stack.
 * Dry Run: Input: nums = [3,1,1,2] => Output: [3,4]
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
var mergeAdjacent = function (nums) {
  const stk = [];
  for (const x of nums) {
    stk.push(x);
    while (stk.length > 1 && stk.at(-1) === stk.at(-2)) {
      const a = stk.pop();
      const b = stk.pop();
      stk.push(a + b);
    }
  }
  return stk;
};
