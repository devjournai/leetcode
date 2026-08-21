/**
 * Maximize Spanning Tree Stability with Upgrades
 * Intuition: Maximum min-edge spanning-tree strength is binary-searchable. Must-have edges cannot be upgraded; optional edges may double strength using up to k upgrades.
 * Approach: 1. Binary search targetStability. 2. check: union all must edges if each si >= target (fail on cycle or weak must-edge). 3. Collect optional edges with si >= target (cost 0) or 2*si >= target (cost 1), sort by cost, Kruskal until n-1 edges or upgrades exceed k. 4. Return the largest feasible mid, or -1.
 * Dry Run: n = 3, must edge 0-1 strength 5, optional 1-2 strength 3, k = 1, target 5. Optional 3*2 >= 5 uses 1 upgrade; tree of 2 edges succeeds.
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
