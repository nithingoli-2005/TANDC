var datum = "";
const apikey = "";

const fireapi = async () => {
  console.log("Fired");
  var content = document.getElementById("input").value;

  const result = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apikey}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192", // Recommended Groq model
        messages: [{ role: "user", content: content + "\n\nTl;dr" }],
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 1,
      }),
    }
  );

  const data = await result.json();

  if (data.choices && data.choices.length > 0) {
    const summary = data.choices[0].message.content;
    console.log(summary);
    datum = summary;
    document.getElementById("input").value = "Points: " + summary;
    document.getElementById("status").innerHTML +=
      '<h1 id="done">😍Summary Generated✨</h1>';
    return summary;
  } else {
    document.getElementById("status").innerHTML += "<h1>Error Occurred...</h1>";
    console.error("No summary returned:", data);
    return null;
  }
};

document.getElementById("sub").addEventListener("click", fireapi);
