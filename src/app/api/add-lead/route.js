export async function POST(req) {
  try {
    const body = await req.json();

    // Your Google Script Web App URL
    const googleScriptUrl =
      "https://script.google.com/macros/s/AKfycbz8cqMaJguDQmgBJt0UUn9DNoskO3T20p1QdOCrrA3oazYYFZSDRMnRPclVIrN2JwNg/exec";

    // Forward the data to the Google Script
    const response = await fetch(googleScriptUrl, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.text();

    return new Response(
      JSON.stringify({ success: true, googleResponse: result }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("API Error:", error);

    return new Response(
      JSON.stringify({ success: false, error: error.toString() }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
