/**
 * Minimum Operations to Make Array Parity Alternating
 * Intuition: We can try to transform the array into two different parity-alternating forms: one where even numbers are at even indices and odd numbers are at odd indices, and another where odd numbers are at even indices and even numbers are at odd indices. For each form, we calculate the number of operations needed and the maximum and minimum values of the resulting array. Finally, we choose the plan with fewer operations; if the operation counts are equal, we choose the plan with the smaller difference between the maximum and minimum values. We define a function $f(k)$, where $k$ represents the desired parity of the numbers placed at even indices (where $k=0$ means even and $k=1$ means odd). The function $f(k)$ computes the number of operations needed to transform the array into the corresponding parity-alternating form, as well as the maximum and minimum values of the resulting array. In the funct...
 * Approach: We can try to transform the array into two different parity-alternating forms: one where even numbers are at even indices and odd numbers are at odd indices, and another where odd numbers are at even indices and even numbers are at odd indices. For each form, we calculate the number of operations needed and the maximum and minimum values of the resulting array. Finally, we choose the plan with fewer operations; if the operation counts are equal, we choose the plan with the smaller difference between the maximum and minimum values. We define a function $f(k)$, where $k$ represents the desired parity of the numbers placed at even indices (where $k=0$ means even and $k=1$ means odd). The function $f(k)$ computes the number of operations needed to transform the array into the corresponding parity-alternating form, as well as the maximum and minimum values of the resulting array. In the funct...
 * Dry Run: Input: nums = [-2,-3,1,4] => Output: [2,6]
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(1))
 */
var makeParityAlternating = function (nums) {
    if (nums.length === 1) {
        return [0, 0];
    }

    const mn = Math.min(...nums);
    const mx = Math.max(...nums);

    const f = (k) => {
        let cnt = 0;
        let a = Number.MAX_SAFE_INTEGER;
        let b = Number.MIN_SAFE_INTEGER;

        for (let i = 0; i < nums.length; i++) {
            let x = nums[i];
            if (((x - i) & 1) !== k) {
                cnt++;
                if (x === mn) {
                    ++x;
                } else if (x === mx) {
                    --x;
                }
            }
            a = Math.min(a, x);
            b = Math.max(b, x);
        }
        return [cnt, Math.max(1, b - a)];
    };

    const r0 = f(0);
    const r1 = f(1);

    if (r0[0] !== r1[0]) {
        return r0[0] < r1[0] ? r0 ;
    }
    return r0[1] <= r1[1] ? r0 ;
}
