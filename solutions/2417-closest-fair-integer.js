/**
 * Closest Fair Integer
 * Intuition: A number is fair if it has an equal count of even and odd digits. If a number has an odd total number of digits, it cannot be fair, so we must consider numbers with one more digit. Otherwise, we increment and check numbers sequentially.
 * Approach: 1. Define a helper function `checkFairness` to determine if an integer is fair by counting its even and odd digits. 2. Define a helper function `generateSmallestFairOfLength` to construct the smallest fair integer of a given even length (e.g., 1001 for length 4). 3. In the main `closestFair` function, start with `n`. Repeatedly check if the current number is fair. 4. If the current number has an odd number of digits, it cannot be fair; jump to the smallest fair integer of the next even length using `generateSmallestFairOfLength`. 5. If the current number has an even number of digits, use `checkFairness`. If it's fair, return it. 6. Otherwise, increment the current number and continue the search.
 * Dry Run: n = 28 -> currentCandidate = 28. Length 2 (even). checkFairness(28) -> (2 evens, 0 odds) -> false. currentCandidate = 29. Length 2 (even). checkFairness(29) -> (1 even, 1 odd) -> true. Return 29.
 * Dry Run: n = 99 -> currentCandidate = 99. Length 2 (even). checkFairness(99) -> (0 evens, 2 odds) -> false. currentCandidate = 100. Length 3 (odd). requiredLength = 4. currentCandidate = generateSmallestFairOfLength(4) -> 1001. Length 4 (even). checkFairness(1001) -> (2 evens, 2 odds) -> true. Return 1001.
 * Time Complexity: O(D * M)
 * Space Complexity: O(D)
 */
var closestFair = function (n) {
  function checkFairness(numberToVerify) {
    let evenCountIndicator = 0;
    let oddCountIndicator = 0;
    let tempNumberForCheck = numberToVerify;

    while (tempNumberForCheck > 0) {
      let digitToCheck = tempNumberForCheck % 10;
      if (digitToCheck % 2 === 0) {
        evenCountIndicator++;
      } else {
        oddCountIndicator++;
      }
      tempNumberForCheck = Math.floor(tempNumberForCheck / 10);
    }
    return evenCountIndicator === oddCountIndicator;
  }

  function generateSmallestFairOfLength(desiredLength) {
    let constructedString = "1";
    let zerosToPlace = desiredLength / 2;
    let onesToPlace = desiredLength / 2 - 1;

    for (let counterZeros = 0; counterZeros < zerosToPlace; counterZeros++) {
      constructedString += "0";
    }

    for (let counterOnes = 0; counterOnes < onesToPlace; counterOnes++) {
      constructedString += "1";
    }

    return parseInt(constructedString);
  }

  let currentCandidate = n;

  while (true) {
    let candidateString = currentCandidate.toString();
    let lengthOfCandidate = candidateString.length;

    if (lengthOfCandidate % 2 !== 0) {
      let requiredLength = lengthOfCandidate + 1;
      currentCandidate = generateSmallestFairOfLength(requiredLength);
      continue;
    }

    if (checkFairness(currentCandidate)) {
      return currentCandidate;
    }

    currentCandidate++;
  }
};
