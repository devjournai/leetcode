/**
 * Alt and Tab Simulation
 * Intuition: Alt-Tab brings a window to the front. After all queries, the stack is the unique queried windows in reverse query order, then the remaining original windows.
 * Approach: 1. Walk queries from back to front and append each unseen window. 2. Then append original windows that never appeared in queries.
 * Dry Run: windows = [1, 2, 3, 4], queries = [3, 3, 2]. Reverse unique: 2 then 3. Remaining originals: 1, 4. Result [2, 3, 1, 4].
 * Time Complexity: O(n + q)
 * Space Complexity: O(n)
 */
var simulationResult = function (windows, queries) {
  const result = [];
  const seen = new Set();

  for (let index = queries.length - 1; index >= 0; index--) {
    const windowId = queries[index];
    if (!seen.has(windowId)) {
      result.push(windowId);
      seen.add(windowId);
    }
  }

  for (const windowId of windows) {
    if (!seen.has(windowId)) {
      result.push(windowId);
      seen.add(windowId);
    }
  }

  return result;
};
