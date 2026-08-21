/**
 * Generate Schedule
 * Intuition: n < 5 cannot rest every team between consecutive days. For larger n, circle-method directed rounds with difference l can be sequenced so consecutive matches are disjoint.
 * Approach: 1. Return [] if n <= 4. 2. Emit home/away pairs of difference 1, reversing legs. 3. For each later difference, start after the previous match so teams do not repeat on consecutive days. 4. For even n, finish with difference n/2.
 * Dry Run: n = 3 has 6 matches and is impossible → []. n = 5 yields 20 directed matches with rest days between any team's games.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var generateSchedule = function (n) {
  const schedule = [];
  if (n <= 4) {
    return schedule;
  }

  let offset = 1;
  if (n % 2 === 0) {
    for (let team = 0; team < n; team += 2) {
      schedule.push([team, team + offset]);
    }
    for (let team = 0; team < n; team += 2) {
      schedule.push([team + offset, team]);
    }
    for (let team = 1; team < n; team += 2) {
      schedule.push([team, (team + offset) % n]);
    }
    for (let team = 1; team < n; team += 2) {
      schedule.push([(team + offset) % n, team]);
    }
  } else {
    for (let team = 0; team < 2 * n; team += 2) {
      schedule.push([team % n, (team + offset) % n]);
    }
    for (let team = 0; team < 2 * n; team += 2) {
      schedule.push([(team + offset) % n, team % n]);
    }
  }

  for (offset = 2; offset < Math.floor((n + 1) / 2); offset++) {
    let start = schedule[schedule.length - 1][0] + 1;
    for (let team = start; team < start + n; team++) {
      schedule.push([team % n, (team + offset) % n]);
    }
    start = schedule[schedule.length - 1][1] - 1;
    for (let team = start; team < start + n; team++) {
      schedule.push([(team + offset) % n, team % n]);
    }
  }

  if (n % 2 === 0) {
    offset = n / 2;
    const start = schedule[schedule.length - 1][0] - 1;
    for (let team = start; team < start + n; team++) {
      schedule.push([team % n, (team + offset) % n]);
    }
  }
  return schedule;
};
