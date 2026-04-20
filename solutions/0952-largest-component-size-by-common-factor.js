/**
 * Largest Component Size By Common Factor
 * Time Complexity: O(N * sqrt(M) * alpha(M))
 * Space Complexity: O(M)
 */
var largestComponentSize = function (nums) {
  let maxValueInNums = 0;
  for (let currentNumberValue of nums) {
    if (currentNumberValue > maxValueInNums) {
      maxValueInNums = currentNumberValue;
    }
  }

  const representativeArray = new Array(maxValueInNums + 1)
    .fill(0)
    .map((_val, index) => index);
  const componentDepth = new Array(maxValueInNums + 1).fill(0);

  const findSetRepresentative = (elementItem) => {
    if (representativeArray[elementItem] === elementItem) {
      return elementItem;
    }
    representativeArray[elementItem] = findSetRepresentative(
      representativeArray[elementItem],
    );
    return representativeArray[elementItem];
  };

  const uniteSets = (elementOne, elementTwo) => {
    let rootOfOne = findSetRepresentative(elementOne);
    let rootOfTwo = findSetRepresentative(elementTwo);

    if (rootOfOne !== rootOfTwo) {
      if (componentDepth[rootOfOne] < componentDepth[rootOfTwo]) {
        representativeArray[rootOfOne] = rootOfTwo;
      } else if (componentDepth[rootOfOne] > componentDepth[rootOfTwo]) {
        representativeArray[rootOfTwo] = rootOfOne;
      } else {
        representativeArray[rootOfTwo] = rootOfOne;
        componentDepth[rootOfOne]++;
      }
      return true;
    }
    return false;
  };

  for (const numberFromInput of nums) {
    for (
      let divisorCandidate = 2;
      divisorCandidate * divisorCandidate <= numberFromInput;
      divisorCandidate++
    ) {
      if (numberFromInput % divisorCandidate === 0) {
        uniteSets(numberFromInput, divisorCandidate);
        uniteSets(numberFromInput, numberFromInput / divisorCandidate);
      }
    }
  }

  const componentSizeTracker = new Map();
  let maximumComponentLength = 0;

  for (const numberForCounting of nums) {
    const componentRoot = findSetRepresentative(numberForCounting);
    componentSizeTracker.set(
      componentRoot,
      (componentSizeTracker.get(componentRoot) || 0) + 1,
    );
    if (componentSizeTracker.get(componentRoot) > maximumComponentLength) {
      maximumComponentLength = componentSizeTracker.get(componentRoot);
    }
  }

  return maximumComponentLength;
};
