/**
 * Guess The Majority In A Hidden Array
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var guessMajority = function (reader) {
  const arrayLength = reader.length();

  if (arrayLength === 4) {
    const initialQueryResult = reader.query(0, 1, 2, 3);
    if (initialQueryResult === 4) {
      return 0;
    } else if (initialQueryResult === 0) {
      return -1;
    } else {
      return -1;
    }
  }

  let countSameAsValueZero = 1;
  let indexDifferentFromValueZero = -1;
  let countDifferentFromValueZero = 0;

  const baseQueryValue = reader.query(0, 1, 2, 3);

  for (
    let currentMainIndex = 4;
    currentMainIndex < arrayLength;
    currentMainIndex++
  ) {
    const currentIterationQuery = reader.query(currentMainIndex, 1, 2, 3);
    if (currentIterationQuery === baseQueryValue) {
      countSameAsValueZero++;
    } else {
      countDifferentFromValueZero++;
      indexDifferentFromValueZero = currentMainIndex;
    }
  }

  const comparisonAnchorForFirstElements = reader.query(1, 2, 3, 4);

  const queryForZeroVersusOne = reader.query(0, 2, 3, 4);
  if (queryForZeroVersusOne === comparisonAnchorForFirstElements) {
    countSameAsValueZero++;
  } else {
    countDifferentFromValueZero++;
    indexDifferentFromValueZero = 1;
  }

  const queryForZeroVersusTwo = reader.query(0, 1, 3, 4);
  if (queryForZeroVersusTwo === comparisonAnchorForFirstElements) {
    countSameAsValueZero++;
  } else {
    countDifferentFromValueZero++;
    indexDifferentFromValueZero = 2;
  }

  const queryForZeroVersusThree = reader.query(0, 1, 2, 4);
  if (queryForZeroVersusThree === comparisonAnchorForFirstElements) {
    countSameAsValueZero++;
  } else {
    countDifferentFromValueZero++;
    indexDifferentFromValueZero = 3;
  }

  if (countSameAsValueZero > countDifferentFromValueZero) {
    return 0;
  } else if (countDifferentFromValueZero > countSameAsValueZero) {
    return indexDifferentFromValueZero;
  } else {
    return -1;
  }
};
