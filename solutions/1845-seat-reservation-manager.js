/**
 * Seat Reservation Manager
 * Time Complexity: O(log N)
 * Space Complexity: O(N)
 */
class MinHeap {
  constructor() {
    this.heapContent = [];
  }

  retrieveParentIndex(childPosition) {
    return Math.floor((childPosition - 1) / 2);
  }

  retrieveLeftChildIndex(parentPosition) {
    return 2 * parentPosition + 1;
  }

  retrieveRightChildIndex(parentPosition) {
    return 2 * parentPosition + 2;
  }

  hasParentNode(currentPosition) {
    return this.retrieveParentIndex(currentPosition) >= 0;
  }

  hasLeftChildNode(currentPosition) {
    return (
      this.retrieveLeftChildIndex(currentPosition) < this.heapContent.length
    );
  }

  hasRightChildNode(currentPosition) {
    return (
      this.retrieveRightChildIndex(currentPosition) < this.heapContent.length
    );
  }

  getParentValue(currentPosition) {
    return this.heapContent[this.retrieveParentIndex(currentPosition)];
  }

  getLeftChildValue(currentPosition) {
    return this.heapContent[this.retrieveLeftChildIndex(currentPosition)];
  }

  getRightChildValue(currentPosition) {
    return this.heapContent[this.retrieveRightChildIndex(currentPosition)];
  }

  exchangeElements(positionA, positionB) {
    const valueHolder = this.heapContent[positionA];
    this.heapContent[positionA] = this.heapContent[positionB];
    this.heapContent[positionB] = valueHolder;
  }

  peekSmallest() {
    if (this.heapContent.length === 0) {
      return undefined;
    }
    return this.heapContent[0];
  }

  extractSmallest() {
    if (this.heapContent.length === 0) {
      return undefined;
    }
    if (this.heapContent.length === 1) {
      return this.heapContent.pop();
    }

    const smallestElement = this.heapContent[0];
    this.heapContent[0] = this.heapContent.pop();
    this.heapifyDownFromTop();
    return smallestElement;
  }

  insertNewValue(itemElement) {
    this.heapContent.push(itemElement);
    this.heapifyUpToRoot();
  }

  heapifyUpToRoot() {
    let currentElementIndex = this.heapContent.length - 1;
    while (
      this.hasParentNode(currentElementIndex) &&
      this.getParentValue(currentElementIndex) >
        this.heapContent[currentElementIndex]
    ) {
      this.exchangeElements(
        this.retrieveParentIndex(currentElementIndex),
        currentElementIndex,
      );
      currentElementIndex = this.retrieveParentIndex(currentElementIndex);
    }
  }

  heapifyDownFromTop() {
    let currentElementIndex = 0;
    while (this.hasLeftChildNode(currentElementIndex)) {
      let smallerChildPosition =
        this.retrieveLeftChildIndex(currentElementIndex);
      if (
        this.hasRightChildNode(currentElementIndex) &&
        this.getRightChildValue(currentElementIndex) <
          this.getLeftChildValue(currentElementIndex)
      ) {
        smallerChildPosition =
          this.retrieveRightChildIndex(currentElementIndex);
      }

      if (
        this.heapContent[currentElementIndex] <
        this.heapContent[smallerChildPosition]
      ) {
        break;
      } else {
        this.exchangeElements(currentElementIndex, smallerChildPosition);
      }
      currentElementIndex = smallerChildPosition;
    }
  }

  isHeapStructureEmpty() {
    return this.heapContent.length === 0;
  }
}

var SeatManager = function (n) {
  this.totalSeatsCount = n;
  this.nextConsecutiveAvailable = 1;
  this.previouslyUnreservedContainer = new MinHeap();
};

SeatManager.prototype.reserve = function () {
  let reservedSeatAllocation;
  if (
    !this.previouslyUnreservedContainer.isHeapStructureEmpty() &&
    this.previouslyUnreservedContainer.peekSmallest() <
      this.nextConsecutiveAvailable
  ) {
    reservedSeatAllocation =
      this.previouslyUnreservedContainer.extractSmallest();
  } else {
    reservedSeatAllocation = this.nextConsecutiveAvailable;
    this.nextConsecutiveAvailable++;
  }
  return reservedSeatAllocation;
};

SeatManager.prototype.unreserve = function (seatNumber) {
  this.previouslyUnreservedContainer.insertNewValue(seatNumber);
};
