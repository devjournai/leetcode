/**
 * Campus Bikes
 * Intuition: Greedy matching by (Manhattan distance, worker index, bike index) assigns the globally closest unused pair first.
 * Approach: 1. Emit every worker-bike triple (dist, worker, bike). 2. Sort by those three keys. 3. Scan; if both worker and bike are free, assign and mark taken. 4. Stop after all workers are paired.
 * Dry Run: workers=[[0,0],[2,1]], bikes=[[1,2],[3,3]].
 *   - Distances: w0-b0=3, w0-b1=6, w1-b0=2, w1-b1=3. First assign w1->b0, then w0->b1. [1,0].
 * Time Complexity: O(N * M * log(N * M))
 * Space Complexity: O(N * M)
 */
var assignBikes = function (workers, bikes) {
  const distancePairs = [];

  let workerIdxOuter = 0;
  while (workerIdxOuter < workers.length) {
    let bikeIdxInner = 0;
    while (bikeIdxInner < bikes.length) {
      const currentWorkerCoords = workers[workerIdxOuter];
      const currentBikeCoords = bikes[bikeIdxInner];

      const xDiff = Math.abs(currentWorkerCoords[0] - currentBikeCoords[0]);
      const yDiff = Math.abs(currentWorkerCoords[1] - currentBikeCoords[1]);
      const manhattanDist = xDiff + yDiff;

      distancePairs.push([manhattanDist, workerIdxOuter, bikeIdxInner]);
      bikeIdxInner++;
    }
    workerIdxOuter++;
  }

  distancePairs.sort((pairA, pairB) => {
    if (pairA[0] !== pairB[0]) return pairA[0] - pairB[0];
    if (pairA[1] !== pairB[1]) return pairA[1] - pairB[1];
    return pairA[2] - pairB[2];
  });

  const assignedBikeIndices = new Array(workers.length);
  const takenBikes = new Set();
  const workersPaired = new Set();
  let pairedCount = 0;

  for (let pairListIdx = 0; pairListIdx < distancePairs.length; pairListIdx++) {
    if (pairedCount === workers.length) {
      break;
    }

    const currentPairDetail = distancePairs[pairListIdx];
    const workerIdentity = currentPairDetail[1];
    const bikeIdentity = currentPairDetail[2];

    if (!workersPaired.has(workerIdentity) && !takenBikes.has(bikeIdentity)) {
      assignedBikeIndices[workerIdentity] = bikeIdentity;
      workersPaired.add(workerIdentity);
      takenBikes.add(bikeIdentity);
      pairedCount++;
    }
  }

  return assignedBikeIndices;
};
