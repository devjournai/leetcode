/**
 * Largest Component Size By Common Factor
 * Intuition: Numbers that share a factor belong in one Union-Find component. Union each `numberFromInput` with every divisor (and cofactor) so gcd-sharing values share a root.
 * Approach: 1. Find `maxValueInNums` and init `representativeArray`/`componentDepth`. 2. Path-compress with `findSetRepresentative`; union by rank in `uniteSets`. 3. For each number, trial-divide from 2 and union with factors. 4. Count how many nums map to each root in `componentSizeTracker` and return `maximumComponentLength`.
 * Dry Run: nums = [4,6,15,35]. 4 unions with 2; 6 with 2 and 3 → 4 and 6 share a set. 15 unions with 3 and 5; 35 with 5 and 7 → all four share one root. Answer 4.
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
      representativeArray[elementItem]
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
      (componentSizeTracker.get(componentRoot) || 0) + 1
    );
    if (componentSizeTracker.get(componentRoot) > maximumComponentLength) {
      maximumComponentLength = componentSizeTracker.get(componentRoot);
    }
  }

  return maximumComponentLength;
};
