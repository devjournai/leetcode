/**
 * Best Reachable Tower
 * Intuition: We define a variable $\textit{idx}$ to record the index of the current best tower, initially $\textit{idx} = -1$. Then, we traverse each tower and calculate the Manhattan distance $\textit{dist}$ between it and $\textit{center}$: $$ \textit{dist} = |x_i - cx| + |y_i - cy| $$ If $\textit{dist} > \textit{radius}$, the tower is unreachable, so we skip it. Otherwise, we compare the quality factor $q$ of the current tower with that of the best tower: - If $\textit{idx} = -1$, it means no reachable tower has been found yet, so we update $\textit{idx}$ to the current tower's index. - If the current tower's quality factor $q_i$ is greater than the best tower's quality factor $q_{\textit{idx}}$, we update $\textit{idx}$ to the current tower's index. - If the current tower's quality factor $q_i$ is equal to the best tower's quality factor $q_{\textit{idx}}$, we compare the coordinates of the two t...
 * Approach: We define a variable $\textit{idx}$ to record the index of the current best tower, initially $\textit{idx} = -1$. Then, we traverse each tower and calculate the Manhattan distance $\textit{dist}$ between it and $\textit{center}$: $$ \textit{dist} = |x_i - cx| + |y_i - cy| $$ If $\textit{dist} > \textit{radius}$, the tower is unreachable, so we skip it. Otherwise, we compare the quality factor $q$ of the current tower with that of the best tower: - If $\textit{idx} = -1$, it means no reachable tower has been found yet, so we update $\textit{idx}$ to the current tower's index. - If the current tower's quality factor $q_i$ is greater than the best tower's quality factor $q_{\textit{idx}}$, we update $\textit{idx}$ to the current tower's index. - If the current tower's quality factor $q_i$ is equal to the best tower's quality factor $q_{\textit{idx}}$, we compare the coordinates of the two t...
 * Dry Run: Input: towers = [[1,2,5], [2,1,7], [3,1,9]], center = [1,1], radius = 2 => Output: [3,1]
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(1))
 */
var bestTower = function (towers, center, radius) {
  const [cx, cy] = center;
  let idx = -1;
  for (let i = 0; i < towers.length; i++) {
    const [x, y, q] = towers[i];
    const dist = Math.abs(x - cx) + Math.abs(y - cy);
    if (dist > radius) {
      continue;
    }
    if (
      idx === -1 ||
      towers[idx][2] < q ||
      (towers[idx][2] === q &&
        (x < towers[idx][0] || (x === towers[idx][0] && y < towers[idx][1])))
    ) {
      idx = i;
    }
  }
  return idx === -1 ? [-1, -1] : [towers[idx][0], towers[idx][1]];
};
