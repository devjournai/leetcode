/**
 * Ipo
 * Intuition: Always start the affordable project with the largest profit. Sorting by capital unlocks projects as wealth grows; a max-heap of profits picks the best among those currently affordable.
 * Approach: 1. Pair `[capital, profit]` into `projectDetails` and sort by capital. 2. For up to `k` picks, push every project with capital ≤ `currentCapital` onto a max-heap (`addProfitToQueue`). 3. If the heap is empty, stop; else `extractMaxProfit` and add it to `currentCapital`.
 * Dry Run: k=2, w=0, profits=[1,2,3], capital=[0,1,1].
 *   - Affordable at 0: profit 1. Pick 1 → capital=1.
 *   - Affordable: profits 2 and 3. Pick 3 → capital=4. Return 4.
 * Time Complexity: O((N + K) log N)
 * Space Complexity: O(N)
 */
var findMaximizedCapital = function (k, w, profits, capital) {
  const totalProjectsCount = profits.length;

  const projectDetails = new Array(totalProjectsCount);
  for (
    let projectCreationCounter = 0;
    projectCreationCounter < totalProjectsCount;
    projectCreationCounter++
  ) {
    projectDetails[projectCreationCounter] = [
      capital[projectCreationCounter],
      profits[projectCreationCounter],
    ];
  }

  projectDetails.sort((firstItem, secondItem) => firstItem[0] - secondItem[0]);

  const maxProfitPriorityQueue = [];

  function addProfitToQueue(incomingProfit) {
    maxProfitPriorityQueue.push(incomingProfit);
    let currentPosition = maxProfitPriorityQueue.length - 1;
    while (currentPosition > 0) {
      const parentPosition = Math.floor((currentPosition - 1) / 2);
      if (
        maxProfitPriorityQueue[parentPosition] >=
        maxProfitPriorityQueue[currentPosition]
      ) {
        break;
      }
      let tempSwap = maxProfitPriorityQueue[parentPosition];
      maxProfitPriorityQueue[parentPosition] =
        maxProfitPriorityQueue[currentPosition];
      maxProfitPriorityQueue[currentPosition] = tempSwap;
      currentPosition = parentPosition;
    }
  }

  function extractMaxProfit() {
    if (maxProfitPriorityQueue.length === 0) {
      return null;
    }
    const extractedTop = maxProfitPriorityQueue[0];
    const lastElementValue = maxProfitPriorityQueue.pop();

    if (maxProfitPriorityQueue.length > 0) {
      maxProfitPriorityQueue[0] = lastElementValue;
      let rootIndex = 0;
      while (true) {
        let leftChildrenIndex = 2 * rootIndex + 1;
        let rightChildrenIndex = 2 * rootIndex + 2;
        let maxChildIndex = rootIndex;

        if (
          leftChildrenIndex < maxProfitPriorityQueue.length &&
          maxProfitPriorityQueue[leftChildrenIndex] >
            maxProfitPriorityQueue[maxChildIndex]
        ) {
          maxChildIndex = leftChildrenIndex;
        }
        if (
          rightChildrenIndex < maxProfitPriorityQueue.length &&
          maxProfitPriorityQueue[rightChildrenIndex] >
            maxProfitPriorityQueue[maxChildIndex]
        ) {
          maxChildIndex = rightChildrenIndex;
        }

        if (maxChildIndex === rootIndex) {
          break;
        }
        let anotherTempSwap = maxProfitPriorityQueue[rootIndex];
        maxProfitPriorityQueue[rootIndex] =
          maxProfitPriorityQueue[maxChildIndex];
        maxProfitPriorityQueue[maxChildIndex] = anotherTempSwap;
        rootIndex = maxChildIndex;
      }
    }
    return extractedTop;
  }

  let projectReadPointer = 0;
  let remainingProjectsToPick = k;
  let currentCapital = w;

  while (remainingProjectsToPick > 0) {
    while (
      projectReadPointer < totalProjectsCount &&
      projectDetails[projectReadPointer][0] <= currentCapital
    ) {
      addProfitToQueue(projectDetails[projectReadPointer][1]);
      projectReadPointer++;
    }

    if (maxProfitPriorityQueue.length === 0) {
      return currentCapital;
    }

    let pickedProfit = extractMaxProfit();
    currentCapital += pickedProfit;
    remainingProjectsToPick--;
  }

  return currentCapital;
};
