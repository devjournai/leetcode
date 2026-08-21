/**
 * Toggle Light Bulbs
 * Intuition: We use an array $\textit{st}$ of length $101$ to record the state of each light bulb. Initially, all elements are $0$, indicating that all light bulbs are in the off state. For each element $\textit{bulbs}[i]$ in the array $\textit{bulbs}$, we toggle the value of $\textit{st}[\textit{bulbs}[i]]$ (i.e., $0$ becomes $1$, and $1$ becomes $0$). Finally, we traverse the $\textit{st}$ array, add the indices with a value of $1$ to the result list, and return the result. The time complexity is $O(n)$, where $n$ is the length of the array $\textit{bulbs}$. The space complexity is $O(M)$, where $M$ is the maximum bulb number.
 * Approach: We use an array $\textit{st}$ of length $101$ to record the state of each light bulb. Initially, all elements are $0$, indicating that all light bulbs are in the off state. For each element $\textit{bulbs}[i]$ in the array $\textit{bulbs}$, we toggle the value of $\textit{st}[\textit{bulbs}[i]]$ (i.e., $0$ becomes $1$, and $1$ becomes $0$). Finally, we traverse the $\textit{st}$ array, add the indices with a value of $1$ to the result list, and return the result. The time complexity is $O(n)$, where $n$ is the length of the array $\textit{bulbs}$. The space complexity is $O(M)$, where $M$ is the maximum bulb number.
 * Dry Run: Input: bulbs = [10,30,20,10] => Output: [20,30]
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(M))
 */
var toggleLightBulbs = function (bulbs) {
  const st = new Array(101).fill(0);
  for (const x of bulbs) {
    st[x] ^= 1;
  }
  const ans = [];
  for (let i = 0; i < 101; i++) {
    if (st[i] === 1) {
      ans.push(i);
    }
  }
  return ans;
};
