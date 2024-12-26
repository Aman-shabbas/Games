const createBank = function () {
  const account = {};
  const createUser = userManagement(users, money)
  const viewUsers = function () {
    return users;
  }

  return [createUser, viewUsers];
}

function createMoneyDepositor(money, index) {
  return function (amount) {
    money[index] += amount;
    return "Money added to your bank account";
  };
}

function createBalanceChecker(users, index, money) {
  return function () {
    const userName = users[index];
    const balance = money[index];
    return "user name: " + userName + "   account balance: " + balance;
  };
}

function userManagement(users, money) {
  return function (name) {
    const index = users.push(name) - 1;
    money.push(0);
    const checkBalance = createBalanceChecker(users, index, money);
    const addMoney = createMoneyDepositor(money, index);
    const withdrawMoney = createMoneyWithdrawer(money, index);
    const closeAccount = function () {
      const userName = users.splice(index, 1);
      const remainingAmount = money.splice(index, 1);
      index = -1;
      return "Rupees: " + remainingAmount + "and account: " + userName + " is closed!!"
    }

    return [addMoney, checkBalance, withdrawMoney];
  };
}


function createMoneyWithdrawer(money, index) {
  return function (amount) {
    money[index] -= amount;
    return "Rupees " + amount + " withdrawn from your account";
  };
}

