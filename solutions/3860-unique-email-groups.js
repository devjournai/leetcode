/**
 * Unique Email Groups
 * Intuition: We can use a hash set $\textit{st}$ to store the normalized result of each email address. For each email address, we normalize it according to the problem requirements: - Split the email address into a local name and a domain name. - For the local name, remove all dots ., and if a plus sign + exists, remove the plus sign and everything after it. Then convert the local name to lowercase. - For the domain name, convert it to lowercase. - Concatenate the normalized local name and domain name to obtain the normalized email address, and add it to the hash set $\textit{st}$. Finally, the number of elements in the hash set $\textit{st}$ is the number of unique email groups. The time complexity is $O(n \cdot m)$, where $n$ and $m$ are the number of email addresses and the average length of each email address, respectively. The space complexity is $O(n \cdot m)$, in the worst case where all email...
 * Approach: We can use a hash set $\textit{st}$ to store the normalized result of each email address. For each email address, we normalize it according to the problem requirements: - Split the email address into a local name and a domain name. - For the local name, remove all dots ., and if a plus sign + exists, remove the plus sign and everything after it. Then convert the local name to lowercase. - For the domain name, convert it to lowercase. - Concatenate the normalized local name and domain name to obtain the normalized email address, and add it to the hash set $\textit{st}$. Finally, the number of elements in the hash set $\textit{st}$ is the number of unique email groups. The time complexity is $O(n \cdot m)$, where $n$ and $m$ are the number of email addresses and the average length of each email address, respectively. The space complexity is $O(n \cdot m)$, in the worst case where all email...
 * Dry Run: Input: emails = [&quot;test.email+alex@leetcode.com&quot;, &quot;test.e.mail+bob.cathy@leetcode.com&quot;, &quot;testemail+david@lee.tcode.com&quot;] => Output: 2
 * Time Complexity: O(O(n cdot m))
 * Space Complexity: O(O(n cdot m))
 */
var uniqueEmailGroups = function (emails) {
  const st = new Set();

  for (const email of emails) {
    let [local, domain] = email.split("@");
    local = local.split("+")[0].replace(/\./g, "").toLowerCase();
    domain = domain.toLowerCase();

    const normalized = local + domain;
    st.add(normalized);
  }

  return st.size;
};
