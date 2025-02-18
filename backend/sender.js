import express from 'express';
import twilio from 'twilio';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const accountSid = process.env.ACCOUNT_ID;
const authToken = process.env.ACCOUNT_TOKEN;
const client = twilio(accountSid, authToken);

app.use(cors());
app.use(express.json());

app.post('/api/send-message', (req, res) => {

    const { number, message } = req.body;

    client.messages
        .create({
            body: message,
            messagingServiceSid: process.env.MESSAGE_ID,
            to: number,
        })
        .then(message => {
            console.log('Message SID:', message.sid);
            res.status(200).json({ success: true, messageSid: message.sid });
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ success: false, error: error.message });
        });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
