/**
 * Minimum Lights to Illuminate a Road
 * Intuition: We notice that for each position i, if lights[i] = v where v > 0, then position i is illuminated, and the illumination range is [i - v, i + v]. We can use a difference array to maintain the illumination range at each position.
 * Approach: We notice that for each position i, if lights[i] = v where v > 0, then position i is illuminated, and the illumination range is [i - v, i + v]. We can use a difference array to maintain the illumination range at each position. We define an array d of length n. For each position i, if lights[i] = v where v > 0, we add 1 to d[i - v] and subtract 1 from d[i + v + 1]. Then, we compute the prefix sum of d to obtain the illumination status at each position.
 * Dry Run: Input: lights = [0,0,0,0]. Output: 2.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var minLights = function (lights) {
  const n = lights.length;
  const d = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    const v = lights[i];
    if (v > 0) {
      const l = Math.max(0, i - v);
      const r = Math.min(n - 1, i + v);
      d[l]++;
      if (r + 1 < n) {
        d[r + 1]--;
      }
    }
  }

  let s = 0,
    cnt = 0,
    ans = 0;
  for (const x of d) {
    s += x;
    if (s === 0) {
      cnt++;
    } else {
      ans += Math.floor((cnt + 2) / 3);
      cnt = 0;
    }
  }

  ans += Math.floor((cnt + 2) / 3);
  return ans;
};
