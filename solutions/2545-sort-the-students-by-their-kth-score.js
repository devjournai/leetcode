/**
 * Sort The Students By Their Kth Score
 * Intuition: Sorting an array of objects (or in this case, arrays representing students) based on a specific numerical property (the k-th score) is a fundamental sorting problem. JavaScript's `Array.prototype.sort()` method is perfectly suited for this, allowing for a custom comparison function to define the sorting criteria.
 * Approach: 1. Apply the built-in `sort` method directly to the input `score` matrix. This method will arrange the rows (students) in place. 2. Pass a custom comparison function `(entryA, entryB)` to the `sort` method. This function receives two student rows at a time for comparison. 3. Inside the comparison function, retrieve the score for the `k`th exam for both `entryA` and `entryB` (i.e., `entryA[k]` and `entryB[k]`). 4. To sort in descending order (highest score first), return `entryB[k] - entryA[k]`. A positive result means `entryB` has a higher score and should come before `entryA`.
 * Dry Run:
 * Input: score = [[10, 6, 9], [7, 8, 11], [12, 1, 3]], k = 1
 * Initial score matrix (students and their 1st exam scores):
 * [[10, 6, 9],   // Student 0, score[0][1] = 6
 *  [7, 8, 11],   // Student 1, score[1][1] = 8
 *  [12, 1, 3]]   // Student 2, score[2][1] = 1
 *
 * `score.sort((studentOne, studentTwo) => { let scoreOne = studentOne[k]; let scoreTwo = studentTwo[k]; return scoreTwo - scoreOne; });` is executed.
 *
 * Example Comparison 1:
 * studentOne = [10, 6, 9], studentTwo = [7, 8, 11]
 * scoreOne = studentOne[1] = 6
 * scoreTwo = studentTwo[1] = 8
 * Comparison Result: scoreTwo - scoreOne = 8 - 6 = 2 (positive). This indicates that `studentTwo` should come before `studentOne`.
 *
 * Example Comparison 2 (after some internal reordering by the sort algorithm):
 * studentOne = [7, 8, 11], studentTwo = [12, 1, 3]
 * scoreOne = studentOne[1] = 8
 * scoreTwo = studentTwo[1] = 1
 * Comparison Result: scoreTwo - scoreOne = 1 - 8 = -7 (negative). This indicates that `studentOne` should come before `studentTwo`.
 *
 * The `sort` method will continue these comparisons until all rows are ordered according to the `k`th score in descending order.
 *
 * Final sorted score matrix:
 * [[7, 8, 11],   // Kth score = 8 (highest)
 *  [10, 6, 9],   // Kth score = 6
 *  [12, 1, 3]]   // Kth score = 1 (lowest)
 * Time Complexity: O(M log M)
 * Space Complexity: O(M)
 */
var sortTheStudents = function (score, k) {
  return score.sort((studentOne, studentTwo) => {
    let firstStudentKthScore = studentOne[k];
    let secondStudentKthScore = studentTwo[k];
    return secondStudentKthScore - firstStudentKthScore;
  });
};
