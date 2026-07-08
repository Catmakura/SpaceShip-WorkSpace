// SHA-256ハッシュを作成
async function hashString(text) {

  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  const hashBuffer = await crypto.subtle.digest(
    "SHA-256",
    data
  );

  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

// ハッシュ照合
async function verifyHash(text, hash) {

  const hashed = await hashString(text);

  return hashed.toLowerCase() === hash.trim().toLowerCase();
}

// ハッシュ化ボタン
document.getElementById("hashBtn").addEventListener("click", async () => {

  const text =
    document.getElementById("plainText").value;

  if (text === "") {
    alert("文字列を入力してください。");
    return;
  }

  const hash = await hashString(text);

  document.getElementById("hashResult").textContent =
    hash;
});

// 照合ボタン
document.getElementById("verifyBtn").addEventListener("click", async () => {

  const text =
    document.getElementById("verifyText").value;

  const hash =
    document.getElementById("verifyHash").value;

  if (text === "" || hash === "") {
    alert("文字列とハッシュを入力してください。");
    return;
  }

  const match = await verifyHash(text, hash);

  document.getElementById("verifyResult").textContent =
    match
      ? "✅ 一致しました"
      : "❌ 一致しません";
});
