/**
 * Construct Product Matrix
 * Intuition: Each result cell is the product of every other cell modulo 12345, so flatten the grid and combine prefix and suffix products around index k.
 * Approach: 1. Flatten `grid` into `flatGrid`. 2. Build `prefixProducts[k]` and `suffixProducts[k]` modulo 12345. 3. For each k, multiply prefix[k-1] (if k>0) by suffix[k+1] (if k<N-1). 4. Write that product back into `result[row][col]`.
 * Dry Run: grid = [[1,2],[3,4]], MOD=12345. prefix=[1,2,6,24], suffix=[24,24,12,4]. k=0 → 24; k=1 → 1*12=12; k=2 → 2*4=8; k=3 → 6. Result [[24,12],[8,6]].
 * Time Complexity: O(n * m)
 * Space Complexity: O(n * m)
 */
var constructProductMatrix = function (grid) {
  const n = grid.length;
  const m = grid[0].length;
  const MOD = 12345;
  const N = n * m;

  const flatGrid = new Array(N);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      flatGrid[i * m + j] = grid[i][j];
    }
  }

  const prefixProducts = new Array(N);
  prefixProducts[0] = flatGrid[0] % MOD;
  for (let k = 1; k < N; k++) {
    prefixProducts[k] = (prefixProducts[k - 1] * (flatGrid[k] % MOD)) % MOD;
  }

  const suffixProducts = new Array(N);
  suffixProducts[N - 1] = flatGrid[N - 1] % MOD;
  for (let k = N - 2; k >= 0; k--) {
    suffixProducts[k] = (suffixProducts[k + 1] * (flatGrid[k] % MOD)) % MOD;
  }

  const result = new Array(n).fill(0).map(() => new Array(m));

  for (let k = 0; k < N; k++) {
    let currentProduct = 1;

    if (k > 0) {
      currentProduct = (currentProduct * prefixProducts[k - 1]) % MOD;
    }
    if (k < N - 1) {
      currentProduct = (currentProduct * suffixProducts[k + 1]) % MOD;
    }

    const row = Math.floor(k / m);
    const col = k % m;
    result[row][col] = currentProduct;
  }

  return result;
};
