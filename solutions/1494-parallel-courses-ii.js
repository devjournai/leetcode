/**
 * Parallel Courses Ii
 * Time Complexity: O(2^n * (n + n * C(n, k)))
 * Space Complexity: O(2^n)
 */
var minNumberOfSemesters = function (n, relations, k) {
  const courseDependencyMasks = new Array(n).fill(0);

  relations.forEach((dependencyPair) => {
    const previousCourseIndex = dependencyPair[0] - 1;
    const nextCourseIndex = dependencyPair[1] - 1;
    courseDependencyMasks[nextCourseIndex] |= 1 << previousCourseIndex;
  });

  const memoizationTable = new Array(1 << n).fill(-1);

  function countSetBitsInMask(maskValue) {
    let numberOfSetBits = 0;
    let temporaryMask = maskValue;
    while (temporaryMask > 0) {
      temporaryMask &= temporaryMask - 1;
      numberOfSetBits++;
    }
    return numberOfSetBits;
  }

  function computeMinSemesters(currentTakenCoursesMask) {
    const allCoursesCompletionMask = (1 << n) - 1;
    if (currentTakenCoursesMask === allCoursesCompletionMask) {
      return 0;
    }

    if (memoizationTable[currentTakenCoursesMask] !== -1) {
      return memoizationTable[currentTakenCoursesMask];
    }

    let potentialCoursesForNextSemesterMask = 0;
    let courseIndexIterator = 0;
    while (courseIndexIterator < n) {
      const currentCourseBitIdentifier = 1 << courseIndexIterator;
      if (
        !(currentTakenCoursesMask & currentCourseBitIdentifier) &&
        (currentTakenCoursesMask &
          courseDependencyMasks[courseIndexIterator]) ===
          courseDependencyMasks[courseIndexIterator]
      ) {
        potentialCoursesForNextSemesterMask |= currentCourseBitIdentifier;
      }
      courseIndexIterator++;
    }

    let minimumRequiredSemesterCount = n + 1;
    function recursiveSemesterChooser(
      currentSelectionBitPosition,
      currentRemainingCount,
      accumulatedSelectionMask,
    ) {
      if (currentRemainingCount === 0 || currentSelectionBitPosition === n) {
        if (accumulatedSelectionMask > 0) {
          minimumRequiredSemesterCount = Math.min(
            minimumRequiredSemesterCount,
            1 +
              computeMinSemesters(
                currentTakenCoursesMask | accumulatedSelectionMask,
              ),
          );
        }
        return;
      }

      const currentCourseConsiderationBit = 1 << currentSelectionBitPosition;

      if (potentialCoursesForNextSemesterMask & currentCourseConsiderationBit) {
        recursiveSemesterChooser(
          currentSelectionBitPosition + 1,
          currentRemainingCount - 1,
          accumulatedSelectionMask | currentCourseConsiderationBit,
        );
      }
      recursiveSemesterChooser(
        currentSelectionBitPosition + 1,
        currentRemainingCount,
        accumulatedSelectionMask,
      );
    }

    const availableCoursesToChooseFrom = countSetBitsInMask(
      potentialCoursesForNextSemesterMask,
    );
    const maximumSelectableCoursesForCurrentSemester = Math.min(
      k,
      availableCoursesToChooseFrom,
    );
    recursiveSemesterChooser(0, maximumSelectableCoursesForCurrentSemester, 0);

    memoizationTable[currentTakenCoursesMask] = minimumRequiredSemesterCount;
    return minimumRequiredSemesterCount;
  }
  return computeMinSemesters(0);
};
