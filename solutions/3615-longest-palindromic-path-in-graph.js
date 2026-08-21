/**
 * Longest Palindromic Path in Graph
 * Intuition: n ≤ 14, so expand palindromes from odd/even centers with a bitmask of used nodes. Matching labels on both endpoints grow the palindrome by 2.
 * Approach: 1. Build the undirected graph. 2. dp(i,j,mask) = extra length by growing from ends i,j. 3. Try unused neighbors a of i and b of j with a≠b, unused, same label. 4. Start from every single node and every equal-label edge.
 * Dry Run: n = 3, path 0-1-2, labels "aba". Centers at node 1, grow to 0 and 2 because 'a'=='a' → length 3.
 * Time Complexity: O(n^4 * 2^n)
 * Space Complexity: O(n^2 * 2^n)
 */
var maxLen = function (n, edges, label) {
  const graph = Array.from({ length: n }, () => []);
  for (const [left, right] of edges) {
    graph[left].push(right);
    graph[right].push(left);
  }

  const memo = new Map();

  const grow = (left, right, mask) => {
    if (left > right) {
      return grow(right, left, mask);
    }
    const key = left + "," + right + "," + mask;
    if (memo.has(key)) {
      return memo.get(key);
    }

    let best = 0;
    for (const nextLeft of graph[left]) {
      const leftBit = 1 << nextLeft;
      if (mask & leftBit) {
        continue;
      }
      for (const nextRight of graph[right]) {
        const rightBit = 1 << nextRight;
        if (
          nextLeft === nextRight ||
          mask & rightBit ||
          label[nextLeft] !== label[nextRight]
        ) {
          continue;
        }
        best = Math.max(
          best,
          grow(nextLeft, nextRight, mask | leftBit | rightBit) + 2
        );
      }
    }

    memo.set(key, best);
    return best;
  };

  let answer = 0;
  for (let node = 0; node < n; node++) {
    answer = Math.max(answer, grow(node, node, 1 << node) + 1);
  }
  for (const [left, right] of edges) {
    if (label[left] === label[right]) {
      answer = Math.max(
        answer,
        grow(left, right, (1 << left) | (1 << right)) + 2
      );
    }
  }
  return answer;
};
