let userInput = document.querySelector(".user-input");
let passInput = document.querySelector(".pass-input");
let form = document.querySelector("form");
let userAlert = document.querySelector(".user-alert");
let passAlert = document.querySelector(".pass-alert");
let signMsg = document.querySelector(".signin-msg");

form.addEventListener("submit", signIn);
function signIn(e) {
  e.preventDefault();
  passAlert.innerText = "";
  userAlert.innerText = "";
  let userVal = userInput.value;
  let passVal = passInput.value;
  let ifOk = true;
  if (userVal.length === 0) {
    userAlert.innerText = "Please enter your email";
    ifOk = false;
  } else if (userVal.length < 6) {
    userAlert.innerText = "Please enter a valid email";
    ifOk = false;
  } else if (userVal.indexOf("@") === -1 || userVal.indexOf(".") === -1) {
    userAlert.innerText = "Please enter a valid email";
    ifOk = false;
  }
  if (passVal.length === 0) {
    passAlert.innerText = "Please enter your password";
    ifOk = false;
  } else if (passVal.length < 6) {
    passAlert.innerText = "Your password is too short";
    ifOk = false;
  } else if (passVal.length > 16) {
    passAlert.innerText = "Your password is too long";
    ifOk = false;
  }

  if (ifOk) {
    let body = JSON.stringify({
      username: userVal,
      password: passVal,
    });
    let headers = {
      "content-type": "application/json",
    };
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: body,
      headers: headers,
    }).then((response) => {
      if (response.ok) {
        signMsg.innerText = "Sign in seccussfully";
        signMsg.classList.add("green");
        setTimeout(() => {
          (userInput.value = ""), (passInput.value = "");
        }, 1300);
        setTimeout(() => {
          signMsg.innerHTML = "";
        }, 2800);
      } else {
        signMsg.innerText = "Sign in faild";
        signMsg.classList.add("red");
        setTimeout(() => {
          (userInput.value = ""), (passInput.value = "");
        }, 1300);
        setTimeout(() => {
          signMsg.innerHTML = "";
        }, 2800);
      }
    });
  }
}
