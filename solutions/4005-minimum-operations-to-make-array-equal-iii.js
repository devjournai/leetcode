/**
 * Minimum Operations to Make Array Equal III
 * Intuition: Multiply/divide maps each number to another by removing or adding prime factors essentially along the integer lattice. Distance between a and b is the number of multiplies/divides = big-step? Each op multiplies or divides by k>=2, so it's the difference in omega of going through gcd: ops from a to g is number of division steps until g, not unique. Distance a to b = dist(a,gcd)+dist(b,gcd) where dist(x,g) is the min divisions from x down to g (must divide chain). That's just 1 if x/g is integer >1? You can divide by x/g once if x/g>=2. So any x can reach any divisor g in one division if x!=g. Multiply similarly one step from g to y. So dist(a,b) is 0 if equal, 1 if one divides the other, 2 otherwise (meet at gcd). Then make all equal to some T: sum dist(nums[i], T). T should be a divisor-related value. If any pair doesn't share gcd path, T=gcd of all or 1.
 * Approach: If all equal 0. Else try T=1: each x>1 needs one divide to 1. Try gcd of all: each nums[i]/g ==1 ->0 else 1. Min over possible T among gcd-related. Example [6,12,8]->3 to 6: 12/2=6 (1), 8/4=2 (1), 2*3=6 (1)=3. So T not necessarily gcd.
 * Dry Run: Input: nums=[6,12,8]. Output: 3.
 * Time Complexity: O(N sqrt A)
 * Space Complexity: O(N)
 */
var minOperations = function (nums) {
  const gcd = (a, b) => {
    while (b) [a, b] = [b, a % b];
    return a;
  };
  if (nums.every((x) => x === nums[0])) return 0;
  const uniq = [...new Set(nums)];
  let ans = Infinity;
  const dist = (a, t) => {
    if (a === t) return 0;
    if (a % t === 0 || t % a === 0) return 1;
    const g = gcd(a, t);
    return (a === g ? 0 : 1) + (t === g ? 0 : 1);
  };
  const cands = new Set([1]);
  for (const x of uniq) {
    for (let d = 1; d * d <= x; d++)
      if (x % d === 0) {
        cands.add(d);
        cands.add(x / d);
      }
  }
  for (const t of cands) {
    let s = 0;
    for (const x of nums) s += dist(x, t);
    ans = Math.min(ans, s);
  }
  return ans;
};
