/**
 * Maximize Points After Choosing K Tasks
 * Intuition: We can first assign all tasks to technique 2, so the initial total score is \sum_{i=0}^{n-1} technique2[i].
 * Approach: Then, we calculate the score increase for each task if it were completed using technique 1 instead, denoted as \text{diff}[i] = technique1[i] - technique2[i]. We sort this in descending order to obtain a sorted array of task indices \text{idx}. Next, we select the first k tasks to be completed using technique 1 and add their score differences to the total score. For the remaining tasks, if a task can increase the score by using technique 1 (i.e., \text{diff}[i] \geq 0), we also choose to complete it using technique 1. The time complexity is O(n \times \log n), and the space complexity is O(n). Where n is the number of tasks.
 * Dry Run: Input technique1 = [5,2,10], technique2 = [10,3,8], k = 2. Output 22.
 * Time Complexity: O(n \times \log n)
 * Space Complexity: O(n)
 */
var maxPoints = function (technique1, technique2, k) {
  const n = technique1.length;
  const idx = Array.from({ length: n }, (_, i) => i);

  idx.sort(
    (i, j) => technique1[j] - technique2[j] - (technique1[i] - technique2[i])
  );

  let ans = technique2.reduce((sum, x) => sum + x, 0);

  for (let i = 0; i < k; i++) {
    const index = idx[i];
    ans -= technique2[index];
    ans += technique1[index];
  }

  for (let i = k; i < n; i++) {
    const index = idx[i];
    if (technique1[index] >= technique2[index]) {
      ans -= technique2[index];
      ans += technique1[index];
    }
  }

  return ans;
};
