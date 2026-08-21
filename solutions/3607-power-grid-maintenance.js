/**
 * Power Grid Maintenance
 * Intuition: Connectivity never changes when a station goes offline, so union-find the grids once. Type-1 answers the station itself if online, else the smallest still-online id in its component.
 * Approach: 1. Union connections. 2. Group station ids by root and sort each group. 3. online flags start true; a pointer skips newly offline ids from the front. 4. [1,x] returns x or the next online id or -1; [2,x] marks x offline.
 * Dry Run: stations 1–5 in one grid. [1,3]→3; [2,1]; [1,1]→2; [2,2]; [1,2]→3.
 * Time Complexity: O(c log c + q)
 * Space Complexity: O(c)
 */
var processQueries = function (c, connections, queries) {
  const parent = Array.from({ length: c + 1 }, (_, index) => index);

  const find = (node) => {
    if (parent[node] !== node) {
      parent[node] = find(parent[node]);
    }
    return parent[node];
  };

  for (const [left, right] of connections) {
    const rootLeft = find(left);
    const rootRight = find(right);
    if (rootLeft !== rootRight) {
      parent[rootLeft] = rootRight;
    }
  }

  const groups = Array.from({ length: c + 1 }, () => []);
  for (let station = 1; station <= c; station++) {
    groups[find(station)].push(station);
  }

  const cursor = Array(c + 1).fill(0);
  const online = Array(c + 1).fill(true);
  const answers = [];

  for (const [type, station] of queries) {
    if (type === 2) {
      online[station] = false;
      continue;
    }

    if (online[station]) {
      answers.push(station);
      continue;
    }

    const root = find(station);
    const members = groups[root];
    while (cursor[root] < members.length && !online[members[cursor[root]]]) {
      cursor[root]++;
    }
    answers.push(cursor[root] < members.length ? members[cursor[root]] : -1);
  }

  return answers;
};
