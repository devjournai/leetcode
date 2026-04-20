/**
 * Rearrange String K Distance Apart
 * Time Complexity: O(N * K)
 * Space Complexity: O(N)
*/
var rearrangeString = function (inputString, distanceConstraint) {
  if (distanceConstraint <= 1) {
    return inputString;
  }

  let characterFrequencies = new Array(26).fill(0);
  for (let charIndex = 0; charIndex < inputString.length; charIndex++) {
    characterFrequencies[inputString.charCodeAt(charIndex) - 97]++;
  }

  let charPriorityQueue = [];
  for (let alphabetPosition = 0; alphabetPosition < 26; alphabetPosition++) {
    if (characterFrequencies[alphabetPosition] > 0) {
      charPriorityQueue.push([characterFrequencies[alphabetPosition], String.fromCharCode(alphabetPosition + 97)]);
    }
  }
  charPriorityQueue.sort((entryOne, entryTwo) => entryTwo[0] - entryOne[0]);

  let highestFrequency = charPriorityQueue.length > 0 ? charPriorityQueue[0][0] : 0;
  if (highestFrequency > Math.ceil(inputString.length / distanceConstraint)) {
    return "";
  }

  let finalArrangement = new Array(inputString.length).fill('');
  let placementPointer = 0;

  while (charPriorityQueue.length > 0) {
    let requeueBuffer = [];
    let elementsFilledInCycle = 0;

    while (elementsFilledInCycle < distanceConstraint && charPriorityQueue.length > 0) {
      let [currentCount, characterToPlace] = charPriorityQueue.shift();

      for (; placementPointer < inputString.length && finalArrangement[placementPointer] !== ''; placementPointer++);

      if (placementPointer >= inputString.length) {
        placementPointer = 0;
        for (; placementPointer < inputString.length && finalArrangement[placementPointer] !== ''; placementPointer++);
      }

      finalArrangement[placementPointer] = characterToPlace;
      placementPointer++;

      if (currentCount > 1) {
        requeueBuffer.push([currentCount - 1, characterToPlace]);
      }
      elementsFilledInCycle++;
    }

    requeueBuffer.sort((bufItemA, bufItemB) => bufItemB[0] - bufItemA[0]);
    charPriorityQueue.push(...requeueBuffer);
    charPriorityQueue.sort((valX, valY) => valY[0] - valX[0]);
  }

  let validationWindowStart = 0;
  do {
    if (validationWindowStart > inputString.length - distanceConstraint) {
      break;
    }
    let encounteredCharsInWindow = new Set();
    let windowElementCounter = 0;

    while (windowElementCounter < distanceConstraint) {
      let currentWindowChar = finalArrangement[validationWindowStart + windowElementCounter];
      if (encounteredCharsInWindow.has(currentWindowChar)) {
        return "";
      }
      encounteredCharsInWindow.add(currentWindowChar);
      windowElementCounter++;
    }
    validationWindowStart++;
  } while (true);

  return finalArrangement.join('');
};