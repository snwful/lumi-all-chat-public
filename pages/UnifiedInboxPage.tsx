
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Customer, Platform, ChatMessage, MessageSender, AIMode, Order } from '../types';
import { getMockCustomers, getMockChatMessages, addMockChatMessage, ALL_TAGS, MOCK_QUICK_REPLIES } from '../services/mockDataService';
import { PLATFORM_ICON_MAP, UserCircleIcon, PaperAirplaneIcon, TagIconSolid, InformationCircleIcon, SparklesIcon } from '../constants';
import ChatMessageBubble from '../components/ChatMessageBubble';
import AIAssistControls from '../components/AIAssistControls';
import Button from '../components/Button';
import Card from '../components/Card';
import { generateAiReply } from '../services/geminiService';

const PlatformFilter: React.FC<{ selected: Platform[], onChange: (platforms: Platform[]) => void }> = ({ selected, onChange }) => {
    const platforms = Object.values(Platform);
    const togglePlatform = (p: Platform) => {
        if(selected.includes(p)) {
            onChange(selected.filter(item => item !== p));
        } else {
            onChange([...selected, p]);
        }
    };
    return (
        <div className="p-2">
            <h4 className="text-xs font-semibold text-slate-500 mb-1">Platforms</h4>
            <div className="flex flex-wrap gap-1">
            {platforms.map(p => (
                <button 
                    key={p} 
                    onClick={() => togglePlatform(p)}
                    className={`px-2 py-1 text-xs rounded-md border ${selected.includes(p) ? 'bg-brand-accent text-white border-brand-accent' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'}`}
                >
                    {p}
                </button>
            ))}
            </div>
        </div>
    );
};


const TagFilter: React.FC<{ selected: string[], onChange: (tags: string[]) => void, allTags: string[] }> = ({ selected, onChange, allTags }) => {
    const toggleTag = (tag: string) => {
        if(selected.includes(tag)) {
            onChange(selected.filter(item => item !== tag));
        } else {
            onChange([...selected, tag]);
        }
    };
     return (
        <div className="p-2">
            <h4 className="text-xs font-semibold text-slate-500 mb-1">Tags</h4>
            <div className="flex flex-wrap gap-1">
            {allTags.map(tag => (
                <button 
                    key={tag} 
                    onClick={() => toggleTag(tag)}
                    className={`px-2 py-1 text-xs rounded-md border ${selected.includes(tag) ? 'bg-brand-accent text-white border-brand-accent' : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'}`}
                >
                    {tag}
                </button>
            ))}
            </div>
        </div>
    );
};


const UnifiedInboxPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [aiMode, setAiMode] = useState<AIMode>(AIMode.SemiAuto);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isGeneratingAiReply, setIsGeneratingAiReply] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    setCustomers(getMockCustomers());
  }, []);

  useEffect(() => {
    if (selectedCustomer) {
      setChatMessages(getMockChatMessages(selectedCustomer.id));
      // Mark as read (mock)
      setCustomers(prev => prev.map(c => c.id === selectedCustomer.id ? {...c, unreadCount: 0} : c));
    } else {
      setChatMessages([]);
    }
  }, [selectedCustomer]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);


  const handleSendMessage = useCallback(async () => {
    if (!newMessage.trim() || !selectedCustomer) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: MessageSender.Agent,
      text: newMessage,
      timestamp: Date.now(),
      name: 'Lumi Agent' // Or current logged in agent
    };
    const updatedMessages = addMockChatMessage(selectedCustomer.id, userMessage);
    setChatMessages([...updatedMessages]); // Use spread to ensure re-render
    setNewMessage('');
    setAiSuggestions([]);

    if (aiMode === AIMode.Auto) {
      setIsGeneratingAiReply(true);
      const aiResponse = await generateAiReply(userMessage.text, updatedMessages, AIMode.Auto);
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: MessageSender.AI,
        text: aiResponse.text,
        timestamp: Date.now(),
      };
      const finalMessagesAuto = addMockChatMessage(selectedCustomer.id, aiMessage);
      setChatMessages([...finalMessagesAuto]);
      setIsGeneratingAiReply(false);
    } else if (aiMode === AIMode.SemiAuto) {
        setIsGeneratingAiReply(true);
        const aiResponse = await generateAiReply(userMessage.text, updatedMessages, AIMode.SemiAuto);
        if(aiResponse.suggestions && aiResponse.suggestions.length > 0){
            setAiSuggestions(aiResponse.suggestions);
        } else {
            setAiSuggestions([aiResponse.text]); // Fallback if no suggestions array
        }
        setIsGeneratingAiReply(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessage, selectedCustomer, aiMode, chatMessages]); // chatMessages dependency is tricky, manage carefully


  const handleSelectSuggestion = (suggestion: string) => {
    setNewMessage(suggestion);
    setAiSuggestions([]); // Clear suggestions once one is chosen
  };

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
    setAiSuggestions([]); // Clear suggestions when changing customer
    setNewMessage(''); // Clear input
  };
  
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) || customer.lastMessage.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlatform = selectedPlatforms.length === 0 || selectedPlatforms.includes(customer.platform);
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => customer.tags.includes(tag));
    return matchesSearch && matchesPlatform && matchesTags;
  }).sort((a,b) => b.lastMessageTimestamp - a.lastMessageTimestamp);

  return (
    <div className="flex h-[calc(100vh-8rem)]"> {/* Adjust height based on Navbar/Footer */}
      {/* Left Sidebar: Conversations List */}
      <div className="w-1/4 min-w-[300px] bg-brand-surface border-r border-brand-border flex flex-col">
        <div className="p-4 border-b border-brand-border">
          <input
            type="text"
            placeholder="Search chats..."
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-brand-accent focus:border-brand-accent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="border-b border-brand-border">
            <PlatformFilter selected={selectedPlatforms} onChange={setSelectedPlatforms} />
            <TagFilter selected={selectedTags} onChange={setSelectedTags} allTags={ALL_TAGS} />
        </div>
        <div className="flex-grow overflow-y-auto">
          {filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className={`p-3 border-b border-brand-border cursor-pointer hover:bg-slate-50 ${selectedCustomer?.id === customer.id ? 'bg-brand-accent-soft' : ''}`}
              onClick={() => handleCustomerSelect(customer)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {customer.avatarUrl ? <img src={customer.avatarUrl} alt={customer.name} className="w-10 h-10 rounded-full mr-3" /> : <UserCircleIcon className="w-10 h-10 text-slate-400 mr-3" />}
                    <div>
                        <h3 className="font-semibold text-sm text-brand-primary">{customer.name}</h3>
                        <p className="text-xs text-brand-secondary truncate max-w-[150px]">{customer.lastMessage}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-xs text-slate-400 mb-1">{new Date(customer.lastMessageTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})}</span>
                    <div className="flex items-center">
                        {PLATFORM_ICON_MAP[customer.platform]}
                        {customer.unreadCount > 0 && (
                        <span className="ml-2 bg-brand-danger text-white text-xs font-bold px-1.5 py-0.5 rounded-full">{customer.unreadCount}</span>
                        )}
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Section: Chat View */}
      <div className="flex-grow flex flex-col bg-slate-50">
        {selectedCustomer ? (
          <>
            <div className="p-4 border-b border-brand-border bg-brand-surface flex items-center justify-between">
                <div className="flex items-center">
                    {selectedCustomer.avatarUrl ? <img src={selectedCustomer.avatarUrl} alt={selectedCustomer.name} className="w-10 h-10 rounded-full mr-3" /> : <UserCircleIcon className="w-10 h-10 text-slate-400 mr-3" />}
                    <div>
                        <h2 className="font-semibold text-brand-primary">{selectedCustomer.name}</h2>
                        <div className="flex items-center text-xs text-brand-secondary">
                            {PLATFORM_ICON_MAP[selectedCustomer.platform]} <span className="ml-1">{selectedCustomer.platform}</span>
                        </div>
                    </div>
                </div>
                {/* Could add more actions here like "View Profile" */}
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-2">
              {chatMessages.map((msg) => (
                <ChatMessageBubble key={msg.id} message={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>
            <AIAssistControls
              currentMode={aiMode}
              onModeChange={setAiMode}
              aiSuggestions={aiSuggestions}
              onSelectSuggestion={handleSelectSuggestion}
              isGenerating={isGeneratingAiReply}
            />
            <div className="p-4 border-t border-brand-border bg-brand-surface">
              <div className="flex items-center space-x-2">
                <textarea
                  rows={2}
                  className="flex-grow p-2 border border-slate-300 rounded-lg focus:ring-brand-accent focus:border-brand-accent resize-none"
                  placeholder={aiMode === AIMode.Auto ? "AI is in Auto mode. Type to send as user..." : "Type your message..."}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage} disabled={!newMessage.trim() || isGeneratingAiReply} isLoading={isGeneratingAiReply && aiMode === AIMode.Auto}>
                  <PaperAirplaneIcon />
                </Button>
              </div>
              <div className="flex space-x-1 mt-2">
                {MOCK_QUICK_REPLIES.slice(0,3).map(qr => (
                    <Button key={qr} size="sm" variant="outline" className="!text-xs !py-1 !px-2 !border-slate-300 !text-slate-600 hover:!bg-slate-100" onClick={() => setNewMessage(qr)}>
                        {qr.length > 20 ? qr.substring(0,18) + '...' : qr}
                    </Button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-brand-secondary p-8">
            <SparklesIcon className="w-16 h-16 mb-4 text-slate-300" />
            <h2 className="text-xl font-semibold">Select a conversation</h2>
            <p className="text-sm">Choose a customer from the list to start chatting.</p>
          </div>
        )}
      </div>

      {/* Right Sidebar: Customer Profile */}
      <div className="w-1/4 min-w-[300px] bg-brand-surface border-l border-brand-border flex-grow overflow-y-auto p-4">
        {selectedCustomer ? (
          <>
            <div className="text-center mb-4">
              {selectedCustomer.avatarUrl ? <img src={selectedCustomer.avatarUrl} alt={selectedCustomer.name} className="w-20 h-20 rounded-full mx-auto mb-2" /> : <UserCircleIcon className="w-20 h-20 text-slate-300 mx-auto mb-2" />}
              <h3 className="font-semibold text-lg text-brand-primary">{selectedCustomer.name}</h3>
              <div className="flex items-center justify-center text-sm text-brand-secondary">
                {PLATFORM_ICON_MAP[selectedCustomer.platform]} <span className="ml-1">{selectedCustomer.platform}</span>
              </div>
            </div>
            
            <Card className="mb-4">
              <div className="p-3">
                <h4 className="text-sm font-semibold text-brand-primary mb-2 flex items-center"><TagIconSolid className="w-4 h-4 mr-2 text-brand-accent"/>Tags</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedCustomer.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 text-xs bg-sky-100 text-sky-700 rounded-full">{tag}</span>
                  ))}
                  {selectedCustomer.tags.length === 0 && <p className="text-xs text-slate-400">No tags yet.</p>}
                </div>
                {/* Add Tag Button Mock */}
                <Button variant="ghost" size="sm" className="mt-2 !text-xs !text-brand-accent">
                    + Add Tag
                </Button>
              </div>
            </Card>

            <Card className="mb-4">
              <div className="p-3">
                <h4 className="text-sm font-semibold text-brand-primary mb-2 flex items-center"><InformationCircleIcon className="w-4 h-4 mr-2 text-brand-accent"/>Notes</h4>
                <textarea 
                    rows={3} 
                    className="w-full text-xs p-2 border border-slate-200 rounded-md focus:ring-brand-accent focus:border-brand-accent" 
                    defaultValue={selectedCustomer.notes}
                    placeholder="Add notes about this customer..."
                />
                 <Button variant="outline" size="sm" className="mt-2 !text-xs">Save Notes</Button>
              </div>
            </Card>
            
            <Card>
                <div className="p-3">
                    <h4 className="text-sm font-semibold text-brand-primary mb-2">Order History</h4>
                    {selectedCustomer.orderHistory.length > 0 ? (
                    <ul className="space-y-2">
                        {selectedCustomer.orderHistory.map((order: Order) => (
                        <li key={order.id} className="text-xs border-b border-slate-100 pb-1 mb-1 last:border-b-0 last:pb-0 last:mb-0">
                            <div className="flex justify-between">
                                <span className="font-medium text-slate-700">{order.productName}</span>
                                <span className="text-slate-500">฿{order.price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-slate-400">
                                <span>{order.date}</span>
                                <span>{order.status}</span>
                            </div>
                        </li>
                        ))}
                    </ul>
                    ) : (
                    <p className="text-xs text-slate-400">No order history found.</p>
                    )}
                </div>
            </Card>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-brand-secondary p-4 text-center">
            <UserCircleIcon className="w-16 h-16 mb-4 text-slate-300" />
            <h2 className="text-lg font-semibold">Customer Details</h2>
            <p className="text-sm">Select a conversation to see customer information here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedInboxPage;
