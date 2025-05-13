export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const data = req.body;

  // تنظیمات ربات
  const token = "7759452439:AAEKknswbGYyGWabiVWWQQc5R5U0Zl-BZRU";
  const chat_ids = ["109004266", "91373720"]; // 👈 آیدی چند ادمین

  const message = `📩 فرم انتخاب رایحه سایت:\n${JSON.stringify(data, null, 2)}`;

  try {
    const sendToAll = await Promise.all(
      chat_ids.map(chat_id =>
        fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id, text: message }),
        }).then(res => res.json())
      )
    );

    res.status(200).json({ status: 'done', telegram_responses: sendToAll });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
}


