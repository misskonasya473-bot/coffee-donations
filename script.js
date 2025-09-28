document.getElementById("donationForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const amount = document.getElementById("amount").value;
  const message = document.getElementById("message");

  try {
    const res = await fetch("/.netlify/functions/donate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount })
    });

    const data = await res.json();
    if (data.success) {
      message.textContent = "✅ Donation saved successfully!";
    } else {
      message.textContent = "❌ Error: " + data.error;
    }
  } catch (err) {
    message.textContent = "⚠️ Something went wrong.";
  }
});
