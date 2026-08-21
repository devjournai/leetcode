/**
 * Maximum Number of Balloons
 * Intuition: The maximum number of "balloon" instances that can be formed is limited by the character that is most scarce relative to its requirement. We need one 'b', one 'a', two 'l's, two 'o's, and one 'n'. We can count the available characters in the input text and then determine how many full "balloon" words can be constructed based on the minimum availability of any required character.
 * Approach: 1. Create a frequency map for all characters in the input 'text'. 2. Extract the counts for the specific characters needed for "balloon": 'b', 'a', 'l', 'o', 'n'. 3. For 'b', 'a', and 'n', the number of possible balloons is simply their count. For 'l' and 'o', which are needed twice, the number of possible balloons is their count divided by two (integer division). 4. The final result is the minimum of these calculated possibilities across all required characters.
 * Dry Run: text = "nlaebolko"
 *   1. textCharCounts = {}
 *   2. Iterate through "nlaebolko":
 *      'n': textCharCounts['n'] = 1
 *      'l': textCharCounts['l'] = 1
 *      'a': textCharCounts['a'] = 1
 *      'e': textCharCounts['e'] = 1
 *      'b': textCharCounts['b'] = 1
 *      'o': textCharCounts['o'] = 1
 *      'l': textCharCounts['l'] = 2 (updates 'l' count)
 *      'k': textCharCounts['k'] = 1
 *      'o': textCharCounts['o'] = 2 (updates 'o' count)
 *      Final textCharCounts = {'n':1, 'l':2, 'a':1, 'e':1, 'b':1, 'o':2, 'k':1}
 *   3. Extract relevant counts:
 *      bCount = textCharCounts['b'] = 1
 *      aCount = textCharCounts['a'] = 1
 *      lCount = textCharCounts['l'] = 2
 *      oCount = textCharCounts['o'] = 2
 *      nCount = textCharCounts['n'] = 1
 *   4. Calculate potential balloons from each character:
 *      potentialBalloonsB = bCount / 1 = 1
 *      potentialBalloonsA = aCount / 1 = 1
 *      potentialBalloonsL = Math.floor(lCount / 2) = Math.floor(2 / 2) = 1
 *      potentialBalloonsO = Math.floor(oCount / 2) = Math.floor(2 / 2) = 1
 *      potentialBalloonsN = nCount / 1 = 1
 *   5. totalBalloons = Math.min(1, 1, 1, 1, 1) = 1
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxNumberOfBalloons = function (text) {
  const textCharCounts = new Map();

  for (const inputChar of text) {
    const currentCount = textCharCounts.get(inputChar) || 0;
    textCharCounts.set(inputChar, currentCount + 1);
  }

  const bCount = textCharCounts.get("b") || 0;
  const aCount = textCharCounts.get("a") || 0;
  const lCount = textCharCounts.get("l") || 0;
  const oCount = textCharCounts.get("o") || 0;
  const nCount = textCharCounts.get("n") || 0;

  const potentialBalloonsB = bCount;
  const potentialBalloonsA = aCount;
  const potentialBalloonsL = Math.floor(lCount / 2);
  const potentialBalloonsO = Math.floor(oCount / 2);
  const potentialBalloonsN = nCount;

  const totalBalloons = Math.min(
    potentialBalloonsB,
    potentialBalloonsA,
    potentialBalloonsL,
    potentialBalloonsO,
    potentialBalloonsN
  );

  return totalBalloons;
};
