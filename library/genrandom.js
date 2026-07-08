const chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function secureRandom(max) {
  const array = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / max) * max;

  while (true) {
    crypto.getRandomValues(array);

    if (array[0] < limit) {
      return array[0] % max;
    }
  }
}

function generateRandomString(length) {
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars[secureRandom(chars.length)];
  }

  return result;
}

document.getElementById("generateBtn").addEventListener("click", () => {

  const length = Number(document.getElementById("length").value);

  if (length < 1 || length > 256 || isNaN(length)) {
    alert("文字数は1～256で入力してください。");
    return;
  }

  document.getElementById("result").textContent =
    generateRandomString(length);
});
