function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

function getRandomSymbols() {
  const symbols = "!@#$%^&*(){}[]=-<>/,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}
const clipBoardCopy = document.getElementById("clipboard");
const resultEl = document.getElementById("result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEL = document.getElementById("generate");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbols,
};

generateEL.addEventListener("click", function () {
  const length = lengthEl.value;
  const hasupper = uppercaseEl.checked;
  const haslower = lowercaseEl.checked;
  const hasnum = numbersEl.checked;
  const hassymbol = symbolsEl.checked;

  resultEl.innerText = passwordgenerator(
    haslower,
    hasupper,
    hasnum,
    hassymbol,
    length
  );
});

function passwordgenerator(lower, upper, number, symbol, length) {
  let password = "";
  const typeCount = lower + upper + number + symbol;
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );
  if (typeCount === 0) {
    return "";
  }
  for (let i = 0; i < length; i += typeCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      password += randomFunc[funcName]();
    });
  }
  const FinalPassword = password.slice(0, length);
  return FinalPassword;
}
clipBoardCopy.addEventListener("click", function () {
  textarea = document.createElement("textarea");
  const pswd = resultEl.innerText;
  if (!pswd) {
    return;
  }
  textarea.value = pswd;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to the clipboard");
});
