/**
 * Maximum Team Size with Overlapping Intervals
 * Intuition: We first combine each employee's start and end times into an interval array, $\textit{intervals}$, and sort all start times and end times separately. For each employee $i$, we use binary search to compute how many employees have end times not earlier than employee $i$'s start time, and how many employees have start times not later than employee $i$'s end time. The difference between these two counts is the number of employees whose intervals overlap with employee $i$. We iterate through all employees, compute the overlap count for each one, and take the maximum as the answer. The time complexity is $O(n \times \log n)$, and the space complexity is $O(n)$, where $n$ is the number of employees.
 * Approach: We first combine each employee's start and end times into an interval array, $\textit{intervals}$, and sort all start times and end times separately. For each employee $i$, we use binary search to compute how many employees have end times not earlier than employee $i$'s start time, and how many employees have start times not later than employee $i$'s end time. The difference between these two counts is the number of employees whose intervals overlap with employee $i$. We iterate through all employees, compute the overlap count for each one, and take the maximum as the answer. The time complexity is $O(n \times \log n)$, and the space complexity is $O(n)$, where $n$ is the number of employees.
 * Dry Run: Input: startTime = [1,2,3], endTime = [4,5,6] => Output: 3
 * Time Complexity: O(O(n * log n))
 * Space Complexity: O(O(n))
 */
var maximumTeamSize = function (startTime, endTime) {
    const n = startTime.length;
    const intervals: [number, number][] = Array.from({ length }, (_, i) => [
        startTime[i],
        endTime[i],
    ]);

    startTime.sort((a, b) => a - b);
    endTime.sort((a, b) => a - b);

    let ans = 0;
    for (const [l, r] of intervals) {
        const i = search(endTime, l - 1);
        const j = search(startTime, r);

        ans = Math.max(ans, j - i);
    }

    return ans;
}

var search = function (arr, x) {
    let l = 0;
    let r = arr.length;
    while (l < r) {
        const mid = (l + r) >> 1;
        if (arr[mid] > x) {
            r = mid;
        } else {
            l = mid + 1;
        }
    }
    return l;
}
