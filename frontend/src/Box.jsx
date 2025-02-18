import React, { useState } from 'react';
import "./App.css"

const countryCodes = [
    { code: '+91', country: 'In' },
    { code: '+1', country: 'US' },
    { code: '+44', country: 'UK' },
    { code: '+61', country: 'Aus' },
];

const Box = () => {
    const [countryCode, setCountryCode] = useState('+1');
    const [number, setNumber] = useState('');
    const [message, setMessage] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fullNumber = `${countryCode}${number}`;

        setIsSending(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:3000/api/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    number: fullNumber,
                    message
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to send message');
            }

            alert('Message sent successfully!');
            setNumber('');
            setMessage("");
        } catch (error) {
            console.error('Error sending message:', error);
            setError('Failed to send message. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className='box'>
            <form className='container' onSubmit={handleSubmit}>
                <div>
                    <label>Phone Number</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <select
                            value={countryCode}
                            onChange={(e) => setCountryCode(e.target.value)}
                            style={{ width: '100px' }}
                            required
                        >
                            {countryCodes.map((cc) => (
                                <option key={cc.code} value={cc.code}>
                                    {cc.country} ({cc.code})
                                </option>
                            ))}
                        </select>
                        <input
                            type="tel"
                            placeholder='Mobile number'
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div>
                    <label>Message</label>
                    <textarea
                        placeholder='Enter your message'
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        required
                    />
                </div>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                <button type="submit" disabled={isSending}>
                    {isSending ? 'Sending...' : 'Send Message'}
                </button>
            </form>
        </div>
    );
}

export default Box;
