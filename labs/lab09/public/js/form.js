(function() {
  function checkPrime(input) {
    // if (!input) {
    //   throw `You must provide a number`;
    // }
    if (input < 0) return -1;
    if (input == 0 || input == 1) {
      return false;
    } else if (input === 2) {
      return true;
    } else {
      for (let i = 2; i < input; i++) {
        if (input % i === 0) return false;
      }
      return true;
    }
  }

  const mjForm = document.getElementById("mjForm");

  if (mjForm) {
    mjForm.addEventListener("submit", event => {
      event.preventDefault();
      const error_container = document.getElementById("error-container");
      error_container.classList.add("hidden");

      const userInput = document.getElementById("inputNumber").value;

      if (userInput) {
        const attempts = document.getElementById("attempts");

        let is_prime = checkPrime(userInput);
        let li = document.createElement("li");

        if (is_prime === true) {
          li.innerHTML = `${userInput} is a prime number`;
          li.className = "is-prime";
        } else if (is_prime === false) {
          li.innerHTML = `${userInput} is NOT a prime number`;
          li.className = "not-prime";
        } else {
          const error_container = document.getElementById("error-container");
          const error_message = error_container.getElementsByClassName(
            "error-message"
          )[0];
          error_message.textContent =
            "Negative numbers are not allowed for this input";
          error_container.classList.remove("hidden");
        }
        attempts.append(li);
      } else {
        const error_container = document.getElementById("error-container");
        const error_message = error_container.getElementsByClassName(
          "error-message"
        )[0];
        error_message.textContent = "You need to supply an input value!";
        error_container.classList.remove("hidden");
      }
    });
  }
})();
