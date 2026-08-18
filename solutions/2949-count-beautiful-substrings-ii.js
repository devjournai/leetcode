/**
 * Count Beautiful Substrings II
 *
 * Intuition:
 *
 * A substring is beautiful when:
 *
 *     1. vowels === consonants
 *     2. vowels * consonants is divisible by k
 *
 * ------------------------------------------------------------
 *
 * Step 1: Convert the string into a balance.
 *
 * Treat:
 *
 *     vowel     -> +1
 *     consonant -> -1
 *
 * Let prefixBalance[i] represent the balance of the first i
 * characters.
 *
 * For a substring [l ... r] to have the same number of vowels
 * and consonants:
 *
 *     prefixBalance[r + 1] === prefixBalance[l]
 *
 * Therefore, we need two prefix positions having the same
 * balance.
 *
 * ------------------------------------------------------------
 *
 * Step 2: Simplify the divisibility condition.
 *
 * If a substring has:
 *
 *     vowels = consonants = x
 *
 * then its length is:
 *
 *     2 * x
 *
 * and:
 *
 *     vowels * consonants = x * x = x²
 *
 * So we need:
 *
 *     x² % k === 0
 *
 * We need to find the smallest positive number d such that:
 *
 *     d² is divisible by k
 *
 * Then every valid x must be divisible by d.
 *
 * Therefore:
 *
 *     x % d === 0
 *
 * Since substring length = 2 * x:
 *
 *     substring length % (2 * d) === 0
 *
 * ------------------------------------------------------------
 *
 * How do we find d?
 *
 * Prime-factorize k:
 *
 *     k = p1^e1 * p2^e2 * ...
 *
 * For d² to contain every prime factor of k:
 *
 *     exponent in d >= ceil(e / 2)
 *
 * Therefore:
 *
 *     d = product of p ^ ceil(e / 2)
 *
 * Example:
 *
 *     k = 12
 *
 *     12 = 2² * 3¹
 *
 * Therefore:
 *
 *     d = 2¹ * 3¹
 *       = 6
 *
 * And:
 *
 *     6² = 36
 *
 *     36 % 12 === 0
 *
 * ------------------------------------------------------------
 *
 * Step 3: Count valid prefix pairs.
 *
 * We need:
 *
 *     prefixBalance[i] === prefixBalance[j]
 *
 * and:
 *
 *     (j - i) % (2 * d) === 0
 *
 * The second condition can be rewritten as:
 *
 *     i % (2 * d) === j % (2 * d)
 *
 * So each prefix position can be represented by:
 *
 *     (balance, index % (2 * d))
 *
 * If the same key has appeared before, every previous position
 * forms a beautiful substring with the current position.
 *
 * ------------------------------------------------------------
 *
 * Example:
 *
 * s = "abba"
 * k = 1
 *
 * Since:
 *
 *     k = 1
 *
 * d = 1
 *
 * Therefore:
 *
 *     2 * d = 2
 *
 * We track:
 *
 *     balance + index % 2
 *
 * Prefix balances:
 *
 *     index 0 -> balance 0
 *     index 1 -> balance +1
 *     index 2 -> balance 0
 *     index 3 -> balance -1
 *     index 4 -> balance 0
 *
 * Valid repeated states produce 3 beautiful substrings.
 *
 * ------------------------------------------------------------
 *
 * Important:
 *
 * We use BigInt for the answer because the number of substrings
 * can be as large as:
 *
 *     n * (n + 1) / 2
 *
 * With n = 50000 this is over 1 billion.
 *
 * JavaScript Number can safely represent this value, but using
 * Number is still sufficient here because the maximum possible
 * answer is below 2^53.
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(n + sqrt(k))
 * Space Complexity: O(n)
 */
var beautifulSubstrings = function (s, k) {
  let remaining = k;
  let requiredMultiplier = 1;

  for (let prime = 2; prime * prime <= remaining; prime++) {
    if (remaining % prime !== 0) {
      continue;
    }

    let exponent = 0;

    while (remaining % prime === 0) {
      remaining /= prime;
      exponent++;
    }

    requiredMultiplier *= Math.pow(prime, Math.ceil(exponent / 2));
  }

  if (remaining > 1) {
    requiredMultiplier *= remaining;
  }

  const lengthModulo = 2 * requiredMultiplier;
  const frequency = new Map();
  const initialKey = `0#0`;

  frequency.set(initialKey, 1);

  let balance = 0;
  let answer = 0;
  for (let i = 0; i < s.length; i++) {
    const isVowel =
      s[i] === "a" ||
      s[i] === "e" ||
      s[i] === "i" ||
      s[i] === "o" ||
      s[i] === "u";

    balance += isVowel ? 1 : -1;

    const prefixIndex = i + 1;
    const remainder = prefixIndex % lengthModulo;

    const key = `${balance}#${remainder}`;
    if (frequency.has(key)) {
      answer += frequency.get(key);
    }
    frequency.set(key, (frequency.get(key) || 0) + 1);
  }

  return answer;
};
