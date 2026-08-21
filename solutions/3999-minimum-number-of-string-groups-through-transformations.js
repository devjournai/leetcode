/**
 * Minimum Number of String Groups Through Transformations
 * Intuition: Canonical key: even-index chars as a necklace (min rotation) concatenated with odd-index necklace.
 * Approach: 1. For each word compute even/odd strings, normalize by min cyclic rotation. 2. Count unique pairs of keys.
 * Dry Run: Input: words=[ntgwz,zwntg]. Output: 1.
 * Time Complexity: O(totalLen * L)
 * Space Complexity: O(totalLen)
 */
var minGroups = function (words) {
  const minRot = (s) => {
    if (!s.length) return "";
    let best = s;
    const t = s + s;
    for (let i = 1; i < s.length; i++) {
      const cand = t.slice(i, i + s.length);
      if (cand < best) best = cand;
    }
    return best;
  };
  const set = new Set();
  for (const w of words) {
    let e = "",
      o = "";
    for (let i = 0; i < w.length; i++) i % 2 === 0 ? (e += w[i]) : (o += w[i]);
    set.add(minRot(e) + "#" + minRot(o));
  }
  return set.size;
};
