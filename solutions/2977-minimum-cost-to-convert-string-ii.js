/**
 * Minimum Cost to Convert String II
 *
 * Intuition:
 *
 * We need to convert `source` into `target`.
 *
 * Unlike String I, the operations here can replace an entire
 * substring.
 *
 * Example:
 *
 *     source = "abcd"
 *     target = "efgh"
 *
 * If:
 *
 *     "ab" -> "ef" = 5
 *
 * then both characters can be converted together for cost 5.
 *
 * Therefore, we need to divide the strings into segments and
 * find the cheapest way to convert every segment.
 *
 * ------------------------------------------------------------
 *
 * Approach: Unique original/changed strings as nodes; Floyd-Warshall min transform costs. Insert all strings into two tries. DP: keep matching chars for free; from i walk both tries up to maxLen and relax dp[i+len] with dist[wordIdS][wordIdT]. Return dp[n] or -1.
 *
 * Step 1:
 *
 * Collect every string that appears in `original` or `changed`.
 *
 * Each unique string becomes a node in a graph.
 *
 * Example:
 *
 *     original = ["a", "ab"]
 *     changed  = ["b", "cd"]
 *
 * Nodes:
 *
 *     "a", "b", "ab", "cd"
 *
 * ------------------------------------------------------------
 *
 * Step 2:
 *
 * Build a graph between these strings.
 *
 * If:
 *
 *     original[i] -> changed[i]
 *
 * costs:
 *
 *     cost[i]
 *
 * then create an edge:
 *
 *     original[i] -> changed[i]
 *
 * with weight `cost[i]`.
 *
 * Multiple transformations between the same two strings may
 * exist, so we keep the minimum cost.
 *
 * ------------------------------------------------------------
 *
 * Step 3:
 *
 * Use Floyd-Warshall to calculate the cheapest way to transform
 * one known string into another known string.
 *
 * After Floyd-Warshall:
 *
 *     dist[u][v]
 *
 * represents the minimum cost to transform string `u` into
 * string `v`.
 *
 * ------------------------------------------------------------
 *
 * Step 4:
 *
 * We need to efficiently find which transformation strings match
 * the current position in `source` and `target`.
 *
 * For this, we build TWO tries:
 *
 *     trieS -> contains all transformation strings
 *     trieT -> contains all transformation strings
 *
 * At position `i`, we walk through both tries simultaneously.
 *
 * Example:
 *
 *     source = "abc..."
 *     target = "xyz..."
 *
 * If:
 *
 *     "ab"
 *
 * exists as a transformation string, and:
 *
 *     "xy"
 *
 * also exists, then we can consider:
 *
 *     source[i ... i+1] -> target[i ... i+1]
 *
 * ------------------------------------------------------------
 *
 * Step 5:
 *
 * Dynamic Programming.
 *
 * Let:
 *
 *     dp[i]
 *
 * be the minimum cost required to convert the first `i`
 * characters of source into the first `i` characters of target.
 *
 * Initially:
 *
 *     dp[0] = 0
 *
 * ------------------------------------------------------------
 *
 * Option 1:
 *
 * If:
 *
 *     source[i] === target[i]
 *
 * then we can keep that character unchanged:
 *
 *     dp[i + 1] = min(
 *         dp[i + 1],
 *         dp[i]
 *     )
 *
 * ------------------------------------------------------------
 *
 * Option 2:
 *
 * Try every transformation substring starting at position `i`.
 *
 * If:
 *
 *     source[i ... j]
 *
 * can be represented by a known transformation string, and:
 *
 *     target[i ... j]
 *
 * can also be represented by a known transformation string,
 * then:
 *
 *     dp[j + 1] =
 *         min(
 *             dp[j + 1],
 *             dp[i] + dist[sourceString][targetString]
 *         )
 *
 * ------------------------------------------------------------
 *
 * Dry Run:
 *
 *     source = "abc"
 *     target = "xyz"
 *
 * Suppose:
 *
 *     "ab" -> "xy" = 5
 *     "c"  -> "z"  = 2
 *
 * Then:
 *
 *     dp[0] = 0
 *
 *     "ab" conversion:
 *
 *     dp[2] = 5
 *
 *     "c" conversion:
 *
 *     dp[3] = 7
 *
 * Answer:
 *
 *     7
 *
 * ------------------------------------------------------------
 *
 * Why Trie?
 *
 * Without a Trie, at every position we would need to compare
 * every transformation string.
 *
 * The Trie allows us to walk through the string character by
 * character and stop as soon as no transformation string can
 * match.
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(M³ + N * Lmax)
 * Space Complexity: O(M² + M * Lmax + N)
 */

var minimumCost = function (source, target, original, changed, cost) {
  const n = source.length;

  const all = new Set();
  let maxLen = 0;

  for (let i = 0; i < original.length; i++) {
    all.add(original[i]);
    all.add(changed[i]);
    maxLen = Math.max(maxLen, original[i].length);
  }

  const arr = [...all];
  const m = arr.length;

  const id = new Map();
  for (let i = 0; i < m; i++) id.set(arr[i], i);

  const dist = Array.from({ length: m }, () => Array(m).fill(Infinity));

  for (let i = 0; i < m; i++) dist[i][i] = 0;

  for (let i = 0; i < original.length; i++) {
    const u = id.get(original[i]);
    const v = id.get(changed[i]);
    dist[u][v] = Math.min(dist[u][v], cost[i]);
  }

  for (let k = 0; k < m; k++) {
    for (let i = 0; i < m; i++) {
      for (let j = 0; j < m; j++) {
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }

  class TrieNode {
    constructor() {
      this.next = {};
      this.wordId = -1;
    }
  }

  function insert(root, word) {
    let node = root;
    for (let ch of word) {
      if (!node.next[ch]) node.next[ch] = new TrieNode();
      node = node.next[ch];
    }
    node.wordId = id.get(word);
  }

  const trieS = new TrieNode();
  const trieT = new TrieNode();

  for (let s of all) {
    insert(trieS, s);
    insert(trieT, s);
  }

  const dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;

  for (let i = 0; i < n; i++) {
    if (dp[i] === Infinity) continue;

    if (source[i] === target[i]) {
      dp[i + 1] = Math.min(dp[i + 1], dp[i]);
    }

    let nodeS = trieS;
    let nodeT = trieT;

    for (let len = 1; len <= maxLen && i + len <= n; len++) {
      const chS = source[i + len - 1];
      const chT = target[i + len - 1];

      nodeS = nodeS.next[chS];
      nodeT = nodeT.next[chT];

      if (!nodeS || !nodeT) break;

      if (nodeS.wordId !== -1 && nodeT.wordId !== -1) {
        const u = nodeS.wordId;
        const v = nodeT.wordId;

        if (dist[u][v] !== Infinity) {
          dp[i + len] = Math.min(dp[i + len], dp[i] + dist[u][v]);
        }
      }
    }
  }

  return dp[n] === Infinity ? -1 : dp[n];
};
