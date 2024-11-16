const apiKey = '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';  // Ganti dengan API key Anda
const sendButton = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const messages = document.getElementById('messages');

// Fungsi untuk menambah pesan ke layar
function addMessage(text, sender) {
  const messageElement = document.createElement('div');
  messageElement.textContent = `${sender}: ${text}`;
  messages.appendChild(messageElement);
  messages.scrollTop = messages.scrollHeight;
}

// Mengirim pesan ke API OpenAI
async function sendMessage() {
  const userMessage = userInput.value;
  if (userMessage.trim() === '') return;

  addMessage(userMessage, 'You');
  userInput.value = '';

  // Kirim request ke OpenAI API
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: userMessage }],
    }),
  });

  const data = await response.json();
  const aiMessage = data.choices[0].message.content;

  addMessage(aiMessage, 'AI');
}

sendButton.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});
