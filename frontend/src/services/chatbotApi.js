const API_URL = import.meta.env.DEV
  ? import.meta.env.VITE_CHATBOT_API_URL || "http://localhost:5000/api/chat"
  : "https://harevent-india-s-events-realated-vendor.onrender.com/api/chat";

export async function sendChatbotChoice(choice) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ choice }),
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }

  return data;
}
