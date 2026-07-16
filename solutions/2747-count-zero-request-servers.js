/**
 * Count Zero Request Servers
 *
 * Intuition:
 * For every query, we need the number of servers that received at least one
 * request inside the interval:
 *
 *      [query - x, query]
 *
 * Instead of checking every query independently, process the queries in
 * increasing order using a sliding window over the sorted logs.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Sort logs by time.
 *
 * 2. Store each query together with its original index and sort by query time.
 *
 * 3. Maintain a sliding window of logs currently inside:
 *
 *      [query - x, query]
 *
 *      left  -> first valid log
 *      right -> last valid log
 *
 * 4. Maintain:
 *
 *      freq[server]
 *          = number of logs of this server inside the window.
 *
 *      active
 *          = number of servers currently having at least one request.
 *
 * 5. For every query:
 *
 *      Expand right pointer while
 *
 *          log.time <= query
 *
 *      Shrink left pointer while
 *
 *          log.time < query - x
 *
 *      The answer is:
 *
 *          n - active
 *
 * 6. Restore answers in the original query order.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * logs:
 *
 * (1,3)
 * (1,5)
 * (2,6)
 *
 * query = 10
 *
 * Window:
 *
 * [5,10]
 *
 * Active servers:
 *
 * 1
 * 2
 *
 * Answer:
 *
 * 3 - 2 = 1
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O((L + Q) log(L + Q))
 * Space Complexity: O(N + Q)
 */

var countServers = function (n, logs, x, queries) {
  logs.sort((a, b) => a[1] - b[1]);

  const sortedQueries = queries.map((value, index) => [value, index]);

  sortedQueries.sort((a, b) => a[0] - b[0]);

  const freq = new Array(n + 1).fill(0);

  let active = 0;

  let left = 0;
  let right = 0;

  const answer = new Array(queries.length);

  for (const [time, index] of sortedQueries) {
    while (right < logs.length && logs[right][1] <= time) {
      const server = logs[right][0];

      if (freq[server] === 0) {
        active++;
      }

      freq[server]++;

      right++;
    }

    while (left < right && logs[left][1] < time - x) {
      const server = logs[left][0];

      freq[server]--;

      if (freq[server] === 0) {
        active--;
      }

      left++;
    }

    answer[index] = n - active;
  }

  return answer;
};
