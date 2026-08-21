/**
 * Score Validator
 * Intuition: We can directly simulate the process described in the problem to calculate the final score and counter value.
 * Approach: We can directly simulate the process described in the problem to calculate the final score and counter value. First, we initialize two variables score and counter, representing the current total score and counter value respectively. Then we iterate through each event in the array events and update score and counter based on the event type: - If the event is a numeric string, we convert it to an integer and add it to score. - If the event is the string "W", we increment counter by 1 and check if it has reached 10; if so, we stop processing. - Otherwise (the event is "WD" or "NB"), we add 1 to score.
 * Dry Run: Input: events = ["1","4","W","6","WD"]. Output: [12,1].
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var scoreValidator = function (events) {
  let score = 0;
  let counter = 0;
  for (const event of events) {
    if (/^\d+$/.test(event)) {
      score += parseInt(event);
    } else if (event === "W") {
      counter++;
      if (counter === 10) {
        break;
      }
    } else {
      score++;
    }
  }
  return [score, counter];
};
