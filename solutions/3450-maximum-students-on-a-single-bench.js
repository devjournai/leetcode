/**
 * Maximum Students on a Single Bench
 * Intuition: Each (student, bench) pair seats that student on that bench. The answer is the largest set of distinct students on any bench.
 * Approach: 1. Map bench id → set of student ids. 2. Return the maximum set size (0 if there are no students).
 * Dry Run: students = [[1,2],[2,2],[3,3],[1,3]]. Bench 2 has {1,2}, bench 3 has {3,1}. Answer 2.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var maxStudentsOnBench = function (students) {
  const benchToStudents = new Map();
  for (const [studentId, benchId] of students) {
    if (!benchToStudents.has(benchId)) {
      benchToStudents.set(benchId, new Set());
    }
    benchToStudents.get(benchId).add(studentId);
  }

  let answer = 0;
  for (const seated of benchToStudents.values()) {
    answer = Math.max(answer, seated.size);
  }
  return answer;
};
