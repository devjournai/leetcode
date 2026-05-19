/**
 * Simple Bank System
 * Intuition: A bank system manages account balances and processes transactions (transfer, deposit, withdraw) only if they are valid. Validity requires checking account existence and ensuring sufficient funds for outgoing transactions.
 * Approach: 1. The Bank constructor initializes an internal array to store account balances and the total count of accounts. 2. The `transfer` method validates both source and destination accounts' existence sequentially, then checks for sufficient funds in the source account. If all checks pass, it updates balances. 3. The `deposit` method validates the target account's existence first, then updates its balance. 4. The `withdraw` method combines the validation of account existence and sufficient funds using a logical OR condition. If valid, it updates the balance. All account numbers (1-indexed) are converted to array indices (0-indexed) for internal access.
 * Dry Run:
 * `balance = [10, 100, 20, 50, 30]`
 * `Bank bank = new Bank(balance)`
 * `this.accountBalances` becomes `[10, 100, 20, 50, 30]`. `this.totalAccountCount` becomes `5`.
 *
 * 1. `bank.withdraw(3, 10)`:
 *    - `withdrawalAccountIdentifier = 3`, `withdrawalAmount = 10`.
 *    - `withdrawAccountIndex = 2`.
 *    - `accountOutOfBoundsWithdraw` (`3 > 5`) is `false`. `balanceTooLowForWithdraw` (`this.accountBalances[2]` (20) < 10) is `false`.
 *    - `false || false` is `false`, so proceeds.
 *    - `this.accountBalances[2]` becomes `20 - 10 = 10`.
 *    - `this.accountBalances` is now `[10, 100, 10, 50, 30]`.
 *    - Returns `true`.
 *
 * 2. `bank.transfer(5, 1, 20)`:
 *    - `sourceAccountIdentifier = 5`, `destinationAccountIdentifier = 1`, `transferAmount = 20`.
 *    - `sourceIndexForTransfer = 4`, `destinationIndexForTransfer = 0`.
 *    - `sourceAccountInvalid` (`5 > 5`) is `false`. `destinationAccountInvalid` (`1 > 5`) is `false`. `insufficientFundsForTransfer` (`this.accountBalances[4]` (30) < 20) is `false`.
 *    - All sequential `if` checks pass.
 *    - `this.accountBalances[4]` becomes `30 - 20 = 10`. `this.accountBalances[0]` becomes `10 + 20 = 30`.
 *    - `this.accountBalances` is now `[30, 100, 10, 50, 10]`.
 *    - Returns `true`.
 *
 * 3. `bank.deposit(2, 50)`:
 *    - `targetAccountIdentifier = 2`, `depositAmount = 50`.
 *    - `depositAccountIndex = 1`.
 *    - `invalidDepositAccount` (`2 > 5`) is `false`.
 *    - `if` check passes.
 *    - `this.accountBalances[1]` becomes `100 + 50 = 150`.
 *    - `this.accountBalances` is now `[30, 150, 10, 50, 10]`.
 *    - Returns `true`.
 *
 * 4. `bank.transfer(6, 1, 20)`:
 *    - `sourceAccountIdentifier = 6`, `destinationAccountIdentifier = 1`, `transferAmount = 20`.
 *    - `sourceAccountInvalid` (`6 > 5`) is `true`.
 *    - Returns `false`.
 *
 * 5. `bank.withdraw(1, 100)`:
 *    - `withdrawalAccountIdentifier = 1`, `withdrawalAmount = 100`.
 *    - `withdrawAccountIndex = 0`.
 *    - `accountOutOfBoundsWithdraw` (`1 > 5`) is `false`. `balanceTooLowForWithdraw` (`this.accountBalances[0]` (30) < 100) is `true`.
 *    - `false || true` is `true`.
 *    - Returns `false`.
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
var Bank = function (initialBalancesArray) {
  this.accountBalances = initialBalancesArray;
  this.totalAccountCount = initialBalancesArray.length;
};

Bank.prototype.transfer = function (
  sourceAccountIdentifier,
  destinationAccountIdentifier,
  transferAmount,
) {
  const sourceIndexForTransfer = sourceAccountIdentifier - 1;
  const destinationIndexForTransfer = destinationAccountIdentifier - 1;

  const sourceAccountInvalid =
    sourceAccountIdentifier > this.totalAccountCount ||
    sourceAccountIdentifier < 1;
  if (sourceAccountInvalid) {
    return false;
  }

  const destinationAccountInvalid =
    destinationAccountIdentifier > this.totalAccountCount ||
    destinationAccountIdentifier < 1;
  if (destinationAccountInvalid) {
    return false;
  }

  const insufficientFundsForTransfer =
    this.accountBalances[sourceIndexForTransfer] < transferAmount;
  if (insufficientFundsForTransfer) {
    return false;
  }

  this.accountBalances[sourceIndexForTransfer] -= transferAmount;
  this.accountBalances[destinationIndexForTransfer] += transferAmount;
  return true;
};

Bank.prototype.deposit = function (targetAccountIdentifier, depositAmount) {
  const depositAccountIndex = targetAccountIdentifier - 1;
  const invalidDepositAccount =
    targetAccountIdentifier > this.totalAccountCount ||
    targetAccountIdentifier < 1;

  if (invalidDepositAccount) {
    return false;
  }

  this.accountBalances[depositAccountIndex] += depositAmount;
  return true;
};

Bank.prototype.withdraw = function (
  withdrawalAccountIdentifier,
  withdrawalAmount,
) {
  const withdrawAccountIndex = withdrawalAccountIdentifier - 1;
  const accountOutOfBoundsWithdraw =
    withdrawalAccountIdentifier > this.totalAccountCount ||
    withdrawalAccountIdentifier < 1;
  const balanceTooLowForWithdraw =
    this.accountBalances[withdrawAccountIndex] < withdrawalAmount;

  if (accountOutOfBoundsWithdraw || balanceTooLowForWithdraw) {
    return false;
  }

  this.accountBalances[withdrawAccountIndex] -= withdrawalAmount;
  return true;
};
