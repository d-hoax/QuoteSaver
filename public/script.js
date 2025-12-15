let currentQuote = null;
async function getRandomQuote() {
  try {
    const response = await fetch("/api/random-quote");
    const data = await response.json();
    currentQuote = data;
    document.getElementById("quoteText").textContent = `"${data.quote}"`;
    document.getElementById("quoteAuthor").textContent = `— ${data.author}`;
    document.getElementById("quoteTextInput").value = data.quote;
    document.getElementById("quoteAuthorInput").value = data.author;
    document.getElementById("saveForm").style.display = "block";
  } catch (error) {
    console.error("Error fetching quote:", error);
    document.getElementById("quoteText").textContent =
      "failed to load quote. please try again!";
  }
}
