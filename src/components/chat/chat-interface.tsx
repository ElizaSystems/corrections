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
      .replace(/what should we do with|thoughts on|recommendations for|recommend for/g, '')
      .trim();

    // First check parolees since they're actively supervised
    const parolee = mockParolees.find(p => {
      const paroleeNameLower = p.name.toLowerCase();
      const nameParts = paroleeNameLower.split(' ');
      const searchParts = searchName.split(' ');
      return nameParts.some(part => searchParts.includes(part)) ||
             searchParts.some(part => paroleeNameLower.includes(part));
    });

    if (parolee) {
      if (parolee.riskLevel === 'Low') {
        return `Based on ${parolee.name}'s low risk level and compliance, recommend:
          1. Reduce check-in frequency
          2. Consider for early release from supervision
          3. Support employment/education initiatives
          4. Maintain current support services
          5. Positive reinforcement program`;
      } else if (parolee.riskLevel === 'Medium') {
        return `For ${parolee.name}, with medium risk assessment, recommend:
          1. Maintain regular check-ins
          2. Continue substance testing if applicable
          3. Regular employment verification
          4. Counseling support services
          5. Monthly progress evaluation`;
      } else {
        return `Due to ${parolee.name}'s high risk classification, recommend:
          1. Increase supervision frequency
          2. Enhanced monitoring measures
          3. Mandatory program participation
          4. Weekly check-ins
          5. Regular risk reassessment`;
      }
    }

    // Then check inmates
    const inmate = mockInmates.find(i => {
      const inmateNameLower = i.name.toLowerCase();
      const nameParts = inmateNameLower.split(' ');
      const searchParts = searchName.split(' ');
      return nameParts.some(part => searchParts.includes(part)) ||
             searchParts.some(part => inmateNameLower.includes(part));
    });

    if (inmate) {
      if (inmate.behavior === 'Good') {
        return `Based on ${inmate.name}'s good behavior and ${inmate.timeServed} served, recommend:
          1. Consider for early release program
          2. Evaluate for security level reduction
          3. Expand privilege access
          4. Add to mentorship/leadership program
          5. Support skill development opportunities`;
      } else if (inmate.behavior === 'Fair') {
        return `For ${inmate.name}, with fair behavior record, recommend:
          1. Maintain current supervision level
          2. Regular counseling sessions
          3. Behavior improvement incentives
          4. Monthly progress reviews
          5. Targeted rehabilitation programs`;
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

    // Finally check most wanted
    const mostWanted = mockMostWanted.find(p => {
      const personNameLower = p.name.toLowerCase();
      const nameParts = personNameLower.split(' ');
      const searchParts = searchName.split(' ');
      return nameParts.some(part => searchParts.includes(part)) ||
             searchParts.some(part => personNameLower.includes(part));
    });

    if (mostWanted) {
      if (mostWanted.dangerLevel === 'Extreme') {
        return `For ${mostWanted.name}, classified as extremely dangerous, recommend:
          1. Deploy specialized tactical units
          2. Coordinate with federal agencies
          3. Establish multi-state surveillance
          4. Monitor known associates
          5. Issue public safety alerts`;
      } else if (mostWanted.dangerLevel === 'High') {
        return `For ${mostWanted.name}, classified as high risk, recommend:
          1. Increase regional surveillance
          2. Coordinate with local agencies
          3. Monitor digital footprint
          4. Review recent tips
          5. Update public awareness campaign`;
      } else {
        return `For ${mostWanted.name}, standard pursuit protocol:
          1. Maintain active investigation
          2. Regular patrol monitoring
          3. Update warrant database
          4. Follow up on reported sightings
          5. Review surveillance footage`;
      }
    }

    return null;
  };

  const getPleasantryResponse = (input: string): string | null => {
    const lowercaseInput = input.toLowerCase().trim();
    
    // Greetings
    if (lowercaseInput.match(/^(hi|hello|hey|greetings|good (morning|afternoon|evening))$/)) {
      const responses = [
        "Hello! How can I assist you today?",
        "Hi there! What information would you like?",
        "Greetings! I'm here to help with any questions about inmates, parolees, or most wanted individuals."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Thanks/Gratitude
    if (lowercaseInput.match(/^(thanks|thank you|thx|ty|appreciate it)$/)) {
      const responses = [
        "You're welcome! Let me know if you need anything else.",
        "Happy to help! Feel free to ask more questions.",
        "Anytime! Is there anything else you'd like to know?"
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // Goodbyes
    if (lowercaseInput.match(/^(goodbye|bye|see you|farewell|good night|cya)$/)) {
      const responses = [
        "Goodbye! Have a great day!",
        "Take care! Let me know if you need anything else.",
        "Farewell! Don't hesitate to return if you have more questions."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    // General affirmatives
    if (lowercaseInput.match(/^(ok|okay|sure|alright|yes|yeah)$/)) {
      const responses = [
        "Great! What would you like to know?",
        "Perfect! How can I assist you?",
        "Excellent! Feel free to ask any questions about our records."
      ];
      return responses[Math.floor(Math.random() * responses.length)];
    }

    return null;
  };

  const handleSend = useCallback((text: string = input) => {
    if (!text.trim()) return; // Don't send empty messages
    
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

    // First check for pleasantries
    const pleasantryResponse = getPleasantryResponse(text);
    if (pleasantryResponse) {
      response = pleasantryResponse;
    }
    // Check for recommendations
    else if (lowercaseInput.includes('what should we do with') || 
        lowercaseInput.includes('thoughts on') || 
        lowercaseInput.includes('recommendations for') || 
        lowercaseInput.includes('recommend for')) {
      const recommendation = getRecommendation(text);
      if (recommendation) {
        response = recommendation;
      }
    } 
    // Check for who-is queries
    else if (lowercaseInput.includes('who is') || 
             lowercaseInput.includes('tell me about') ||
             lowercaseInput.includes('info on')) {
      // First check parolees since they're actively supervised
      const paroleeInfo = findParolee(text);
      if (paroleeInfo) {
        response = paroleeInfo;
      } 
      // Then check current inmates
      else {
        const inmateInfo = findInmate(text);
        if (inmateInfo) {
          response = inmateInfo;
        }
        // Finally check most wanted
        else {
          const mostWantedInfo = findMostWanted(text);
          if (mostWantedInfo) {
            response = mostWantedInfo;
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
  }, [input]);

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
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend(input);
              }
            }}
          />
          <button 
            className="btn btn-primary" 
            onClick={() => handleSend(input)}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
} 