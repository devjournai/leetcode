/**
* Solving Questions With Brainpower
* Intuition: This problem requires making optimal choices (solve or skip) for each question, where a choice affects future available questions. This "optimal substructure" and "overlapping subproblems" pattern is a strong indicator for dynamic programming. By working backward from the last question, we can build up the maximum points for any starting question, as the decision for a question depends on the maximum points achievable from subsequent questions.
* Approach: 1. Initialize a dynamic programming array, `maximumScores`, of size `N + 1` (where `N` is the number of questions), with all elements set to 0. `maximumScores[i]` will store the maximum points obtainable by considering questions from index `i` to `N-1`. 2. Iterate backward through the questions array from the last question (`N-1`) down to the first question (`0`). 3. For each `questionIndex`: a. Extract the `currentQuestionPoints` and `skipDuration` from `questions[questionIndex]`. b. Calculate the index of the `nextQuestionToConsider` if the current question is solved, which is `questionIndex + skipDuration + 1`. Use `Math.min(N, nextQuestionToConsider)` to ensure the index does not exceed `N`, as `maximumScores[N]` correctly represents 0 points. c. Calculate `scoreIfSolved` as `currentQuestionPoints + maximumScores[nextQuestionToConsider]`. d. Calculate `scoreIfSkipped` as `maximumScores[questionIndex + 1]`. e. Store the maximum of `scoreIfSolved` and `scoreIfSkipped` into `maximumScores[questionIndex]`. 4. The final answer is `maximumScores[0]`, representing the maximum points obtainable starting from the first question.
* Dry Run: questions = [[3, 2], [4, 3], [4, 4], [2, 5]]
  totalQuestionsCount = 4
  maximumScores = [0, 0, 0, 0, 0] (size 5)

  questionIndex = 3 (questions[3] = [2, 5])
  currentQuestionPoints = 2, skipDuration = 5
  nextQuestionToConsider = Math.min(4, 3 + 5 + 1) = Math.min(4, 9) = 4
  scoreIfSolved = 2 + maximumScores[4] = 2 + 0 = 2
  scoreIfSkipped = maximumScores[3 + 1] = maximumScores[4] = 0
  maximumScores[3] = Math.max(2, 0) = 2
  maximumScores becomes [0, 0, 0, 2, 0]

  questionIndex = 2 (questions[2] = [4, 4])
  currentQuestionPoints = 4, skipDuration = 4
  nextQuestionToConsider = Math.min(4, 2 + 4 + 1) = Math.min(4, 7) = 4
  scoreIfSolved = 4 + maximumScores[4] = 4 + 0 = 4
  scoreIfSkipped = maximumScores[2 + 1] = maximumScores[3] = 2
  maximumScores[2] = Math.max(4, 2) = 4
  maximumScores becomes [0, 0, 4, 2, 0]

  questionIndex = 1 (questions[1] = [4, 3])
  currentQuestionPoints = 4, skipDuration = 3
  nextQuestionToConsider = Math.min(4, 1 + 3 + 1) = Math.min(4, 5) = 4
  scoreIfSolved = 4 + maximumScores[4] = 4 + 0 = 4
  scoreIfSkipped = maximumScores[1 + 1] = maximumScores[2] = 4
  maximumScores[1] = Math.max(4, 4) = 4
  maximumScores becomes [0, 4, 4, 2, 0]

  questionIndex = 0 (questions[0] = [3, 2])
  currentQuestionPoints = 3, skipDuration = 2
  nextQuestionToConsider = Math.min(4, 0 + 2 + 1) = Math.min(4, 3) = 3
  scoreIfSolved = 3 + maximumScores[3] = 3 + 2 = 5
  scoreIfSkipped = maximumScores[0 + 1] = maximumScores[1] = 4
  maximumScores[0] = Math.max(5, 4) = 5
  maximumScores becomes [5, 4, 4, 2, 0]

  Return maximumScores[0] = 5.

* Time Complexity: O(N)
* Space Complexity: O(N)
*/
var mostPoints = function (questions) {
  const totalQuestionsCount = questions.length;
  const maximumScores = new Array(totalQuestionsCount + 1).fill(0);

  for (
    let questionIndex = totalQuestionsCount - 1;
    questionIndex >= 0;
    questionIndex--
  ) {
    const currentQuestionInfo = questions[questionIndex];
    const currentQuestionPoints = currentQuestionInfo[0];
    const skipDuration = currentQuestionInfo[1];

    const nextQuestionToConsider = Math.min(
      totalQuestionsCount,
      questionIndex + skipDuration + 1,
    );

    const scoreIfSolved =
      currentQuestionPoints + maximumScores[nextQuestionToConsider];
    const scoreIfSkipped = maximumScores[questionIndex + 1];

    maximumScores[questionIndex] = Math.max(scoreIfSolved, scoreIfSkipped);
  }

  return maximumScores[0];
};
