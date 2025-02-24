'use client';

import { useState } from 'react';
import { mockParolees } from '@/types/corrections';

export function ChatInterface() {
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot' }>>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);

    // Simple mock response system
    let response = "I'm sorry, I don't understand that question.";

    // Basic keyword matching for demo purposes
    const lowercaseInput = input.toLowerCase();
    if (lowercaseInput.includes('how many')) {
      response = `There are currently ${mockParolees.length} parolees in the system.`;
    } else if (lowercaseInput.includes('high risk')) {
      const highRisk = mockParolees.filter(p => p.riskLevel === 'High').length;
      response = `There are ${highRisk} high-risk parolees in the system.`;
    } else if (lowercaseInput.includes('next check')) {
      response = `I can help you find upcoming check-in dates. Which parolee would you like to know about?`;
    }

    setMessages([...newMessages, { text: response, sender: 'bot' }]);
    setInput('');
  };

  return (
    <div className="border rounded-lg p-4 bg-base-200 h-[500px] flex flex-col">
      <div className="flex-1 overflow-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`chat ${message.sender === 'user' ? 'chat-end' : 'chat-start'}`}
          >
            <div className={`chat-bubble ${
              message.sender === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'
            }`}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Ask about parolees..."
          className="input input-bordered flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className="btn btn-primary" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
} 