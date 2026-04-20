/**
 * Minimum Cost to Convert String II
 * Time Complexity: O(M^3 + N * Lmax)
 * Space Complexity: O(M^2 + M * Lmax + N)
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

    const dist = Array.from({ length: m }, () =>
        Array(m).fill(Infinity)
    );

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
