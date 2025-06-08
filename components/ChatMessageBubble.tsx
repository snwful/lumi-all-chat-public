
import React from 'react';
import { ChatMessage, MessageSender } from '../types';
import { UserCircleIcon, SparklesIcon } from '../constants'; // Assuming SparklesIcon for AI

const ChatMessageBubble: React.FC<{ message: ChatMessage }> = ({ message }) => {
  const isUser = message.sender === MessageSender.Customer;
  const isAgent = message.sender === MessageSender.Agent;
  const isAI = message.sender === MessageSender.AI;

  const bubbleAlignment = isUser ? 'items-start' : 'items-end';
  const bubbleColor = isUser 
    ? 'bg-slate-200 text-brand-primary' 
    : (isAI ? 'bg-brand-accent-soft text-brand-accent' : 'bg-brand-accent text-white');
  const bubbleOrder = isUser ? '' : 'flex-row-reverse';
  const textAlign = isUser ? 'text-left' : 'text-right';

  const avatar = message.avatarUrl ? (
    <img src={message.avatarUrl} alt={message.name || message.sender} className="w-8 h-8 rounded-full" />
  ) : (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-slate-300 text-white ${isUser ? 'mr-2' : 'ml-2'}`}>
        {isAI ? <SparklesIcon className="w-5 h-5 text-brand-accent" /> : <UserCircleIcon className="w-6 h-6 text-slate-500" />}
    </div>
  );

  return (
    <div className={`flex flex-col mb-3 ${bubbleAlignment}`}>
        <div className={`flex items-end max-w-xs md:max-w-md lg:max-w-lg ${bubbleOrder}`}>
            {!isUser && <div className="ml-2">{avatar}</div>}
            {isUser && <div className="mr-2">{avatar}</div>}
            <div className={`px-4 py-2 rounded-lg ${bubbleColor} ${isUser ? 'rounded-bl-none' : 'rounded-br-none'} shadow-sm`}>
                {message.name && (isUser || isAgent) && (
                    <p className={`text-xs font-semibold mb-0.5 ${isUser ? 'text-slate-600' : 'text-sky-100'}`}>{message.name}</p>
                )}
                 {isAI && !message.name && (
                    <p className={`text-xs font-semibold mb-0.5 text-brand-accent`}>Lumi AI</p>
                )}
                <p className="text-sm break-words">{message.text}</p>
            </div>
        </div>
        <p className={`text-xs text-slate-400 mt-1 px-10 ${textAlign}`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            {message.isAISuggestion && <span className="ml-1 text-brand-accent">(AI Suggestion)</span>}
        </p>
    </div>
  );
};

export default ChatMessageBubble;
