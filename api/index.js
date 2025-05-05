export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const data = req.body;

  // تنظیمات ربات
  const token = "7759452439:AAEKknswbGYyGWabiVWWQQc5R5U0Zl-BZRU";
  const chat_id = "109004266";

  const message = `📩 فرم جدید:\n${JSON.stringify(data, null, 2)}`;

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id, text: message }),
    });

    const result = await telegramRes.json();
    res.status(200).json({ status: 'done', telegram_response: result });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
}

