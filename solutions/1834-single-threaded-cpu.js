/**
 * Single Threaded Cpu
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
class MinPriorityQueueStructure {
  constructor(
    comparisonRoutine = (firstVal, secondVal) => firstVal - secondVal,
  ) {
    this.heapElements = [];
    this.comparisonRoutine = comparisonRoutine;
  }

  getParentPosition(currentPos) {
    return Math.floor((currentPos - 1) / 2);
  }
  getLeftPupilPosition(currentPos) {
    return 2 * currentPos + 1;
  }
  getRightPupilPosition(currentPos) {
    return 2 * currentPos + 2;
  }

  hasSuperio(currentPos) {
    return this.getParentPosition(currentPos) >= 0;
  }
  hasLeftSuccessor(currentPos) {
    return this.getLeftPupilPosition(currentPos) < this.heapElements.length;
  }
  hasRightSuccessor(currentPos) {
    return this.getRightPupilPosition(currentPos) < this.heapElements.length;
  }

  getSuperio(currentPos) {
    return this.heapElements[this.getParentPosition(currentPos)];
  }
  getLeftSuccessor(currentPos) {
    return this.heapElements[this.getLeftPupilPosition(currentPos)];
  }
  getRightSuccessor(currentPos) {
    return this.heapElements[this.getRightPupilPosition(currentPos)];
  }

  exchangePositions(posOne, posTwo) {
    [this.heapElements[posOne], this.heapElements[posTwo]] = [
      this.heapElements[posTwo],
      this.heapElements[posOne],
    ];
  }

  currentSize() {
    return this.heapElements.length;
  }

  topElement() {
    if (this.heapElements.length === 0) return null;
    return this.heapElements[0];
  }

  insertElement(itemToInsert) {
    this.heapElements.push(itemToInsert);
    this.bubbleUp();
  }

  extractMin() {
    if (this.heapElements.length === 0) return null;
    if (this.heapElements.length === 1) return this.heapElements.pop();

    const firstElementValue = this.heapElements[0];
    this.heapElements[0] = this.heapElements.pop();
    this.bubbleDown();
    return firstElementValue;
  }

  bubbleUp() {
    let elementIndexCurrent = this.heapElements.length - 1;
    while (
      this.hasSuperio(elementIndexCurrent) &&
      this.comparisonRoutine(
        this.heapElements[elementIndexCurrent],
        this.getSuperio(elementIndexCurrent),
      ) < 0
    ) {
      this.exchangePositions(
        elementIndexCurrent,
        this.getParentPosition(elementIndexCurrent),
      );
      elementIndexCurrent = this.getParentPosition(elementIndexCurrent);
    }
  }

  bubbleDown() {
    let elementIndexCurrent = 0;
    while (this.hasLeftSuccessor(elementIndexCurrent)) {
      let smallerSubchildIndex = this.getLeftPupilPosition(elementIndexCurrent);
      if (
        this.hasRightSuccessor(elementIndexCurrent) &&
        this.comparisonRoutine(
          this.getRightSuccessor(elementIndexCurrent),
          this.getLeftSuccessor(elementIndexCurrent),
        ) < 0
      ) {
        smallerSubchildIndex = this.getRightPupilPosition(elementIndexCurrent);
      }

      if (
        this.comparisonRoutine(
          this.heapElements[elementIndexCurrent],
          this.heapElements[smallerSubchildIndex],
        ) < 0
      ) {
        break;
      } else {
        this.exchangePositions(elementIndexCurrent, smallerSubchildIndex);
      }
      elementIndexCurrent = smallerSubchildIndex;
    }
  }
}

var getOrder = function (incomingTasks) {
  const totalTaskCount = incomingTasks.length;

  const augmentedTaskDetails = incomingTasks
    .map((taskInfo, idx) => ({
      enqueueTimestamp: taskInfo[0],
      processingDuration: taskInfo[1],
      originalIndex: idx,
    }))
    .sort(
      (firstItem, secondItem) =>
        firstItem.enqueueTimestamp - secondItem.enqueueTimestamp,
    );

  const executionSequence = [];
  const activeTasksPriorityQueue = new MinPriorityQueueStructure(
    (taskA, taskB) =>
      taskA.processingDuration - taskB.processingDuration ||
      taskA.originalIndex - taskB.originalIndex,
  );
  let currentCpuMoment = augmentedTaskDetails[0].enqueueTimestamp;
  let nextTaskToProcessIndex = 0;

  while (executionSequence.length < totalTaskCount) {
    while (
      nextTaskToProcessIndex < totalTaskCount &&
      augmentedTaskDetails[nextTaskToProcessIndex].enqueueTimestamp <=
        currentCpuMoment
    ) {
      activeTasksPriorityQueue.insertElement(
        augmentedTaskDetails[nextTaskToProcessIndex],
      );
      nextTaskToProcessIndex++;
    }

    if (activeTasksPriorityQueue.currentSize() > 0) {
      const chosenTask = activeTasksPriorityQueue.extractMin();
      executionSequence.push(chosenTask.originalIndex);
      currentCpuMoment += chosenTask.processingDuration;
    } else {
      if (nextTaskToProcessIndex < totalTaskCount) {
        currentCpuMoment =
          augmentedTaskDetails[nextTaskToProcessIndex].enqueueTimestamp;
      }
    }
  }

  return executionSequence;
};
