const createMessage = {
  deposit: (amount) => "Rupees " + amount + " is deposit from account",
  withdraw: (amount) => "Rupees " + amount + " is withdrawn from account",
  trasfer: (amount, reciever) => "Rupees " + amount + " is trnsfered to " + reciever,
  balance: (user) => "Your current balance is " + user.balance,
}

const deposit = function (user) {
  return function (amount) {
    user.balance += amount;
    const depositMessage = createMessage.deposit(amount);
    const balanceMessage = createMessage.balance(user);
    console.log(depositMessage, balanceMessage);
  }
}

const withdraw = function (user) {
  return function (amount) {
    if (user.balance < amount) {
      console.log("Insufficient balance");
      return;
    }
    user.balance -= amount;
    const withdrawMessage = createMessage.withdraw(amount);
    const balanceMessage = createMessage.balance(user);
    console.log(withdrawMessage, balanceMessage);
  }
}

const createTransfer = function (user, accounts) {
  return function (amount, recieverAcntNumb) {
    if (user.balance < amount) {
      console.log("Insufficient balance");
      return;
    }
    const reciever = accounts.find(({ number }) => number === recieverAcntNumb);
    user.balance -= amount;
    reciever.balance += amount;
    const transferMessage = createMessage.trasfer(amount, reciever.name);
    console.log(transferMessage);
  }
}

const createAddUser = function (accounts) {
  return function () {
    const userName = prompt("Enter the name of the user: ");
    const user = { name: userName, number: 0, balance: 0 };
    const uniqueId = accounts.push(user);
    const accountNumber = 1020 + uniqueId;
    user.number = accountNumber;
    console.log("Your account number is: ", accountNumber);
    return {
      deposit: deposit(user),
      withdraw: withdraw(user),
      transfer: createTransfer(user, accounts),
      checkBalance: () => console.log(createMessage.balance(user)),
    };
  }
}

const createBank = function () {
  const accounts = [];
  const viewAccounts = () => accounts.map((account) => account);

  return { viewAccounts: viewAccounts, addUser: createAddUser(accounts) };
}

