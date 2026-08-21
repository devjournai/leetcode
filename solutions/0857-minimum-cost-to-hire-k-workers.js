/**
 * Minimum Cost To Hire K Workers
 * Intuition: Payment is quality_sum * max(wage_i/quality_i) among the k workers. Sort by ratio ascending; among workers with ratio ≤ current, keep the k smallest qualities via a max-heap.
 * Approach: 1. Map `{ratio, qualityValue}`, sort by ratio. 2. Enqueue quality, add to sum; if heap > k dequeue largest quality. 3. When size==k, cost = sum * current.ratio, track min. 4. Return min.
 * Dry Run: quality=[10,20,5], wage=[70,50,30], k=2. Ratios 2.5,6,7. Window (20,5)*6=150; drop 20 add 10 → (5,10)*7=105. Min 105.
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
