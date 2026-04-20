/**
 * The Skyline Problem
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
*/
class MaxHeightHeap {
    constructor() {
        this.heapInternalArray = [];
    }

    swapElementsInPlace(firstIndex, secondIndex) {
        [this.heapInternalArray[firstIndex], this.heapInternalArray[secondIndex]] = [this.heapInternalArray[secondIndex], this.heapInternalArray[firstIndex]];
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

    checkHasParent(childPosition) {
        return this.retrieveParentIndex(childPosition) >= 0;
    }

    checkHasLeftChild(parentPosition) {
        return this.retrieveLeftChildIndex(parentPosition) < this.heapInternalArray.length;
    }

    checkHasRightChild(parentPosition) {
        return this.retrieveRightChildIndex(parentPosition) < this.heapInternalArray.length;
    }

    getValueOfParent(childPosition) {
        return this.heapInternalArray[this.retrieveParentIndex(childPosition)];
    }

    getValueOfLeftChild(parentPosition) {
        return this.heapInternalArray[this.retrieveLeftChildIndex(parentPosition)];
    }

    getValueOfRightChild(parentPosition) {
        return this.heapInternalArray[this.retrieveRightChildIndex(parentPosition)];
    }

    addValue(incomingItem) {
        this.heapInternalArray.push(incomingItem);
        this.bubbleUpElement();
    }

    peekTopValue() {
        if (this.heapInternalArray.length === 0) {
            return undefined;
        }
        return this.heapInternalArray[0];
    }

    extractTopValue() {
        if (this.heapInternalArray.length === 0) {
            return undefined;
        }
        if (this.heapInternalArray.length === 1) {
            return this.heapInternalArray.pop();
        }

        const highestElement = this.heapInternalArray[0];
        this.heapInternalArray[0] = this.heapInternalArray.pop();
        this.bubbleDownElement();
        return highestElement;
    }

    bubbleUpElement() {
        let currentElementIndex = this.heapInternalArray.length - 1;
        while (this.checkHasParent(currentElementIndex) && this.getValueOfParent(currentElementIndex) < this.heapInternalArray[currentElementIndex]) {
            this.swapElementsInPlace(this.retrieveParentIndex(currentElementIndex), currentElementIndex);
            currentElementIndex = this.retrieveParentIndex(currentElementIndex);
        }
    }

    bubbleDownElement() {
        let currentElementIndex = 0;
        while (this.checkHasLeftChild(currentElementIndex)) {
            let largerChildPosition = this.retrieveLeftChildIndex(currentElementIndex);
            if (this.checkHasRightChild(currentElementIndex) && this.getValueOfRightChild(currentElementIndex) > this.getValueOfLeftChild(currentElementIndex)) {
                largerChildPosition = this.retrieveRightChildIndex(currentElementIndex);
            }

            if (this.heapInternalArray[currentElementIndex] < this.heapInternalArray[largerChildPosition]) {
                this.swapElementsInPlace(currentElementIndex, largerChildPosition);
            } else {
                break;
            }
            currentElementIndex = largerChildPosition;
        }
    }

    isHeapEmpty() {
        return this.heapInternalArray.length === 0;
    }
}

var getSkyline = function (buildings) {
    const outputPoints = [];
    const eventList = [];

    for (const buildingEntry of buildings) {
        const [leftCoordinate, rightCoordinate, buildingHeight] = buildingEntry;
        eventList.push([leftCoordinate, -buildingHeight]);
        eventList.push([rightCoordinate, buildingHeight]);
    }

    eventList.sort((eventA, eventB) => {
        if (eventA[0] !== eventB[0]) {
            return eventA[0] - eventB[0];
        }
        return eventA[1] - eventB[1];
    });

    const currentMaxHeightHeap = new MaxHeightHeap();
    const heightFrequencyMap = new Map();
    let previousYCoordinate = 0;

    for (let currentEventIndex = 0; currentEventIndex < eventList.length; currentEventIndex++) {
        const [eventXCoordinate, eventHeightValue] = eventList[currentEventIndex];

        if (eventHeightValue < 0) {
            const actualHeight = -eventHeightValue;
            heightFrequencyMap.set(actualHeight, (heightFrequencyMap.get(actualHeight) || 0) + 1);
            currentMaxHeightHeap.addValue(actualHeight);
        } else {
            const actualHeight = eventHeightValue;
            heightFrequencyMap.set(actualHeight, heightFrequencyMap.get(actualHeight) - 1);
        }

        while (!currentMaxHeightHeap.isHeapEmpty() && heightFrequencyMap.get(currentMaxHeightHeap.peekTopValue()) === 0) {
            currentMaxHeightHeap.extractTopValue();
        }

        const currentHighestHeight = currentMaxHeightHeap.isHeapEmpty() ? 0 : currentMaxHeightHeap.peekTopValue();

        if (currentHighestHeight !== previousYCoordinate) {
            outputPoints.push([eventXCoordinate, currentHighestHeight]);
            previousYCoordinate = currentHighestHeight;
        }
    }

    return outputPoints;
};