/**
 * Maximum Sum of Edge Values in a Graph
 * Intuition: Components are paths or cycles. Assign the largest remaining labels to cycle components first, then long paths, pairing each new label with the current window of two endpoints.
 * Approach: 1. Find connected components; cycles if every degree is 2. 2. For a cycle/path of size s, assign the next s largest integers via calculateScore. 3. Isolated vertices contribute 0.
 * Dry Run: n=3, a path of 3. Labels 3-2-1, edges 3*2+2*1=8.
 * Time Complexity: O(V + E)
 * Space Complexity: O(V + E)
 */
var maxScore = function (n, edges) {
  const graph = Array.from({ length: n }, () => []);
  const seen = new Array(n).fill(false);
  const cycleSizes = [];
  const pathSizes = [];

  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }

  const getComponent = (start) => {
    const component = [start];
    seen[start] = true;
    for (let i = 0; i < component.length; i++) {
      const u = component[i];
      for (const v of graph[u]) {
        if (seen[v]) continue;
        component.push(v);
        seen[v] = true;
      }
    }
    return component;
  };

  const calculateScore = (left, right, isCycle) => {
    const window = [right, right];
    let score = 0;
    for (let value = right - 1; value >= left; value--) {
      const windowValue = window.shift();
      score += windowValue * value;
      window.push(value);
    }
    return score + window[0] * window[1] * (isCycle ? 1 : 0);
  };

  let remaining = n;
  let answer = 0;
  for (let i = 0; i < n; i++) {
    if (seen[i]) continue;
    const component = getComponent(i);
    const allDegree2 = component.every((u) => graph[u].length === 2);
    if (allDegree2) cycleSizes.push(component.length);
    else if (component.length > 1) pathSizes.push(component.length);
  }

  for (const cycleSize of cycleSizes) {
    answer += calculateScore(remaining - cycleSize + 1, remaining, true);
    remaining -= cycleSize;
  }
  pathSizes.sort((a, b) => b - a);
  for (const pathSize of pathSizes) {
    answer += calculateScore(remaining - pathSize + 1, remaining, false);
    remaining -= pathSize;
  }
  return answer;
};
