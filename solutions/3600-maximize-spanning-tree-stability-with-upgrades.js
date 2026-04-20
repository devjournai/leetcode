/**
 * Maximize Spanning Tree Stability with Upgrades
 * Time Complexity: O(E log E * log(MaxStability))
 * Space Complexity: O(N + E)
 */

class DSU {
  constructor(n) {
    this.parent = Array(n)
      .fill(0)
      .map((_, i) => i);
  }

  find(i) {
    if (this.parent[i] === i) {
      return i;
    }
    return (this.parent[i] = this.find(this.parent[i]));
  }

  union(i, j) {
    const rootI = this.find(i);
    const rootJ = this.find(j);

    if (rootI !== rootJ) {
      this.parent[rootJ] = rootI;
      return true;
    }
    return false;
  }
}

function canAchieveStability(targetStability, n, edges, k) {
  const dsu = new DSU(n);
  let edgesUsed = 0;
  let upgradesNeeded = 0;

  for (const [u, v, si, musti] of edges) {
    if (musti === 1) {
      if (si < targetStability) {
        return false;
      }
      if (dsu.union(u, v)) {
        edgesUsed++;
      } else {
        return false;
      }
    }
  }

  const candidateOptionalEdges = [];
  for (const [u, v, si, musti] of edges) {
    if (musti === 0) {
      if (si >= targetStability) {
        candidateOptionalEdges.push([u, v, 0]);
      } else if (si * 2 >= targetStability) {
        candidateOptionalEdges.push([u, v, 1]);
      }
    }
  }

  candidateOptionalEdges.sort((a, b) => a[2] - b[2]);

  for (const [u, v, cost] of candidateOptionalEdges) {
    if (dsu.union(u, v)) {
      edgesUsed++;
      upgradesNeeded += cost;
      if (upgradesNeeded > k) {
        return false;
      }
    }
  }

  return edgesUsed === n - 1;
}

var maxStability = function (n, edges, k) {
  let low = 1;
  let high = 200001;
  let maxAchievableStability = -1;

  while (low < high) {
    const mid = low + Math.floor((high - low) / 2);

    if (canAchieveStability(mid, n, edges, k)) {
      maxAchievableStability = mid;
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  return maxAchievableStability;
};
