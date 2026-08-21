/**
 * Checking Existence Of Edge Length Limited Paths II
 * Intuition: Offline 1697 as a class: for each distinct query limit, union all edges with weight < limit and cache that DSU so later queries with the same limit reuse it.
 * Approach: 1. Constructor sorts `orderedEdges` by weight. 2. `query`: if `distanceRestriction` unseen, build `CustomUnionFind`, unite edges with weight < limit, cache it. 3. Return `areConnected(start, end)`.
 * Dry Run: n=3, edges=[[0,1,2],[1,2,4]], query(0,2,5)
 * Union 0-1 (2) and 1-2 (4); 0 and 2 connected → true. query(0,2,3) unions only 0-1 → false.
 * Time Complexity: O(E log E + Q * E * α(N))
 * Space Complexity: O(E + Q * N)
 */
var DistanceLimitedPathsExist = function (n, edgeList) {
  this.totalNodes = n;
  this.orderedEdges = edgeList
    .slice()
    .sort(
      (firstEdgeDetails, secondEdgeDetails) =>
        firstEdgeDetails[2] - secondEdgeDetails[2]
    );
  this.limitToUnionFindMap = new Map();
  this.cachedLimits = new Set();
};

DistanceLimitedPathsExist.prototype.query = function (
  startNodeIdentifier,
  endNodeIdentifier,
  distanceRestriction
) {
  if (!this.cachedLimits.has(distanceRestriction)) {
    const currentUnionFindStructure = new CustomUnionFind(this.totalNodes);

    for (const singleEdgeDetail of this.orderedEdges) {
      const sourceVertex = singleEdgeDetail[0];
      const targetVertex = singleEdgeDetail[1];
      const edgeTraversalWeight = singleEdgeDetail[2];

      if (edgeTraversalWeight >= distanceRestriction) {
        break;
      }

      currentUnionFindStructure.uniteComponents(sourceVertex, targetVertex);
    }

    this.limitToUnionFindMap.set(
      distanceRestriction,
      currentUnionFindStructure
    );
    this.cachedLimits.add(distanceRestriction);
  }

  const fetchedUnionFinder = this.limitToUnionFindMap.get(distanceRestriction);
  return fetchedUnionFinder.areConnected(
    startNodeIdentifier,
    endNodeIdentifier
  );
};

class CustomUnionFind {
  constructor(initialCapacity) {
    this.representativeArray = Array.from(
      { length: initialCapacity },
      (_, itemIndex) => itemIndex
    );
    this.rankValueArray = new Array(initialCapacity).fill(0);
  }

  findRoot(itemToFind) {
    if (this.representativeArray[itemToFind] !== itemToFind) {
      this.representativeArray[itemToFind] = this.findRoot(
        this.representativeArray[itemToFind]
      );
    }
    return this.representativeArray[itemToFind];
  }

  uniteComponents(componentA, componentB) {
    const rootOfA = this.findRoot(componentA);
    const rootOfB = this.findRoot(componentB);

    if (rootOfA !== rootOfB) {
      if (this.rankValueArray[rootOfA] < this.rankValueArray[rootOfB]) {
        this.representativeArray[rootOfA] = rootOfB;
      } else if (this.rankValueArray[rootOfA] > this.rankValueArray[rootOfB]) {
        this.representativeArray[rootOfB] = rootOfA;
      } else {
        this.representativeArray[rootOfB] = rootOfA;
        this.rankValueArray[rootOfA]++;
      }
    }
  }

  areConnected(nodeFirst, nodeSecond) {
    return this.findRoot(nodeFirst) === this.findRoot(nodeSecond);
  }
}
