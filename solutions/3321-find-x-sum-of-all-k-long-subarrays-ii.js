/**
 * Find X-Sum of All K-Long Subarrays II
 * Intuition: Same as 3318 but n is large. Keep the current top-x (freq, value) pairs in one ordered set and the rest in another, and maintain their weighted sum while the window slides.
 * Approach: 1. `update` removes the old (freq, num) pair, applies +/-1, and reinserts into bot. 2. Promote from bot until top has x elements. 3. Swap if bot’s max exceeds top’s min. 4. Record windowSum after each full window.
 * Dry Run: nums = [1,1,2,2,3,4], k = 4, x = 2
 *   - Window sums 6, 7, 8 as in 3318
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var findXSum = function (nums, k, x) {
  const cmp = (a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);

  const lowerBound = (arr, item) => {
    let lo = 0;
    let hi = arr.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cmp(arr[mid], item) < 0) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    return lo;
  };

  const slAdd = (arr, item) => {
    arr.splice(lowerBound(arr, item), 0, item);
  };

  const slRemove = (arr, item) => {
    arr.splice(lowerBound(arr, item), 1);
  };

  const slHas = (arr, item) => {
    const i = lowerBound(arr, item);
    return i < arr.length && arr[i][0] === item[0] && arr[i][1] === item[1];
  };

  const ans = [];
  let windowSum = 0;
  const count = new Map();
  const top = [];
  const bot = [];

  const update = (num, freq) => {
    const old = count.get(num) || 0;
    if (old > 0) {
      const pair = [old, num];
      if (slHas(bot, pair)) {
        slRemove(bot, pair);
      } else {
        slRemove(top, pair);
        windowSum -= num * old;
      }
    }
    const next = old + freq;
    count.set(num, next);
    if (next > 0) {
      slAdd(bot, [next, num]);
    }
  };

  for (let i = 0; i < nums.length; i++) {
    update(nums[i], 1);
    if (i >= k) {
      update(nums[i - k], -1);
    }
    while (bot.length > 0 && top.length < x) {
      const [countB, b] = bot.pop();
      slAdd(top, [countB, b]);
      windowSum += b * countB;
    }
    while (
      bot.length > 0 &&
      top.length > 0 &&
      cmp(bot[bot.length - 1], top[0]) > 0
    ) {
      const [countB, b] = bot.pop();
      const [countT, t] = top.shift();
      slAdd(bot, [countT, t]);
      slAdd(top, [countB, b]);
      windowSum += b * countB;
      windowSum -= t * countT;
    }
    if (i >= k - 1) {
      ans.push(windowSum);
    }
  }

  return ans;
};
