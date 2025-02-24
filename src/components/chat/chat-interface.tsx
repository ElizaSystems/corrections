'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { mockParolees } from '@/types/corrections';
import { mockInmates } from '@/types/inmates';
import { mockMostWanted } from '@/types/most-wanted';

type Message = {
  text: string;
  sender: 'user' | 'bot';
  timestamp: string;
};

interface ChatInterfaceProps {
  onInit?: (fn: (text: string) => void) => void;
}

export function ChatInterface({ onInit }: ChatInterfaceProps) {
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
    const searchText = input.toLowerCase()
      .replace(/who is|tell me about|info on|what about|information about|can you tell me about/g, '')
      .trim();

    const parolee = mockParolees.find(p => {
      const paroleNameLower = p.name.toLowerCase();
      const nameParts = paroleNameLower.split(' ');
      const searchParts = searchText.split(' ');
      
      return nameParts.some(part => searchParts.includes(part)) ||
             searchParts.some(part => paroleNameLower.includes(part));
    });

    if (!parolee) return null;

    return `${parolee.name} is serving a ${parolee.sentence} sentence for ${parolee.offense}. 
      They are considered ${parolee.riskLevel} risk with ${parolee.timeLeft} remaining. 
      Their last check-in was on ${parolee.lastCheckIn}.`;
  };

  const findInmate = (input: string): string | null => {
    const searchText = input.toLowerCase()
      .replace(/who is|tell me about|info on|what about|information about|can you tell me about/g, '')
      .trim();

    // Add console.log for debugging
    console.log('Searching for inmate:', searchText);
    
    const inmate = mockInmates.find(i => {
      const inmateNameLower = i.name.toLowerCase();
      // Check both full name and parts of the name
      const nameParts = inmateNameLower.split(' ');
      const searchParts = searchText.split(' ');
      
      return nameParts.some(part => searchParts.includes(part)) ||
             searchParts.some(part => inmateNameLower.includes(part));
    });

    if (inmate) {
      return `${inmate.name} is serving ${inmate.sentence} for ${inmate.offense}. They are in ${inmate.facility} (${inmate.securityLevel} security) and have served ${inmate.timeServed}. Their behavior is rated as ${inmate.behavior}${inmate.lastIncident ? ` with the last incident on ${inmate.lastIncident}` : ''}.`;
    }
    return null;
  };

  const findMostWanted = (input: string): string | null => {
    const searchText = input.toLowerCase()
      .replace(/who is|tell me about|info on|what about|information about|can you tell me about/g, '')
      .trim();

    const person = mockMostWanted.find(p => {
      const personNameLower = p.name.toLowerCase();
      const nameParts = personNameLower.split(' ');
      const searchParts = searchText.split(' ');
      
      return nameParts.some(part => searchParts.includes(part)) ||
             searchParts.some(part => personNameLower.includes(part));
    });

    if (!person) return null;

    return `${person.name} is a ${person.age} year old fugitive, last seen in ${person.location}. 
      Wanted for: ${person.charges.join(', ')}. 
      Considered ${person.dangerLevel.toLowerCase()} danger level with a ${person.reward} reward. 
      Description: ${person.description}`;
  };

  const getRecommendation = (input: string): string | null => {
    const lowercaseInput = input.toLowerCase();
    const searchName = lowercaseInput
      .replace('what should we do with', '')
      .replace('thoughts on', '')
      .trim();

    // First check inmates
    const inmate = mockInmates.find(i => 
      i.name.toLowerCase().includes(searchName)
    );

    if (inmate) {
      if (inmate.behavior === 'Good') {
        return `Based on ${inmate.name}'s good behavior and ${inmate.securityLevel.toLowerCase()} security status, recommend:
          1. Consider for program advancement
          2. Evaluate for privilege increase
          3. Potential for security level reduction
          4. Add to mentorship program
          5. Continue positive reinforcement`;
      } else if (inmate.behavior === 'Fair') {
        return `For ${inmate.name}, with fair behavior record, recommend:
          1. Maintain current supervision level
          2. Regular counseling sessions
          3. Behavior improvement incentives
          4. Monthly progress reviews
          5. Skill development programs`;
      } else {
        const daysSinceIncident = inmate.lastIncident ? 
          Math.floor((Date.now() - new Date(inmate.lastIncident).getTime()) / (1000 * 60 * 60 * 24)) : 
          0;
        return `Due to ${inmate.name}'s poor behavior record${inmate.lastIncident ? ` (last incident ${daysSinceIncident} days ago)` : ''}, recommend:
          1. Increase supervision
          2. Mandatory counseling
          3. Review security classification
          4. Behavior management program
          5. Mental health evaluation`;
      }
    }
    return null;
  };

  // Move handleSend definition into useCallback
  const handleSend = useCallback((text: string = input) => {
    const timestamp = formatTimestamp();
    const newUserMessage: Message = { 
      text, 
      sender: 'user',
      timestamp 
    };
    
    setMessages(prev => [...prev, newUserMessage]);

    // Process the response
    let response = "I'm sorry, I don't understand that question.";
    const lowercaseInput = text.toLowerCase();

    // Check for recommendations
    if (lowercaseInput.includes('what should we do with') || 
        lowercaseInput.includes('thoughts on')) {
      const recommendation = getRecommendation(text);
      if (recommendation) {
        response = recommendation;
      }
    } 
    // Check for who-is queries
    else if (lowercaseInput.includes('who is') || 
             lowercaseInput.includes('tell me about') ||
             lowercaseInput.includes('info on')) {
      const mostWantedInfo = findMostWanted(text);
      if (mostWantedInfo) {
        response = mostWantedInfo;
      } else {
        const inmateInfo = findInmate(text);
        if (inmateInfo) {
          response = inmateInfo;
        } else {
          const paroleeInfo = findParolee(text);
          if (paroleeInfo) {
            response = paroleeInfo;
          }
        }
      }
    }

    // Add bot response with slight delay
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: response, 
        sender: 'bot',
        timestamp: formatTimestamp()
      }]);
    }, 300);

    setInput('');
  }, []); // Empty dependency array since it doesn't depend on any props or state

  // Initialize the query function once
  useEffect(() => {
    if (onInit) {
      onInit(handleSend);
    }
  }, [onInit, handleSend]);

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-auto p-4 space-y-4 bg-[#000000]">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`rounded-2xl px-4 py-2 max-w-[70%] ${
                message.sender === 'user' 
                  ? 'bg-[#0B93F6] text-white' // iOS blue
                  : 'bg-[#35C759] text-white' // iOS green
              }`}
              style={{
                marginLeft: message.sender === 'user' ? '4px' : '0px',
                marginRight: message.sender === 'bot' ? '4px' : '0px',
              }}
            >
              {message.text}
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-[#000000]">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask about inmates, parolees, or most wanted..."
            className="input input-bordered flex-1 bg-gray-800 text-white"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            className="btn btn-primary" 
            onClick={() => handleSend()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
} 