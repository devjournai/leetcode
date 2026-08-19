/**
 * Time Taken to Mark All Nodes
 * Intuition: Marking an even node costs 2 and an odd node costs 1. For every root, the time is the heaviest path of those costs. Compute subtree maxima, then reroot.
 * Approach: 1. Build the undirected tree. 2. DFS from 0 storing the top two child subtree times. 3. Reroot: answer at u is max(downward, upward). When moving to child v, upward becomes getTime(u) + max(upward, the other top child of u).
 * Dry Run: edges = [[0, 1]]. From 0: child 1 costs 1. From 1: child 0 costs 2. Answer [1, 2].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var timeTaken = function (edges) {
  const nodeCount = edges.length + 1;
  const answer = Array(nodeCount).fill(0);
  const tree = Array.from({ length: nodeCount }, () => []);
  const topTwo = Array.from({ length: nodeCount }, () => ({
    top1: { node: 0, time: 0 },
    top2: { node: 0, time: 0 },
  }));

  for (const [u, v] of edges) {
    tree[u].push(v);
    tree[v].push(u);
  }

  const getTime = (node) => (node % 2 === 0 ? 2 : 1);

  const dfs = (u, prev) => {
    let top1 = { node: 0, time: 0 };
    let top2 = { node: 0, time: 0 };
    for (const v of tree[u]) {
      if (v === prev) {
        continue;
      }
      const time = dfs(v, u) + getTime(v);
      if (time >= top1.time) {
        top2 = top1;
        top1 = { node: v, time };
      } else if (time > top2.time) {
        top2 = { node: v, time };
      }
    }
    topTwo[u] = { top1, top2 };
    return top1.time;
  };

  const reroot = (u, prev, maxTime) => {
    answer[u] = Math.max(maxTime, topTwo[u].top1.time);
    for (const v of tree[u]) {
      if (v === prev) {
        continue;
      }
      const otherDown =
        topTwo[u].top1.node === v ? topTwo[u].top2.time : topTwo[u].top1.time;
      const newMaxTime = getTime(u) + Math.max(maxTime, otherDown);
      reroot(v, u, newMaxTime);
    }
  };

  dfs(0, -1);
  reroot(0, -1, 0);
  return answer;
};
