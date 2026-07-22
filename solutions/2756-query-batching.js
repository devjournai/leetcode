/**
 * Query Batching
 * Intuition: The problem requires a combination of "leading-edge" execution for the first request after an idle period and "trailing-edge" batching for subsequent requests within a throttle window. This means the first call immediately triggers a `queryMultiple` call, establishing a cooldown period. Any calls during this cooldown are batched, and the accumulated batch is executed once the cooldown expires.
 * Approach: 1. The `QueryBatcher` maintains `pendingRequests` (to store keys and their Promise resolvers), `batchTimer` (for the trailing-edge execution), and `lastQueryStartTime` (the timestamp when `queryMultiple` was last invoked). 2. When `getValue` is called, the request is added to `pendingRequests`. 3. If it's the very first call (`lastQueryStartTime` is 0) or if the time since the last `queryMultiple` invocation (`lastQueryStartTime`) exceeds `throttleDuration`, then `executeBatchProcess` is invoked immediately. This handles the "first call immediate" rule. 4. Otherwise, a `batchTimer` is set (or reset if already active) to trigger `executeBatchProcess` exactly `throttleDuration` milliseconds after `lastQueryStartTime`. This handles batching subsequent requests and the trailing-edge execution. 5. The `executeBatchProcess` method takes the current `pendingRequests`, clears the `pendingRequests` array for the next cycle, updates `lastQueryStartTime` to the current time, calls `queryMultiple` with the collected keys, and finally resolves each individual Promise with its corresponding result.
 * Dry Run: throttleTime = 400ms
 * Initial: lastQueryStartTime = 0, pendingRequests = [], batchTimer = null.
 *
 * t=0: getValue('A')
 *   - Push {key: 'A', resolve: A_resolve} to pendingRequests. `pendingRequests = [{A}]`.
 *   - `currentTime = 0`, `timeSinceLastQuery = 0 - 0 = 0`.
 *   - `batchTimer` is null.
 *   - `lastQueryStartTime === 0` (true) -> Call `executeBatchProcess()`.
 *     - Inside `executeBatchProcess` (effectively at t=0):
 *       - `batchTimer` is null.
 *       - `currentRequestsToProcess = [{A}]`. `pendingRequests = []`.
 *       - `keysToQuery = ['A']`.
 *       - `lastQueryStartTime = 0` (Date.now()).
 *       - `await queryMultiple(['A'])`. Let's assume this resolves quickly.
 *       - `A_resolve(resultOfA)`.
 *
 * t=100: getValue('B')
 *   - Push {key: 'B', resolve: B_resolve} to pendingRequests. `pendingRequests = [{B}]`.
 *   - `currentTime = 100`, `timeSinceLastQuery = 100 - 0 = 100`.
 *   - `batchTimer` is null.
 *   - `lastQueryStartTime === 0` (false). `timeSinceLastQuery >= throttleDuration` (100 >= 400) (false).
 *   - Else branch: `delayForBatch = Math.max(0, throttleDuration - timeSinceLastQuery) = Math.max(0, 400 - 100) = 300`.
 *   - `batchTimer = setTimeout(() => executeBatchProcess(), 300)` (scheduled to fire at t=100+300 = t=400).
 *
 * t=200: getValue('C')
 *   - Push {key: 'C', resolve: C_resolve} to pendingRequests. `pendingRequests = [{B}, {C}]`.
 *   - `currentTime = 200`, `timeSinceLastQuery = 200 - 0 = 200`.
 *   - `batchTimer` is not null -> `clearTimeout(existingTimer_from_t100)`. `batchTimer = null`.
 *   - `lastQueryStartTime === 0` (false). `timeSinceLastQuery >= throttleDuration` (200 >= 400) (false).
 *   - Else branch: `delayForBatch = Math.max(0, throttleDuration - timeSinceLastQuery) = Math.max(0, 400 - 200) = 200`.
 *   - `batchTimer = setTimeout(() => executeBatchProcess(), 200)` (scheduled to fire at t=200+200 = t=400).
 *
 * t=400: executeBatchProcess() fires (from setTimeout set at t=200)
 *   - `batchTimer` is not null -> `clearTimeout`. `batchTimer = null`.
 *   - `currentRequestsToProcess = [{B}, {C}]`. `pendingRequests = []`.
 *   - `keysToQuery = ['B', 'C']`.
 *   - `lastQueryStartTime = 400` (Date.now()).
 *   - `await queryMultiple(['B', 'C'])`. Let's assume this resolves quickly.
 *   - `B_resolve(resultOfB)`, `C_resolve(resultOfC)`.
 *
 * This dry run perfectly matches the provided diagram and all specified rules.
 * Time Complexity: O(1)
 * Space Complexity: O(K)
 */
var QueryBatcher = function (queryMultipleFunction, throttleTimeValue) {
  this.queryMultiple = queryMultipleFunction;
  this.throttleDuration = throttleTimeValue;
  this.pendingRequests = [];
  this.batchTimer = null;
  this.lastQueryStartTime = 0;
};

/**
 * @param {string} key
 * @return {Promise<string>}
 */
QueryBatcher.prototype.getValue = function (inputKey) {
  return new Promise((singleKeyResolve) => {
    const requestItem = { key: inputKey, singleKeyResolve };
    this.pendingRequests.push(requestItem);

    const currentMoment = Date.now();
    const timeSinceLastCall = currentMoment - this.lastQueryStartTime;

    if (this.batchTimer) {
      clearTimeout(this.batchTimer);
      this.batchTimer = null;
    }

    if (
      this.lastQueryStartTime === 0 ||
      timeSinceLastCall >= this.throttleDuration
    ) {
      this.executeBatchProcess();
    } else {
      const remainingDelay = Math.max(
        0,
        this.throttleDuration - timeSinceLastCall,
      );
      this.batchTimer = setTimeout(() => {
        this.executeBatchProcess();
      }, remainingDelay);
    }
  });
};

/**
 * @return {Promise<void>}
 */
QueryBatcher.prototype.executeBatchProcess = async function () {
  if (this.batchTimer) {
    clearTimeout(this.batchTimer);
    this.batchTimer = null;
  }

  const currentRequestsToProcess = this.pendingRequests.slice();
  this.pendingRequests = [];

  if (currentRequestsToProcess.length === 0) {
    return;
  }

  const keysToQuery = currentRequestsToProcess.map(
    (requestObject) => requestObject.key,
  );

  this.lastQueryStartTime = Date.now();

  const queryResults = await this.queryMultiple(keysToQuery);

  for (
    let resultIndex = 0;
    resultIndex < currentRequestsToProcess.length;
    resultIndex++
  ) {
    currentRequestsToProcess[resultIndex].singleKeyResolve(
      queryResults[resultIndex],
    );
  }
};
