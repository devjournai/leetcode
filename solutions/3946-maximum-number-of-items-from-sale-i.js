/**
 * Maximum Number of Items From Sale I
 * Intuition: Since buying the first item of a type is special and yields free items, we consider the first purchased item separately from the later purchases.
 * Approach: Since buying the first item of a type is special and yields free items, we consider the first purchased item separately from the later purchases. For the first purchased item, suppose we spend a budget of i and obtain f[i] items in total, including both the purchased item and the free items. For the later purchases, we can use the remaining budget text{budget} - i to buy the cheapest item, obtaining lfloor frac{text{budget} - i}{text{mn}} rfloor items, where text{mn} is the minimum price among all items. Therefore, we enumerate the budget i spent on the first purchase and compute the maximum value of f[i] + lfloor frac{text{budget} - i}{text{mn}} rfloor, which is the final answer.
 * Dry Run: Input: items = [[6,2],[2,6],[3,4]], budget = 9. Output: 4.
 * Time Complexity: O(n^2+n * m)
 * Space Complexity: O(1)
 */
var maximumSaleItems = function (items, budget) {
  const f = new Array(budget + 1).fill(0);
  let mn = Infinity;

  for (const [factor, price] of items) {
    mn = Math.min(mn, price);

    let cnt = 0;
    for (const [factor_j, _] of items) {
      if (factor_j % factor === 0) {
        cnt++;
      }
    }

    for (let j = budget; j >= price; j--) {
      f[j] = Math.max(f[j], f[j - price] + cnt);
    }
  }

  let ans = 0;
  for (let i = 0; i <= budget; i++) {
    ans = Math.max(ans, f[i] + Math.floor((budget - i) / mn));
  }

  return ans;
};
