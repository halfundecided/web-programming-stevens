(function() {
  function checkPrime(input) {
    if (!input) {
      throw `You must provide a number`;
    }
    if (input === 1) {
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
    const userInput = document.getElementsByName("inputNumber");
    const attempts = document.getElementById("attempts");

    const error_container = document.getElementById("error-container");
    const error_message = error_container.getElementsByClassName(
      "error-message"
    )[0];

    mjForm.addEventListener("submit", e => {
      e.preventDefault();

      try {
        const input_value = userInput;
        let is_prime = checkPrime(input_value);
        let li = document.createElement("li");
        li.innerHTML = input_value;

        if (is_prime === true) {
          li.className = "is-prime";
        } else {
          li.className = "not-prime";
        }
        attempts.append(li);
      } catch (e) {
        error_conntainer.classList.remove("hidden");
        const errormessage = typeof e === "string" ? e : e.message;
        error_message.textContent = errormessage;
        error_container.classList.remove("hidden");
      }
    });
  }
})();
