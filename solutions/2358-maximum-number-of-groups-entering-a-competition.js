/**
 * Maximum Number Of Groups Entering A Competition
 * Intuition: To maximize the number of groups, we should minimize the number of students in each group while satisfying the given conditions. The conditions imply that group sizes must strictly increase. The smallest possible group sizes are 1, 2, 3, ..., k. The sum of grades condition can always be met by strategically assigning students from a sorted list of grades (or simply by being able to choose students for each group freely, knowing that a group with more students can always have a larger sum of positive grades than a group with fewer students). Thus, the problem reduces to finding the largest integer 'k' such that the total students required for 'k' groups (which is the sum of the first 'k' positive integers, calculated as k * (k + 1) / 2) does not exceed the total available students.
 * Approach: 1. Determine the total number of students available from the input array length. 2. Use binary search to find the maximum possible number of groups 'k'. The search range for 'k' is from 0 (no groups) to the total available students (in the worst case, each student forms their own group if N=1, but the problem's conditions usually mean 'k' is much smaller, upper bound is usually sqrt(2N)). 3. In each iteration of the binary search, calculate the number of students required for 'mid' groups using the formula `mid * (mid + 1) / 2`. 4. If the required students are less than or equal to the available students, it means 'mid' groups are feasible, so we store 'mid' as a potential answer and try to form more groups by searching in the upper half (`mid + 1` to `highPointer`). 5. If the required students exceed the available students, 'mid' groups are not feasible, so we reduce the number of groups by searching in the lower half (`lowPointer` to `mid - 1`). 6. The stored potential answer at the end of the binary search will be the maximum number of groups.
 * Dry Run: grades = [10, 20, 30, 40, 50, 60]
 *   totalAvailableStudents = 6
 *   lowPointer = 0, highPointer = 6, maximumGroupsFound = 0
 *
 *   Iteration 1:
 *     midPoint = 0 + Math.floor((6 - 0) / 2) = 3
 *     currentStudentsNeeded = 3 * (3 + 1) / 2 = 6
 *     Is currentStudentsNeeded (6) <= totalAvailableStudents (6)? Yes.
 *     maximumGroupsFound = 3
 *     lowPointer = 3 + 1 = 4
 *     (Current state: lowPointer = 4, highPointer = 6, maximumGroupsFound = 3)
 *
 *   Iteration 2:
 *     midPoint = 4 + Math.floor((6 - 4) / 2) = 5
 *     currentStudentsNeeded = 5 * (5 + 1) / 2 = 15
 *     Is currentStudentsNeeded (15) <= totalAvailableStudents (6)? No.
 *     highPointer = 5 - 1 = 4
 *     (Current state: lowPointer = 4, highPointer = 4, maximumGroupsFound = 3)
 *
 *   Iteration 3:
 *     midPoint = 4 + Math.floor((4 - 4) / 2) = 4
 *     currentStudentsNeeded = 4 * (4 + 1) / 2 = 10
 *     Is currentStudentsNeeded (10) <= totalAvailableStudents (6)? No.
 *     highPointer = 4 - 1 = 3
 *     (Current state: lowPointer = 4, highPointer = 3, maximumGroupsFound = 3)
 *
 *   Loop terminates because lowPointer (4) is not <= highPointer (3).
 *   Return maximumGroupsFound = 3.
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var maximumGroups = function (grades) {
  const totalAvailableStudents = grades.length;
  let lowPointer = 0;
  let highPointer = totalAvailableStudents;
  let maximumGroupsFound = 0;

  while (lowPointer <= highPointer) {
    let midPoint = Math.floor(lowPointer + (highPointer - lowPointer) / 2);

    // Calculate students needed for 'midPoint' groups: 1 + 2 + ... + midPoint
    // Use BigInt to prevent overflow for midPoint * (midPoint + 1) if midPoint is very large,
    // though for N=10^5, k is ~447, so it won't overflow standard JS numbers.
    // Explicit cast to Number for comparison.
    let currentStudentsNeeded = Number(
      (BigInt(midPoint) * (BigInt(midPoint) + 1n)) / 2n,
    );

    if (currentStudentsNeeded <= totalAvailableStudents) {
      maximumGroupsFound = midPoint;
      lowPointer = midPoint + 1;
    } else {
      highPointer = midPoint - 1;
    }
  }

  return maximumGroupsFound;
};
