/**
 * Find Maximum Balanced XOR Subarray Length
 * Intuition: We use a hash table to record the first occurrence position of each state (a, b), where a represents the prefix XOR sum, and b represents the prefix even count minus the prefix odd count. When we encounter the same state (a, b) while traversing the array, it means that the subarray from the last occurrence of this state to the current position satisfies both bitwise XOR equals 0 and equal counts of even and odd numbers. We can then update the answer by taking the maximum length. Otherwise, we store this state and the current position in the hash table.
 * Approach: The time complexity is O(n) and the space complexity is O(n), where n is the length of the array.
 * Dry Run: Input nums = [3,1,3,2,0]. Output 4.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var maxBalancedSubarray = function (nums){
    const d = new Map();
    let ans = 0;
    let a = 0;
    let b = nums.length;
    d.set(BigInt(b), -1);
    for (let i = 0; i < nums.length; ++i) {
        a ^= nums[i];
        b += nums[i] % 2 === 0 ? 1 : -1;
        const key = (BigInt(a) << 32n) | BigInt(b);
        if (d.has(key)) {
            ans = Math.max(ans, i - d.get(key)!);
        } else {
            d.set(key, i);
        }
    }
    return ans;
}
