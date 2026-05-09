/**
 * Maximum Compatibility Score Sum
 * Time Complexity: O(m! * m * n)
 * Space Complexity: O(m)
 */
var maxCompatibilitySum = function (students, mentors) {
  const numberOfParticipants = students.length;
  let maximumPossibleScore = 0;

  const determinePairCompatibility = (
    currentStudentAnswers,
    currentMentorAnswers,
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
    partialScoreSum,
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
              mentors[potentialMentorIndex],
            ),
        );

        mentorAvailability[potentialMentorIndex] = false;
      }
      potentialMentorIndex++;
    }
  };

  explorePairings(0, new Array(numberOfParticipants).fill(false), 0);

  return maximumPossibleScore;
};
