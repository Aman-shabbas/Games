function isNumInRange(rngStart, rngEnd, num) {
  return rngStart <= num && num <= rngEnd;
}

function randomInRange(rngStart, rngEnd) {
  const random = Math.floor(Math.random() * 100);
  if (isNumInRange(rngStart, rngEnd, random)) {
    return random;
  }
  return randomInRange(rngStart, rngEnd);
}

function wait(time) {
  time = time * 1000000000;
  while (time > 0) {
    time--;
  }
}

function validateOTP(Otp) {
  let chances = 3;
  while (chances > 0) {
    const guess = +prompt("Guess (chance: " + (4 - chances) + "): ");
    if (guess === Otp) {
      return "🎉🎊Congratulation, Validated...🎊🎉";
    }

    if (guess < Otp) {
      console.log("\nCLUE (again): OTP is greater than the guess..")
    } else {
      console.log("\nCLUE (again): OTP is less than the guess..")
    }
    chances -= 1;
  }

  return "❌❌Its time to realise that you are not Intelligent..❌❌";
}

function colectDetails() {
  const name = prompt("Enter your name: ");
  const phone = prompt("Enter Phone number: ");
  const randomNumber = randomInRange(1, 10);

  wait(1.8);
  console.log("Due to an technical error, Verifying OTP with mobile number is not working now...");
  wait(3.1);
  console.log("If you are intelligent guess the OTP in 3 chances.....");
  wait(2.5);
  console.log("CLUE: The OTP is between 1 and 10");
  wait(2);
  console.log("......All The Best......");
  wait(1.3);

  console.log("\n" + validateOTP(randomNumber));
}

colectDetails();