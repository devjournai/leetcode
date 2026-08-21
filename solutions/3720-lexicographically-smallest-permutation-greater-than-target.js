/**
 * Lexicographically Smallest Permutation Greater Than Target
 * Intuition: Match target's prefix as long as possible, then at the rightmost position where a strictly larger remaining letter exists, place the smallest such letter and sort the rest ascending.
 * Approach: 1. Count letters in s. 2. Scan target, tracking the latest index that can be increased. 3. Rebuild: copy prefix, place next greater letter, append remaining letters sorted.
 * Dry Run: s = "abc", target = "bba" → raise at the second character to get "bca".
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var lexGreaterPermutation = function (s, target) {
  const counts = Array(26).fill(0);
  for (const char of s) {
    counts[char.charCodeAt(0) - 97]++;
  }

  const nextGreater = (freq, char) => {
    for (let code = char.charCodeAt(0) - 97 + 1; code < 26; code++) {
      if (freq[code] > 0) {
        return String.fromCharCode(97 + code);
      }
    }
    return "";
  };

  const trial = counts.slice();
  let raiseAt = -1;
  for (let i = 0; i < target.length; i++) {
    if (nextGreater(trial, target[i])) {
      raiseAt = i;
    }
    const idx = target.charCodeAt(i) - 97;
    if (trial[idx] === 0) {
      break;
    }
    trial[idx]--;
  }
  if (raiseAt === -1) {
    return "";
  }

  const result = [];
  for (let i = 0; i < raiseAt; i++) {
    result.push(target[i]);
    counts[target.charCodeAt(i) - 97]--;
  }
  const raised = nextGreater(counts, target[raiseAt]);
  result.push(raised);
  counts[raised.charCodeAt(0) - 97]--;
  for (let code = 0; code < 26; code++) {
    while (counts[code] > 0) {
      result.push(String.fromCharCode(97 + code));
      counts[code]--;
    }
  }
  return result.join("");
};
