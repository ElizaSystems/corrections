'use client';

import { useState, useRef, useEffect } from 'react';
import { mockParolees } from '@/types/corrections';

type Message = {
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTimestamp = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const findParolee = (input: string): string | null => {
    const lowercaseInput = input.toLowerCase();
    // Remove common question words and patterns
    const searchText = lowercaseInput
      .replace('who is', '')
      .replace('tell me about', '')
      .replace('info on', '')
      .replace('what about', '')
      .replace('information about', '')
      .replace('can you tell me about', '')
      .trim();

    // Find parolee by name
    const parolee = mockParolees.find(p => 
      p.name.toLowerCase().includes(searchText)
    );

    if (!parolee) return null;

    return `${parolee.name} is serving a ${parolee.sentence} sentence for ${parolee.offense}. 
      They are considered ${parolee.riskLevel} risk with ${parolee.timeLeft} remaining. 
      Their last check-in was on ${parolee.lastCheckIn}.`;
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const timestamp = formatTimestamp();
    const newMessages: Message[] = [...messages, { 
      text: input, 
      sender: 'user',
      timestamp 
    }];
    setMessages(newMessages);

    let response = "I'm sorry, I don't understand that question.";
    const lowercaseInput = input.toLowerCase();

    // Check for parolee information first
    const paroleeInfo = findParolee(lowercaseInput);
    if (paroleeInfo) {
      response = paroleeInfo;
    }
    // If no parolee found, check other query types
    else if (lowercaseInput.includes('how many')) {
      if (lowercaseInput.includes('high risk')) {
        const highRisk = mockParolees.filter(p => p.riskLevel === 'High').length;
        response = `There are ${highRisk} high-risk parolees in the system.`;
      } else if (lowercaseInput.includes('medium risk')) {
        const mediumRisk = mockParolees.filter(p => p.riskLevel === 'Medium').length;
        response = `There are ${mediumRisk} medium-risk parolees in the system.`;
      } else if (lowercaseInput.includes('low risk')) {
        const lowRisk = mockParolees.filter(p => p.riskLevel === 'Low').length;
        response = `There are ${lowRisk} low-risk parolees in the system.`;
      } else {
        response = `There are currently ${mockParolees.length} total parolees in the system.`;
      }
    } else if (lowercaseInput.includes('recent check')) {
      const recentCheckIns = mockParolees.filter(p => 
        new Date(p.lastCheckIn) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      );
      response = `In the past week, ${recentCheckIns.length} parolees have checked in.`;
    } else if (lowercaseInput.includes('overdue')) {
      const today = new Date();
      const overdue = mockParolees.filter(p => 
        new Date(p.lastCheckIn) < new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000)
      );
      if (overdue.length > 0) {
        response = `There are ${overdue.length} parolees who haven't checked in for over 2 weeks: ${
          overdue.map(p => p.name).join(', ')
        }`;
      } else {
        response = "No parolees are currently overdue for check-ins.";
      }
    }

    setTimeout(() => {
      setMessages([...newMessages, { 
        text: response, 
        sender: 'bot',
        timestamp: formatTimestamp()
      }]);
    }, 500); // Add a small delay to make it feel more natural

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
            <div className="chat-header opacity-50 text-xs mb-1">
              {message.timestamp}
            </div>
            <div className={`chat-bubble ${
              message.sender === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'
            }`}>
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
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