/**
 * The Number Of The Smallest Unoccupied Chair
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
class MinChairPriorityQueue {
  constructor() {
    this.queueElements = [];
  }

  getParentPosition(currentPosition) {
    return Math.floor((currentPosition - 1) / 2);
  }

  getLeftChildPosition(currentPosition) {
    return 2 * currentPosition + 1;
  }

  getRightChildPosition(currentPosition) {
    return 2 * currentPosition + 2;
  }

  existsParent(currentPosition) {
    return this.getParentPosition(currentPosition) >= 0;
  }

  existsLeftChild(currentPosition) {
    return (
      this.getLeftChildPosition(currentPosition) < this.queueElements.length
    );
  }

  existsRightChild(currentPosition) {
    return (
      this.getRightChildPosition(currentPosition) < this.queueElements.length
    );
  }

  fetchParentValue(currentPosition) {
    return this.queueElements[this.getParentPosition(currentPosition)];
  }

  fetchLeftChildValue(currentPosition) {
    return this.queueElements[this.getLeftChildPosition(currentPosition)];
  }

  fetchRightChildValue(currentPosition) {
    return this.queueElements[this.getRightChildPosition(currentPosition)];
  }

  exchangeValues(indexA, indexB) {
    const temporaryStorage = this.queueElements[indexA];
    this.queueElements[indexA] = this.queueElements[indexB];
    this.queueElements[indexB] = temporaryStorage;
  }

  addChair(chairIdentifier) {
    this.queueElements.push(chairIdentifier);
    this.bubbleUp();
  }

  removeSmallestChair() {
    if (this.queueElements.length === 0) return null;
    if (this.queueElements.length === 1) return this.queueElements.pop();

    const smallestChair = this.queueElements[0];
    this.queueElements[0] = this.queueElements.pop();
    this.bubbleDown();
    return smallestChair;
  }

  isChairQueueEmpty() {
    return this.queueElements.length === 0;
  }

  bubbleUp() {
    let currentElementIndex = this.queueElements.length - 1;
    while (
      this.existsParent(currentElementIndex) &&
      this.fetchParentValue(currentElementIndex) >
        this.queueElements[currentElementIndex]
    ) {
      this.exchangeValues(
        this.getParentPosition(currentElementIndex),
        currentElementIndex,
      );
      currentElementIndex = this.getParentPosition(currentElementIndex);
    }
  }

  bubbleDown() {
    let currentElementIndex = 0;
    while (this.existsLeftChild(currentElementIndex)) {
      let minimumChildIndex = this.getLeftChildPosition(currentElementIndex);
      if (
        this.existsRightChild(currentElementIndex) &&
        this.fetchRightChildValue(currentElementIndex) <
          this.fetchLeftChildValue(currentElementIndex)
      ) {
        minimumChildIndex = this.getRightChildPosition(currentElementIndex);
      }

      if (
        this.queueElements[currentElementIndex] <
        this.queueElements[minimumChildIndex]
      ) {
        break;
      } else {
        this.exchangeValues(currentElementIndex, minimumChildIndex);
      }
      currentElementIndex = minimumChildIndex;
    }
  }
}

var smallestChair = function (timeIntervals, desiredFriendId) {
  const chronologicalOccurrences = [];

  timeIntervals.forEach((intervalEntry, friendParticipantId) => {
    chronologicalOccurrences.push([
      intervalEntry[0],
      "arrival",
      friendParticipantId,
    ]);
    chronologicalOccurrences.push([
      intervalEntry[1],
      "departure",
      friendParticipantId,
    ]);
  });

  chronologicalOccurrences.sort((occasionOne, occasionTwo) => {
    const timeDifference = occasionOne[0] - occasionTwo[0];
    if (timeDifference !== 0) {
      return timeDifference;
    }
    return occasionOne[1] === "departure" ? -1 : 1;
  });

  const freeChairsMinHeap = new MinChairPriorityQueue();
  const takenChairMapping = new Map();
  let nextAvailableChairNumber = 0;

  for (let i = 0; i < chronologicalOccurrences.length; i++) {
    const currentOccurrence = chronologicalOccurrences[i];
    const eventMoment = currentOccurrence[0];
    const actionType = currentOccurrence[1];
    const personIdentifier = currentOccurrence[2];

    if (actionType === "departure") {
      const chairPosition = takenChairMapping.get(personIdentifier);
      takenChairMapping.delete(personIdentifier);
      freeChairsMinHeap.addChair(chairPosition);
    } else if (actionType === "arrival") {
      let assignedChairPosition;
      if (!freeChairsMinHeap.isChairQueueEmpty()) {
        assignedChairPosition = freeChairsMinHeap.removeSmallestChair();
      } else {
        assignedChairPosition = nextAvailableChairNumber++;
      }

      takenChairMapping.set(personIdentifier, assignedChairPosition);

      if (personIdentifier === desiredFriendId) {
        return assignedChairPosition;
      }
    }
  }
};
