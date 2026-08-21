/**
 * Maximum Capacity Within Budget
 * Intuition: We first filter out all machines with costs less than the budget and sort them by cost in ascending order, recording them in the array $\textit{arr}$, where $\textit{arr}[i] = (\textit{costs}[i], \textit{capacity}[i])$. If $\textit{arr}$ is empty, we cannot buy any machine, so we return $0$. Otherwise, we can obtain the machine with the maximum capacity in $\textit{arr}$ and initialize the answer with this capacity. Next, we use a two-pointer approach to iterate through pairs of machines in $\textit{arr}$, using an ordered set $\textit{remain}$ to maintain the capacities of all currently available machines. Initially, $\textit{remain}$ contains the capacities of all machines in $\textit{arr}$. We use pointers $i$ and $j$ pointing to the beginning and end of $\textit{arr}$, respectively. For each $i$, we remove $\textit{arr}[i]$ from $\textit{remain}$, and then move pointer $j$ until $\te...
 * Approach: We first filter out all machines with costs less than the budget and sort them by cost in ascending order, recording them in the array $\textit{arr}$, where $\textit{arr}[i] = (\textit{costs}[i], \textit{capacity}[i])$. If $\textit{arr}$ is empty, we cannot buy any machine, so we return $0$. Otherwise, we can obtain the machine with the maximum capacity in $\textit{arr}$ and initialize the answer with this capacity. Next, we use a two-pointer approach to iterate through pairs of machines in $\textit{arr}$, using an ordered set $\textit{remain}$ to maintain the capacities of all currently available machines. Initially, $\textit{remain}$ contains the capacities of all machines in $\textit{arr}$. We use pointers $i$ and $j$ pointing to the beginning and end of $\textit{arr}$, respectively. For each $i$, we remove $\textit{arr}[i]$ from $\textit{remain}$, and then move pointer $j$ until $\te...
 * Dry Run: Input: costs = [4,8,5,3], capacity = [1,5,2,7], budget = 8 => Output: 8
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maxCapacity = function (costs, capacity, budget) {
  const arr = [];
  for (let i = 0; i < costs.length; i++) {
    if (costs[i] < budget) arr.push([costs[i], capacity[i]]);
  }
  if (arr.length === 0) return 0;
  arr.sort((a, b) => a[0] - b[0]);
  let ans = 0;
  const pref = new Array(arr.length);
  let mx = 0;
  for (let i = 0; i < arr.length; i++) {
    mx = Math.max(mx, arr[i][1]);
    pref[i] = mx;
    ans = Math.max(ans, arr[i][1]);
  }
  let i = 0;
  for (let j = arr.length - 1; j >= 0; j--) {
    while (i < j && arr[i][0] + arr[j][0] < budget) i++;
    const last = Math.min(i - 1, j - 1);
    if (last >= 0) ans = Math.max(ans, arr[j][1] + pref[last]);
  }
  return ans;
};
