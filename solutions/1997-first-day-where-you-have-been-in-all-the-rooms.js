/**
 * First Day Where You Have Been In All The Rooms
 * Intuition: The problem asks for the first day label when all rooms 0 to n-1 have been visited. This suggests a dynamic programming approach where we build up the solution for increasingly larger sets of rooms. The challenge lies in the conditional next visit rules, especially when directed back to a previous room. We can define `dp[i]` as the label of the day on which we have completed processing room `i` (i.e., visited it an even number of times) and are consequently ready to visit room `i+1`.
 * Approach:
 * 1. Define `dp[i]` as the day label (0-indexed, but calculations effectively become 1-indexed for convenience) when room `i` has just been visited for an even number of times, and we are ready to move to room `i+1`. The final answer will be `dp[n-1]`.
 * 2. Initialize `dp` array of size `n`.
 * 3. Base Case (`dp[0]`): On Day 0, we visit room 0 (1st time, odd count). Since `nextVisit[0]` must be 0 (as `nextVisit[i] <= i`), on Day 1, we visit room 0 again (2nd time, even count). At the end of Day 1, room 0 is processed, and we are ready for room 1. Thus, `dp[0] = 1`.
 * 4. Iterative Step (for `i` from 1 to `n-1`): To calculate `dp[i]`:
 *    a. We have already reached the state where room `i-1` is processed, and we are about to visit room `i`. This occurs on day `dp[i-1]`.
 *    b. On day `dp[i-1]`, we visit room `i` for the first time. Since its visit count is odd, on the next day (`dp[i-1] + 1`), we visit `nextVisit[i]`.
 *    c. From `nextVisit[i]`, we need to travel back to room `i` to visit it a second time. This path involves re-processing rooms from `nextVisit[i]` up to `i-1`. The time taken to transition from being ready for `nextVisit[i]+1` to being ready for `i` is `dp[i-1] - dp[nextVisit[i]]` days.
 *    d. So, the total days accumulated to reach room `i` for the second time are `dp[i-1]` (initial days to reach room `i` first time) + `1` (day to go from `i` to `nextVisit[i]`) + `(dp[i-1] - dp[nextVisit[i]])` (days to re-process segment `nextVisit[i]` to `i-1`) + `1` (day to visit `i` second time).
 *    e. This simplifies to `dp[i] = (2 * dp[i-1] + 2 - dp[nextVisit[i]] + MOD) % MOD`. We add `MOD` before the final modulo operation to handle potential negative results from subtraction.
 * 5. The final answer is `dp[n-1]`. This represents the day label when room `n-1` has been visited an even number of times, signifying that all rooms `0` through `n-1` have been visited at least once, and this is the first such day.
 * Dry Run: `n=3, nextVisit=[0,1,0]`
 * `MOD = 1e9 + 7`
 * `dp` array of size 3: `[0, 0, 0]`
 *
 * 1. Initialize `dp[0] = 1`. (On day 1, room 0 is visited for the 2nd time, ready for room 1).
 *
 * 2. Loop for `i = 1`:
 *    `advanceIndex = nextVisit[i-1]` which is `nextVisit[0] = 0`.
 *    `dp[1] = (2 * dp[0] + 2 - dp[advanceIndex] + MOD) % MOD`
 *    `dp[1] = (2 * 1 + 2 - dp[0] + MOD) % MOD` (since `advanceIndex` is 0)
 *    `dp[1] = (2 + 2 - 1 + MOD) % MOD = 3`.
 *    (On day 3, room 1 is visited for the 2nd time, ready for room 2).
 *
 * 3. Loop for `i = 2`:
 *    `advanceIndex = nextVisit[i-1]` which is `nextVisit[1] = 1`.
 *    `dp[2] = (2 * dp[1] + 2 - dp[advanceIndex] + MOD) % MOD`
 *    `dp[2] = (2 * 3 + 2 - dp[1] + MOD) % MOD` (since `advanceIndex` is 1)
 *    `dp[2] = (6 + 2 - 3 + MOD) % MOD = 5`.
 *    (On day 5, room 2 is visited for the 2nd time, ready for room 3).
 *
 * 4. Return `dp[n-1] = dp[2] = 5`.
 *    Manual Trace Verification:
 *    Day 0: Visit 0 (count 1, odd). Next `nextVisit[0]=0`.
 *    Day 1: Visit 0 (count 2, even). Next `(0+1)%3=1`.
 *    Day 2: Visit 1 (count 1, odd). Next `nextVisit[1]=1`.
 *    Day 3: Visit 1 (count 2, even). Next `(1+1)%3=2`.
 *    Day 4: Visit 2 (count 1, odd). Next `nextVisit[2]=0`.
 *    At the end of Day 4, rooms {0,1,2} have all been visited. The day label is 4.
 *    The `dp[n-1]` value is the *total count of days passed including day 0*, meaning `day_label + 1`. So `5` days passed (Day 0 to Day 4). This matches.
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var firstDayBeenInAllRooms = function (nextVisit) {
  const MOD = 1e9 + 7;
  const roomCount = nextVisit.length;
  const daysPassed = new Array(roomCount).fill(0);

  daysPassed[0] = 1;

  for (
    let currentRoomIndex = 1;
    currentRoomIndex < roomCount;
    currentRoomIndex++
  ) {
    const previousRoomDays = daysPassed[currentRoomIndex - 1];
    const advancePointer = nextVisit[currentRoomIndex - 1];
    const advancePointerDays = daysPassed[advancePointer];

    daysPassed[currentRoomIndex] =
      (2 * previousRoomDays + 2 - advancePointerDays + MOD) % MOD;
  }

  return daysPassed[roomCount - 1];
};
