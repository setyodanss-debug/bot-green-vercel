import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const data = req.body;

  if (data.typeWebhook !== "incomingMessageReceived") {
    return res.status(200).end();
  }

  const text = data.messageData?.textMessageData?.textMessage;
  const from = data.senderData?.chatId;

  if (!text || !from) return res.status(200).end();

  const msg = text.toLowerCase();

  if (msg === "ping") {
    await sendMessage(from, "pong 🏓");
  }

  if (msg === "menu") {
    await sendMessage(from, "📌 MENU\n- ping\n- menu");
  }

  return res.status(200).end();
}

async function sendMessage(chatId, message) {
  const url = `${process.env.API_URL}/waInstance${process.env.ID_INSTANCE}/sendMessage/${process.env.API_TOKEN}`;
  await axios.post(url, {
    chatId,
    message
  });
}
