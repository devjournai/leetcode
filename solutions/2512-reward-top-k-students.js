/**
 * Reward Top K Students
 * Intuition: Student scores can be calculated by iterating through their feedback reports. Once all scores are known, students can be ranked based on score (descending) and then ID (ascending) to identify the top K.
 * Approach: 1. Initialize two sets, one for positive feedback words and one for negative feedback words, for efficient lookup. 2. Iterate through each student's report, parse it into words, and calculate the student's total score based on the feedback sets. Store each student's ID and calculated score in a list. 3. Sort this list of students: primary sort by score in descending order, secondary sort by student ID in ascending order for ties. 4. Extract the IDs of the first `k` students from the sorted list.
 * Dry Run: positive_feedback=["smart"], negative_feedback=["bad"], report=["i am smart", "i am bad"], student_id=[1, 2], k=1
 * 1. positiveWordsSet = {"smart"}, negativeTermsSet = {"bad"}.
 * 2. studentResults = []
 *    - reportIterationIndex=0: currentReportText="i am smart", currentReportWords=["i", "am", "smart"]. currentStudentScore=0.
 *      - wordPointer=0, feedbackWord="i": no match.
 *      - wordPointer=1, feedbackWord="am": no match.
 *      - wordPointer=2, feedbackWord="smart": positive, currentStudentScore=3.
 *    currentStudentIdentifier=1. studentResults.push([1, 3]). studentResults = [[1, 3]].
 *    - reportIterationIndex=1: currentReportText="i am bad", currentReportWords=["i", "am", "bad"]. currentStudentScore=0.
 *      - wordPointer=0, feedbackWord="i": no match.
 *      - wordPointer=1, feedbackWord="am": no match.
 *      - wordPointer=2, feedbackWord="bad": negative, currentStudentScore=-1.
 *    currentStudentIdentifier=2. studentResults.push([2, -1]). studentResults = [[1, 3], [2, -1]].
 * 3. studentResults.sort():
 *    - Comparing [1, 3] and [2, -1]: Score 3 is greater than -1. [1, 3] comes before [2, -1].
 *    studentResults remains [[1, 3], [2, -1]].
 * 4. topKStudentIdentifiers = []
 *    - topStudentIndex=0: currentTopStudentEntry=[1, 3]. studentIdToReturn=1. topKStudentIdentifiers.push(1). topKStudentIdentifiers = [1].
 *    - Loop condition (topStudentIndex < k) becomes (1 < 1) which is false. Loop ends.
 * Return [1].
 * Time Complexity: O(P + N + R * L + R log R)
 * Space Complexity: O(P + N + R + K)
 */
var topStudents = function (
  positive_feedback,
  negative_feedback,
  report,
  student_id,
  k
) {
  const positiveWordsSet = new Set(positive_feedback);
  const negativeTermsSet = new Set(negative_feedback);

  const studentResults = [];

  report.forEach((currentReportText, reportIterationIndex) => {
    const currentReportWords = currentReportText.split(" ");
    let currentStudentScore = 0;

    for (
      let wordPointer = 0;
      wordPointer < currentReportWords.length;
      wordPointer++
    ) {
      const feedbackWord = currentReportWords[wordPointer];
      if (positiveWordsSet.has(feedbackWord)) {
        currentStudentScore += 3;
      } else if (negativeTermsSet.has(feedbackWord)) {
        currentStudentScore -= 1;
      }
    }
    const currentStudentIdentifier = student_id[reportIterationIndex];
    studentResults.push([currentStudentIdentifier, currentStudentScore]);
  });

  studentResults.sort((studentA, studentB) => {
    const scoreA = studentA[1];
    const scoreB = studentB[1];
    const idA = studentA[0];
    const idB = studentB[0];

    if (scoreA !== scoreB) {
      return scoreB - scoreA;
    }
    return idA - idB;
  });

  const topKStudentIdentifiers = [];
  const sortedStudentCount = studentResults.length;
  for (
    let topStudentIndex = 0;
    topStudentIndex < k && topStudentIndex < sortedStudentCount;
    topStudentIndex++
  ) {
    const currentTopStudentEntry = studentResults[topStudentIndex];
    const studentIdToReturn = currentTopStudentEntry[0];
    topKStudentIdentifiers.push(studentIdToReturn);
  }

  return topKStudentIdentifiers;
};
