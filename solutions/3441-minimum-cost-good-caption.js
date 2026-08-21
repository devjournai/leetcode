/**
 * Minimum Cost Good Caption
 * Intuition: A good caption is runs of at least 3 identical letters. DP tracks the min cost of the suffix given the last letter and how long its current run is, then reconstructs the lexicographically smallest string.
 * Approach: 1. If n < 3 return "". 2. dp[i][letter][run] = min cost of caption[i..] ending a run of size run+1 of that letter. 3. Reconstruct greedily from the cheapest starting triplet, switching letters only when a cheaper/lexicographically smaller block starts.
 * Dry Run: caption = "cdcd". Best good caption is "cccc" (cost 2) or "dddd" (cost 2); reconstruction prefers "cccc".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var minCostGoodCaption = function (caption) {
  const n = caption.length;
  if (n < 3) {
    return "";
  }

  const MAX_COST = 1000000000;
  const dp = Array.from({ length: n }, () =>
    Array.from({ length: 26 }, () => [MAX_COST, MAX_COST, MAX_COST])
  );

  for (let letter = 0; letter < 26; letter++) {
    dp[n - 1][letter][0] = Math.abs(caption.charCodeAt(n - 1) - (97 + letter));
  }

  let minCost = MAX_COST;
  for (let index = n - 2; index >= 0; index--) {
    let newMinCost = MAX_COST;
    for (let letter = 0; letter < 26; letter++) {
      const changeCost = Math.abs(caption.charCodeAt(index) - (97 + letter));
      dp[index][letter][0] = changeCost + minCost;
      dp[index][letter][1] = changeCost + dp[index + 1][letter][0];
      dp[index][letter][2] =
        changeCost +
        Math.min(dp[index + 1][letter][1], dp[index + 1][letter][2]);
      newMinCost = Math.min(newMinCost, dp[index][letter][2]);
    }
    minCost = newMinCost;
  }

  const appendLetter = (index, letterCode, output) => {
    output.push(String.fromCharCode(97 + letterCode));
    return Math.abs(caption.charCodeAt(index) - (97 + letterCode));
  };

  const getNextLetter = (index, cost) => {
    let nextLetter = 26;
    for (let letter = 25; letter >= 0; letter--) {
      if (cost === dp[index][letter][2]) {
        nextLetter = letter;
      }
    }
    return nextLetter;
  };

  const answer = [];
  let cost = MAX_COST;
  let letter = -1;
  for (let candidate = 25; candidate >= 0; candidate--) {
    if (dp[0][candidate][2] <= cost) {
      letter = candidate;
      cost = dp[0][candidate][2];
    }
  }

  cost -= appendLetter(0, letter, answer);
  cost -= appendLetter(1, letter, answer);
  cost -= appendLetter(2, letter, answer);

  let index = 3;
  while (index < n) {
    const nextLetter = getNextLetter(index, cost);
    const stayCost = Math.min(...dp[index][letter]);
    if (nextLetter < letter || stayCost > cost) {
      letter = nextLetter;
      cost -= appendLetter(index, letter, answer);
      cost -= appendLetter(index + 1, letter, answer);
      cost -= appendLetter(index + 2, letter, answer);
      index += 3;
    } else {
      cost -= appendLetter(index, letter, answer);
      index += 1;
    }
  }

  return answer.join("");
};
