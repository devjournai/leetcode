/**
 * Maximum Compatibility Score Sum
 * Intuition: Score of a student-mentor pair is how many answers match. We need a bijection maximizing the sum of scores, which for small `m` is exhaustive assignment (backtracking over unused mentors).
 * Approach: 1. `determinePairCompatibility` counts equal answers. 2. Recurse over students: try each unused mentor, add that pair's score, mark used, recurse, then unmark. 3. At the last student, update `maximumPossibleScore`. 4. Return it.
 * Dry Run: students = [[1,1,0],[1,0,1]], mentors = [[0,0,1],[1,1,0]].
 *   - Pair 0-0 + 1-1: scores 1+1=2
 *   - Pair 0-1 + 1-0: scores 3+1=4. Max = 4.
 * Time Complexity: O(m! * m * n)
 * Space Complexity: O(m)
 */
var maxCompatibilitySum = function (students, mentors) {
  const numberOfParticipants = students.length;
  let maximumPossibleScore = 0;

  const determinePairCompatibility = (
    currentStudentAnswers,
    currentMentorAnswers
  ) => {
    let computedCompatibility = 0;
    currentStudentAnswers.forEach((studentAnswer, questionPosition) => {
      if (studentAnswer === currentMentorAnswers[questionPosition]) {
        computedCompatibility++;
      }
    });
    return computedCompatibility;
  };

  const explorePairings = (
    studentIdentifier,
    mentorAvailability,
    partialScoreSum
  ) => {
    if (studentIdentifier === numberOfParticipants) {
      maximumPossibleScore = Math.max(maximumPossibleScore, partialScoreSum);
      return;
    }

    let potentialMentorIndex = 0;
    while (potentialMentorIndex < numberOfParticipants) {
      if (!mentorAvailability[potentialMentorIndex]) {
        mentorAvailability[potentialMentorIndex] = true;

        explorePairings(
          studentIdentifier + 1,
          mentorAvailability,
          partialScoreSum +
            determinePairCompatibility(
              students[studentIdentifier],
              mentors[potentialMentorIndex]
            )
        );

        mentorAvailability[potentialMentorIndex] = false;
      }
      potentialMentorIndex++;
    }
  };

  explorePairings(0, new Array(numberOfParticipants).fill(false), 0);

  return maximumPossibleScore;
};
