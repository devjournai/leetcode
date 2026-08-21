/**
 * Parallel Courses Ii
 * Intuition: Bitmask DP over the set of completed courses. From a mask, collect courses whose prereqs are done and choose up to k of them for the next semester.
 * Approach: 1. Build a prereq mask per course. 2. Recurse on taken mask; if full, 0 semesters. 3. Bit-OR all currently available courses. 4. Recursively choose subsets of size min(k, available), memoize the min 1+rest.
 * Dry Run: n=4, relations=[[2,1],[3,1],[1,4]], k=2
 *   - semester 1: take 2 and 3; semester 2: take 1; semester 3: take 4. Return 3.
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
      accumulatedSelectionMask
    ) {
      if (currentRemainingCount === 0 || currentSelectionBitPosition === n) {
        if (accumulatedSelectionMask > 0) {
          minimumRequiredSemesterCount = Math.min(
            minimumRequiredSemesterCount,
            1 +
              computeMinSemesters(
                currentTakenCoursesMask | accumulatedSelectionMask
              )
          );
        }
        return;
      }

      const currentCourseConsiderationBit = 1 << currentSelectionBitPosition;

      if (potentialCoursesForNextSemesterMask & currentCourseConsiderationBit) {
        recursiveSemesterChooser(
          currentSelectionBitPosition + 1,
          currentRemainingCount - 1,
          accumulatedSelectionMask | currentCourseConsiderationBit
        );
      }
      recursiveSemesterChooser(
        currentSelectionBitPosition + 1,
        currentRemainingCount,
        accumulatedSelectionMask
      );
    }

    const availableCoursesToChooseFrom = countSetBitsInMask(
      potentialCoursesForNextSemesterMask
    );
    const maximumSelectableCoursesForCurrentSemester = Math.min(
      k,
      availableCoursesToChooseFrom
    );
    recursiveSemesterChooser(0, maximumSelectableCoursesForCurrentSemester, 0);

    memoizationTable[currentTakenCoursesMask] = minimumRequiredSemesterCount;
    return minimumRequiredSemesterCount;
  }
  return computeMinSemesters(0);
};
