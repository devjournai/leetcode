/**
 * Frequencies of Shortest Supersequences
 * Intuition: Each word is a 2-letter constraint edge. A shortest supersequence uses each letter once, doubling the smallest set of letters that hits every cycle.
 * Approach: 1. Build a graph on letters that appear. 2. Find all minimum subsets of vertices whose removal makes the graph acyclic. 3. Emit a 26-length freq array with 1 for used letters and 2 for doubled ones.
 * Dry Run: words = ["ab","ba"]. Cycle a↔b; minimum feedback vertex sets are {a} and {b}. Freq arrays have a=2,b=1 or a=1,b=2.
 * Time Complexity: O(1) for at most 16 letters
 * Space Complexity: O(1)
 */

var supersequences = function (words) {
  const INIT = 0;
  const VISITING = 1;
  const VISITED = 2;

  const edges = words.map((word) => [
    word.charCodeAt(0) - 97,
    word.charCodeAt(1) - 97,
  ]);
  const nodeSet = new Set();
  for (const [from, to] of edges) {
    nodeSet.add(from);
    nodeSet.add(to);
  }
  const nodes = [...nodeSet].sort((a, b) => a - b);
  const letterToIndex = new Array(26).fill(0);
  nodes.forEach((letter, index) => {
    letterToIndex[letter] = index;
  });

  const graph = Array.from({ length: nodes.length }, () => []);
  for (const [from, to] of edges) {
    graph[letterToIndex[from]].push(letterToIndex[to]);
  }

  const hasCycleSkipping = (doubledSubset) => {
    const states = new Array(graph.length).fill(INIT);
    const hasCycle = (node) => {
      if (states[node] === VISITING) {
        return true;
      }
      if (states[node] === VISITED) {
        return false;
      }
      states[node] = VISITING;
      if (!doubledSubset.has(node)) {
        for (const next of graph[node]) {
          if (!doubledSubset.has(next) && hasCycle(next)) {
            return true;
          }
        }
      }
      states[node] = VISITED;
      return false;
    };
    for (let node = 0; node < graph.length; node++) {
      if (hasCycle(node)) {
        return true;
      }
    }
    return false;
  };

  const combinations = (size) => {
    const result = [];
    const dfs = (start, path) => {
      if (path.length === size) {
        result.push([...path]);
        return;
      }
      for (let index = start; index < nodes.length; index++) {
        path.push(index);
        dfs(index + 1, path);
        path.pop();
      }
    };
    dfs(0, []);
    return result;
  };

  const getMinimumSubsets = () => {
    for (let subsetSize = 0; subsetSize <= nodes.length; subsetSize++) {
      const valid = [];
      for (const subset of combinations(subsetSize)) {
        if (!hasCycleSkipping(new Set(subset))) {
          valid.push(subset);
        }
      }
      if (valid.length > 0) {
        return valid;
      }
    }
    return [];
  };

  const answer = [];
  for (const doubledSubset of getMinimumSubsets()) {
    const freq = new Array(26).fill(0);
    for (const letter of nodes) {
      freq[letter] = 1;
    }
    for (const index of doubledSubset) {
      freq[nodes[index]] = 2;
    }
    answer.push(freq);
  }
  return answer;
};
