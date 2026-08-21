/**
 * Number of Alternating XOR Partitions
 * Intuition: We define two hash tables $\textit{cnt1}$ and $\textit{cnt2}$, where $\textit{cnt1}[x]$ represents the number of partition schemes where the bitwise XOR result is $x$ and the partition ends with $\textit{target1}$, while $\textit{cnt2}[x]$ represents the number of partition schemes where the bitwise XOR result is $x$ and the partition ends with $\textit{target2}$. Initially, $\textit{cnt2}[0] = 1$, representing an empty partition. We use the variable $\textit{pre}$ to record the bitwise XOR result of the current prefix, and the variable $\textit{ans}$ to record the final answer. Then we traverse the array $\textit{nums}$. For each element $x$, we update $\textit{pre}$ and calculate: $$ a = \textit{cnt2}[\textit{pre} \oplus \textit{target1}] $$ $$ b = \textit{cnt1}[\textit{pre} \oplus \textit{target2}] $$ Then we update the answer: $$ \textit{ans} = (a + b) \mod (10^9 + 7) $$ Next, we upd...
 * Approach: We define two hash tables $\textit{cnt1}$ and $\textit{cnt2}$, where $\textit{cnt1}[x]$ represents the number of partition schemes where the bitwise XOR result is $x$ and the partition ends with $\textit{target1}$, while $\textit{cnt2}[x]$ represents the number of partition schemes where the bitwise XOR result is $x$ and the partition ends with $\textit{target2}$. Initially, $\textit{cnt2}[0] = 1$, representing an empty partition. We use the variable $\textit{pre}$ to record the bitwise XOR result of the current prefix, and the variable $\textit{ans}$ to record the final answer. Then we traverse the array $\textit{nums}$. For each element $x$, we update $\textit{pre}$ and calculate: $$ a = \textit{cnt2}[\textit{pre} \oplus \textit{target1}] $$ $$ b = \textit{cnt1}[\textit{pre} \oplus \textit{target2}] $$ Then we update the answer: $$ \textit{ans} = (a + b) \mod (10^9 + 7) $$ Next, we upd...
 * Dry Run: Input: nums = [2,3,1,4], target1 = 1, target2 = 5 => Output: 1
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
var alternatingXOR = function (nums, target1, target2) {
  const MOD = 1_000_000_007;
  const cnt1 = new Map();
  const cnt2 = new Map();
  cnt2.set(0, 1);

  let pre = 0;
  let ans = 0;

  for (const x of nums) {
    pre ^= x;
    const a = cnt2.get(pre ^ target1) ?? 0;
    const b = cnt1.get(pre ^ target2) ?? 0;
    ans = (a + b) % MOD;
    cnt1.set(pre, ((cnt1.get(pre) ?? 0) + a) % MOD);
    cnt2.set(pre, ((cnt2.get(pre) ?? 0) + b) % MOD);
  }

  return ans;
};
