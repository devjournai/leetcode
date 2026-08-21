/**
 * Dinner Plate Stacks
 * Intuition: Keep an array of stacks of capacity C and a sorted list of indices that still have room. push uses the leftmost open index (or a new stack); pop uses the rightmost nonempty; popAtStack frees that index for future pushes.
 * Approach: 1. MinIndexTracker stores open indices, inserting in sorted order. 2. push pops an open index if any, else appends a new stack; if that stack is full, create another. 3. pop trims empty rightmost stacks then pops. 4. popAtStack pops stack i and records i as open.
 * Dry Run: capacity 2; push 1,2,3,4,5; popAtStack(0) returns 2; pop returns 5 then 4 then 3 then 1.
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
class MinIndexTracker {
  constructor() {
    this.dataElements = [];
  }

  checkEmpty() {
    return this.dataElements.length === 0;
  }

  fetchLast() {
    if (this.checkEmpty()) {
      return null;
    }
    return this.dataElements[this.dataElements.length - 1];
  }

  popLastElement() {
    if (this.checkEmpty()) {
      return null;
    }
    return this.dataElements.pop();
  }

  addElementAndMaintainSort(elementToInsert) {
    const auxiliaryStorage = [];
    let currentScanIndex = this.dataElements.length - 1;

    while (
      currentScanIndex >= 0 &&
      this.dataElements[currentScanIndex] > elementToInsert
    ) {
      auxiliaryStorage.push(this.dataElements.pop());
      currentScanIndex--;
    }

    this.dataElements.push(elementToInsert);

    let tempIterator = 0;
    while (tempIterator < auxiliaryStorage.length) {
      this.dataElements.push(auxiliaryStorage[tempIterator]);
      tempIterator++;
    }
  }

  removeRightmostMatching(indexToCheck) {
    while (
      !this.checkEmpty() &&
      this.dataElements[this.dataElements.length - 1] === indexToCheck
    ) {
      this.dataElements.pop();
    }
  }
}

var DinnerPlates = function (capacity) {
  this.maximumStackSize = capacity;
  this.platesContainerArray = [];
  this.openStackIndexRegister = new MinIndexTracker();
};

DinnerPlates.prototype.push = function (incomingValue) {
  let targetContainerIdentifier;
  if (!this.openStackIndexRegister.checkEmpty()) {
    targetContainerIdentifier = this.openStackIndexRegister.popLastElement();
  } else {
    targetContainerIdentifier = this.platesContainerArray.length - 1;
  }

  let shouldCreateNewContainer = false;
  if (this.platesContainerArray.length === 0 || targetContainerIdentifier < 0) {
    shouldCreateNewContainer = true;
  } else if (
    this.platesContainerArray[targetContainerIdentifier].length ===
    this.maximumStackSize
  ) {
    shouldCreateNewContainer = true;
  }

  if (shouldCreateNewContainer) {
    this.platesContainerArray.push([incomingValue]);
  } else {
    this.platesContainerArray[targetContainerIdentifier].push(incomingValue);
  }
};

DinnerPlates.prototype.pop = function () {
  let currentPlatesCount = this.platesContainerArray.length;

  while (
    currentPlatesCount > 0 &&
    this.platesContainerArray[currentPlatesCount - 1].length === 0
  ) {
    const rightmostEmptyIndex = currentPlatesCount - 1;
    this.openStackIndexRegister.removeRightmostMatching(rightmostEmptyIndex);
    this.platesContainerArray.pop();
    currentPlatesCount--;
  }

  if (currentPlatesCount === 0) {
    return -1;
  }

  const retrievedValue =
    this.platesContainerArray[currentPlatesCount - 1].pop();

  let adjustedPlatesCount = this.platesContainerArray.length;
  while (
    adjustedPlatesCount > 0 &&
    this.platesContainerArray[adjustedPlatesCount - 1].length === 0
  ) {
    const finalRightmostEmptyIndex = adjustedPlatesCount - 1;
    this.openStackIndexRegister.removeRightmostMatching(
      finalRightmostEmptyIndex
    );
    this.platesContainerArray.pop();
    adjustedPlatesCount--;
  }

  return retrievedValue;
};

DinnerPlates.prototype.popAtStack = function (stackIdentifier) {
  if (
    stackIdentifier >= this.platesContainerArray.length ||
    this.platesContainerArray[stackIdentifier].length === 0
  ) {
    return -1;
  }

  const valueFromSpecificStack =
    this.platesContainerArray[stackIdentifier].pop();
  this.openStackIndexRegister.addElementAndMaintainSort(stackIdentifier);
  return valueFromSpecificStack;
};
