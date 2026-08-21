/**
 * Maximum Average Pass Ratio
 * Intuition: Each extra student should go to the class with the largest increase in pass ratio, (p+1)/(t+1) - p/t. A max-heap of those gains assigns students greedily.
 * Approach: 1. `calculateRatioGain` and heap helpers manage `passRatioHeap` of [gain, pass, total]. 2. Build the heap from all classes. 3. `extraStudents` times extract max, add one student, reinsert with new gain. 4. Average the final pass ratios.
 * Dry Run: classes = [[1,2],[3,5],[2,2]], extraStudents = 2.
 *   - [1,2] has the biggest gain; both extras go there → ratios 0.75, 0.6, 1.0, average 0.78333.
 * Time Complexity: O(N + E log N)
 * Space Complexity: O(N)
 */
var maxAverageRatio = function (classes, extraStudents) {
  const passRatioHeap = [];

  const calculateRatioGain = (currentPassed, currentTotal) => {
    return (
      (currentPassed + 1) / (currentTotal + 1) - currentPassed / currentTotal
    );
  };

  const heapifyDown = (siftIndex) => {
    const leftChildIndex = 2 * siftIndex + 1;
    const rightChildIndex = 2 * siftIndex + 2;
    let greatestIndex = siftIndex;

    if (
      leftChildIndex < passRatioHeap.length &&
      passRatioHeap[leftChildIndex][0] > passRatioHeap[greatestIndex][0]
    ) {
      greatestIndex = leftChildIndex;
    }

    if (
      rightChildIndex < passRatioHeap.length &&
      passRatioHeap[rightChildIndex][0] > passRatioHeap[greatestIndex][0]
    ) {
      greatestIndex = rightChildIndex;
    }

    if (greatestIndex !== siftIndex) {
      const tempVal = passRatioHeap[siftIndex];
      passRatioHeap[siftIndex] = passRatioHeap[greatestIndex];
      passRatioHeap[greatestIndex] = tempVal;
      heapifyDown(greatestIndex);
    }
  };

  const buildHeap = () => {
    for (
      let initialHeapIndex = Math.floor(passRatioHeap.length / 2) - 1;
      initialHeapIndex >= 0;
      initialHeapIndex--
    ) {
      heapifyDown(initialHeapIndex);
    }
  };

  const extractMaxElement = () => {
    const maxElementValue = passRatioHeap[0];
    const lastElementValue = passRatioHeap.pop();

    if (passRatioHeap.length > 0) {
      passRatioHeap[0] = lastElementValue;
      heapifyDown(0);
    }

    return maxElementValue;
  };

  const insertElement = (newHeapEntry) => {
    passRatioHeap.push(newHeapEntry);

    let currentIndexPosition = passRatioHeap.length - 1;
    let parentPosition = Math.floor((currentIndexPosition - 1) / 2);

    while (
      currentIndexPosition > 0 &&
      passRatioHeap[currentIndexPosition][0] > passRatioHeap[parentPosition][0]
    ) {
      const tempEntry = passRatioHeap[currentIndexPosition];
      passRatioHeap[currentIndexPosition] = passRatioHeap[parentPosition];
      passRatioHeap[parentPosition] = tempEntry;
      currentIndexPosition = parentPosition;
      parentPosition = Math.floor((currentIndexPosition - 1) / 2);
    }
  };

  for (let classItemIdx = 0; classItemIdx < classes.length; classItemIdx++) {
    const currentClassArr = classes[classItemIdx];
    const initialPassCount = currentClassArr[0];
    const initialTotalCount = currentClassArr[1];
    const initialProfitMetric = calculateRatioGain(
      initialPassCount,
      initialTotalCount
    );
    passRatioHeap.push([
      initialProfitMetric,
      initialPassCount,
      initialTotalCount,
    ]);
  }

  buildHeap();

  for (
    let studentAllocationIteration = 0;
    studentAllocationIteration < extraStudents;
    studentAllocationIteration++
  ) {
    const extractedClassData = extractMaxElement();
    const currentClassPass = extractedClassData[1];
    const currentClassTotal = extractedClassData[2];

    const updatedClassPass = currentClassPass + 1;
    const updatedClassTotal = currentClassTotal + 1;
    const updatedProfitMetric = calculateRatioGain(
      updatedClassPass,
      updatedClassTotal
    );
    insertElement([updatedProfitMetric, updatedClassPass, updatedClassTotal]);
  }

  let totalPassRatioSum = 0;
  for (
    let finalRatioIdx = 0;
    finalRatioIdx < passRatioHeap.length;
    finalRatioIdx++
  ) {
    const classElement = passRatioHeap[finalRatioIdx];
    const finalPassVal = classElement[1];
    const finalTotalVal = classElement[2];
    totalPassRatioSum += finalPassVal / finalTotalVal;
  }

  return totalPassRatioSum / classes.length;
};
