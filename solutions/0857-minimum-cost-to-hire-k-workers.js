/**
 * Minimum Cost To Hire K Workers
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var mincostToHireWorkers = function (quality, wage, k) {
  const allWorkers = quality
    .map((currentQuality, index) => ({
      ratio: wage[index] / currentQuality,
      qualityValue: currentQuality,
    }))
    .sort((workerA, workerB) => workerA.ratio - workerB.ratio);

  let minimumTotalCost = Infinity;
  let currentQualitiesSum = 0;
  const qualityHeap = new MaxPriorityQueue();

  for (const currentWorker of allWorkers) {
    qualityHeap.enqueue(currentWorker.qualityValue);
    currentQualitiesSum += currentWorker.qualityValue;

    let heapElementsCount = qualityHeap.size();
    if (heapElementsCount > k) {
      let removedHighestQuality = qualityHeap.dequeue().element;
      currentQualitiesSum -= removedHighestQuality;
    } else if (heapElementsCount === k) {
      let currentCalculatedCost = currentQualitiesSum * currentWorker.ratio;
      minimumTotalCost = Math.min(minimumTotalCost, currentCalculatedCost);
    }
  }

  return minimumTotalCost;
};
