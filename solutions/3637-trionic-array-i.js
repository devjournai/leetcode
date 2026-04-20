/**
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var isTrionic = function (nums) {
    const n = nums.length;

    if (n < 4) return false;

    let i = 0;

    while (i + 1 < n && nums[i] < nums[i + 1]) {
        i++;
    }
    if (i === 0) return false;

    let peak = i;

    while (i + 1 < n && nums[i] > nums[i + 1]) {
        i++;
    }
    if (i === peak) return false;

    let valley = i;

    while (i + 1 < n && nums[i] < nums[i + 1]) {
        i++;
    }
    if (i === valley) return false;

    return i === n - 1;
};