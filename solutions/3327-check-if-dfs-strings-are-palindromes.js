/**
 * Check if DFS Strings Are Palindromes
 * Intuition: The DFS string of a node is the concatenation of its children's DFS strings followed by its own character. Building that string once and recording each node's [start, end] range lets Manacher answer palindrome queries in O(1).
 * Approach: 1. Build the tree from parent[]. 2. DFS from 0, recording start/end indices and appending s[u] after children. 3. Run Manacher on '#'.join('@' + dfsStr + '$'). 4. Substring [start, end] is a palindrome iff p[start + end + 2] >= length.
 * Dry Run: parent = [-1, 0, 0], s = "aab". DFS string = "baa". Node 0 covers whole "baa" (not palindrome). Node 1 covers "b". Node 2 covers "a".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var findAnswer = function (parent, s) {
  const n = parent.length;
  const tree = Array.from({ length: n }, () => []);
  const start = Array(n).fill(0);
  const end = Array(n).fill(0);
  const dfsChars = [];

  for (let node = 1; node < n; node++) {
    tree[parent[node]].push(node);
  }

  buildDfsString(tree, 0, 0, s, start, end, dfsChars);

  const transformed = joinWithDelimiter("@" + dfsChars.join("") + "$", "#");
  const palindromeRadii = manacher(transformed);
  const answers = Array(n);

  for (let node = 0; node < n; node++) {
    answers[node] = isPalindromeRange(start[node], end[node], palindromeRadii);
  }

  return answers;
};

function buildDfsString(tree, node, index, s, start, end, dfsChars) {
  start[node] = index;
  for (const child of tree[node]) {
    index = buildDfsString(tree, child, index, s, start, end, dfsChars);
  }
  end[node] = index;
  dfsChars.push(s[node]);
  return index + 1;
}

function manacher(text) {
  const radii = Array(text.length).fill(0);
  let center = 0;

  for (let index = 1; index < text.length - 1; index++) {
    const rightBoundary = center + radii[center];
    const mirrorIndex = center - (index - center);
    if (rightBoundary > index) {
      radii[index] = Math.min(rightBoundary - index, radii[mirrorIndex]);
    }
    while (text[index + 1 + radii[index]] === text[index - 1 - radii[index]]) {
      radii[index]++;
    }
    if (index + radii[index] > rightBoundary) {
      center = index;
    }
  }

  return radii;
}

function isPalindromeRange(rangeStart, rangeEnd, radii) {
  const length = rangeEnd - rangeStart + 1;
  const center = rangeStart + rangeEnd + 2;
  return radii[center] >= length;
}

function joinWithDelimiter(text, delimiter) {
  const parts = [];
  for (let index = 0; index < text.length - 1; index++) {
    parts.push(text[index], delimiter);
  }
  parts.push(text[text.length - 1]);
  return parts.join("");
}
