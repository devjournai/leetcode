/**
 * Maximum Requests Without Violating the Limit
 * Intuition: We can group the requests by user and store them in a hash table $g$, where $g[u]$ is the list of request times for user $u$. For each user, we need to remove some requests from the request time list so that within any interval of length $window$, the number of remaining requests does not exceed $k$. We initialize the answer $\textit{ans}$ to the total number of requests. For the request time list $g[u]$ of user $u$, we first sort it. Then, we use a deque $kept$ to maintain the currently kept request times. We iterate through each request time $t$ in the request time list. For each request time, we need to remove all request times from $kept$ whose difference from $t$ is greater than $window$. Then, if the number of remaining requests in $kept$ is less than $k$, we add $t$ to $kept$; otherwise, we need to remove $t$ and decrement the answer by 1. Finally, return the answer $\textit{ans}$...
 * Approach: We can group the requests by user and store them in a hash table $g$, where $g[u]$ is the list of request times for user $u$. For each user, we need to remove some requests from the request time list so that within any interval of length $window$, the number of remaining requests does not exceed $k$. We initialize the answer $\textit{ans}$ to the total number of requests. For the request time list $g[u]$ of user $u$, we first sort it. Then, we use a deque $kept$ to maintain the currently kept request times. We iterate through each request time $t$ in the request time list. For each request time, we need to remove all request times from $kept$ whose difference from $t$ is greater than $window$. Then, if the number of remaining requests in $kept$ is less than $k$, we add $t$ to $kept$; otherwise, we need to remove $t$ and decrement the answer by 1. Finally, return the answer $\textit{ans}$...
 * Dry Run: Input: requests = [[1,1],[2,1],[1,7],[2,8]], k = 1, window = 4 => Output: 4
 * Time Complexity: O(O(n log n))
 * Space Complexity: O(O(n))
 */
var maxRequests = function (requests, k, window) {
  const g = new Map();
  for (const [u, t] of requests) {
    if (!g.has(u)) g.set(u, []);
    g.get(u).push(t);
  }
  let ans = requests.length;
  for (const ts of g.values()) {
    ts.sort((a, b) => a - b);
    const kept = [];
    let head = 0;
    for (const t of ts) {
      while (head < kept.length && t - kept[head] > window) {
        head++;
      }
      if (kept.length - head < k) {
        kept.push(t);
      } else {
        --ans;
      }
    }
  }
  return ans;
};
