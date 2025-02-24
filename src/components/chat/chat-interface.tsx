'use client';

import { useState, useRef, useEffect } from 'react';
import { mockParolees } from '@/types/corrections';
import { mockInmates } from '@/types/inmates';
import { mockMostWanted } from '@/types/most-wanted';

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

  const findInmate = (input: string): string | null => {
    const lowercaseInput = input.toLowerCase();
    const searchText = lowercaseInput
      .replace('who is', '')
      .replace('tell me about', '')
      .replace('info on', '')
      .replace('what about', '')
      .replace('information about', '')
      .replace('can you tell me about', '')
      .trim();

    const inmate = mockInmates.find(i => 
      i.name.toLowerCase().includes(searchText)
    );

    if (!inmate) return null;

    return `${inmate.name} is serving a ${inmate.sentence} sentence for ${inmate.offense}. 
      They are in ${inmate.facility} (${inmate.securityLevel} security) and have served ${inmate.timeServed}. 
      Their behavior is rated as ${inmate.behavior}${inmate.lastIncident ? ` with the last incident on ${inmate.lastIncident}` : ''}.`;
  };

  const findMostWanted = (input: string): string | null => {
    const lowercaseInput = input.toLowerCase();
    const searchText = lowercaseInput
      .replace('who is', '')
      .replace('tell me about', '')
      .replace('info on', '')
      .trim();

    const person = mockMostWanted.find(p => 
      p.name.toLowerCase().includes(searchText)
    );

    if (!person) return null;

    return `${person.name} is a ${person.age} year old fugitive, last seen in ${person.location}. 
      Wanted for: ${person.charges.join(', ')}. 
      Considered ${person.dangerLevel.toLowerCase()} danger level with a ${person.reward} reward. 
      Description: ${person.description}`;
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

    // Try to find the person in any category
    const personName = lowercaseInput
      .replace('who is', '')
      .replace('tell me about', '')
      .replace('info on', '')
      .replace('what about', '')
      .replace('information about', '')
      .replace('can you tell me about', '')
      .trim();

    // Check Most Wanted first
    const mostWantedInfo = findMostWanted(personName);
    if (mostWantedInfo) {
      response = mostWantedInfo;
    }
    // Then check Inmates
    else if (findInmate(personName)) {
      response = findInmate(personName);
    }
    // Then check Parolees
    else if (findParolee(personName)) {
      response = findParolee(personName);
    }
    // If no person found, handle other query types
    else if (lowercaseInput.includes('most wanted') || lowercaseInput.includes('fugitive')) {
      if (lowercaseInput.includes('count') || lowercaseInput.includes('how many')) {
        if (lowercaseInput.includes('extreme')) {
          const extremeDanger = mockMostWanted.filter(p => p.dangerLevel === 'Extreme').length;
          response = `There are ${extremeDanger} extremely dangerous fugitives on the Most Wanted list.`;
        } else if (lowercaseInput.includes('high')) {
          const highDanger = mockMostWanted.filter(p => p.dangerLevel === 'High').length;
          response = `There are ${highDanger} high-danger fugitives on the Most Wanted list.`;
        } else if (lowercaseInput.includes('medium')) {
          const mediumDanger = mockMostWanted.filter(p => p.dangerLevel === 'Medium').length;
          response = `There are ${mediumDanger} medium-danger fugitives on the Most Wanted list.`;
        } else {
          response = `There are currently ${mockMostWanted.length} people on the Most Wanted list.`;
        }
      } else if (lowercaseInput.includes('recent') || lowercaseInput.includes('last seen')) {
        const recentSightings = mockMostWanted.filter(p => 
          new Date(p.lastSeen) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        );
        response = `In the past month, there have been ${recentSightings.length} reported sightings of Most Wanted individuals.`;
      } else if (lowercaseInput.includes('reward')) {
        const totalReward = mockMostWanted
          .reduce((sum, p) => sum + parseInt(p.reward.replace(/[^0-9]/g, '')), 0);
        response = `The total reward money for all Most Wanted individuals is $${totalReward.toLocaleString()}.`;
      }
    }
    else if (lowercaseInput.includes('inmate')) {
      if (lowercaseInput.includes('count') || lowercaseInput.includes('how many')) {
        if (lowercaseInput.includes('maximum')) {
          const maxSecurity = mockInmates.filter(i => i.securityLevel === 'Maximum').length;
          response = `There are ${maxSecurity} maximum security inmates.`;
        } else if (lowercaseInput.includes('medium')) {
          const medSecurity = mockInmates.filter(i => i.securityLevel === 'Medium').length;
          response = `There are ${medSecurity} medium security inmates.`;
        } else if (lowercaseInput.includes('minimum')) {
          const minSecurity = mockInmates.filter(i => i.securityLevel === 'Minimum').length;
          response = `There are ${minSecurity} minimum security inmates.`;
        } else {
          response = `There are currently ${mockInmates.length} total inmates.`;
        }
      } else if (lowercaseInput.includes('behavior') || lowercaseInput.includes('conduct')) {
        const goodBehavior = mockInmates.filter(i => i.behavior === 'Good').length;
        const fairBehavior = mockInmates.filter(i => i.behavior === 'Fair').length;
        const poorBehavior = mockInmates.filter(i => i.behavior === 'Poor').length;
        response = `Currently, ${goodBehavior} inmates show good behavior, ${fairBehavior} show fair behavior, and ${poorBehavior} show poor behavior.`;
      } else if (lowercaseInput.includes('incident')) {
        const recentIncidents = mockInmates.filter(i => 
          i.lastIncident && new Date(i.lastIncident) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
        );
        response = `In the past month, ${recentIncidents.length} inmates have had behavioral incidents.`;
      }
    }
    else {
      if (lowercaseInput.includes('how many') || lowercaseInput.includes('count')) {
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
    }

    setMessages([...newMessages, { text: response, sender: 'bot', timestamp }]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex-1 overflow-auto p-4 space-y-4">
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
          placeholder="Ask about parolees, inmates, or most wanted..."
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