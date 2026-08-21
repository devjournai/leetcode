/**
 * Maximum Value of Concatenated Binary Segments
 * Intuition: Let the binary string corresponding to the $i$-th segment be $1^{x_i}0^{y_i}$, where $x_i = \textit{nums1}[i]$ and $y_i = \textit{nums0}[i]$. The problem allows us to rearrange these segments arbitrarily, and the goal is to maximize the integer value represented by the final concatenated binary string. Since comparing binary strings by value is essentially equivalent to comparing them lexicographically, we want as many 1s as possible to appear earlier. Consider the relative order of two segments $A = 1^a0^b$ and $B = 1^c0^d$. If we concatenate them as $AB$ or $BA$, we should clearly choose the one with the larger lexicographical order. Based on this rule, we can derive the following sorting strategy: - If a segment satisfies $y = 0$, it consists only of some 1s. Such segments should be placed as early as possible because they do not introduce any 0 prematurely. Among these segments, the ...
 * Approach: Let the binary string corresponding to the $i$-th segment be $1^{x_i}0^{y_i}$, where $x_i = \textit{nums1}[i]$ and $y_i = \textit{nums0}[i]$. The problem allows us to rearrange these segments arbitrarily, and the goal is to maximize the integer value represented by the final concatenated binary string. Since comparing binary strings by value is essentially equivalent to comparing them lexicographically, we want as many 1s as possible to appear earlier. Consider the relative order of two segments $A = 1^a0^b$ and $B = 1^c0^d$. If we concatenate them as $AB$ or $BA$, we should clearly choose the one with the larger lexicographical order. Based on this rule, we can derive the following sorting strategy: - If a segment satisfies $y = 0$, it consists only of some 1s. Such segments should be placed as early as possible because they do not introduce any 0 prematurely. Among these segments, the ...
 * Dry Run: Input: nums1 = [1,2], nums0 = [1,0] => Output: 14
 * Time Complexity: O(O(n log n + m))
 * Space Complexity: O(O(n + m))
 */
var maxValue = function (nums1, nums0) {
    const MOD = 1_000_000_007;
    const pairs: [number, number][] = [];
    let b = 0;

    for (let i = 0; i < nums1.length; ++i) {
        pairs.push([nums1[i], nums0[i]]);
        b += nums1[i] + nums0[i];
    }

    const group = ([x, y]: [number, number]) => {
        if (y === 0) {
            return 0;
        }
        if (x > 0) {
            return 1;
        }
        return 2;
    };

    pairs.sort((a, c) => {
        const g1 = group(a);
        const g2 = group(c);
        if (g1 !== g2) {
            return g1 - g2;
        }
        if (g1 === 0) {
            return c[0] - a[0];
        }
        if (g1 === 1) {
            if (a[0] !== c[0]) {
                return c[0] - a[0];
            }
            return a[1] - c[1];
        }
        return a[1] - c[1];
    });

    const p = Array(b).fill(1);
    for (let i = 1; i < b; ++i) {
        p[i] = (p[i - 1] * 2) % MOD;
    }

    let ans = 0;
    --b;
    for (let [cnt1, cnt0] of pairs) {
        while (cnt1 > 0) {
            ans = (ans + p[b]) % MOD;
            --b;
            --cnt1;
        }
        b -= cnt0;
    }
    return ans;
}
