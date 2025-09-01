
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Bot, User } from 'lucide-react';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

type ChatInterfaceProps = {
  onTasksGenerated: () => void;
};

export function ChatInterface({ onTasksGenerated }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hey! I'm your AI startup mentor. Tell me about your business idea and I'll help you break it down into actionable tasks. What's your vision? 🚀",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('clothing') || lowerMessage.includes('fashion')) {
      return "A clothing brand! That's exciting 👕 I can see you're passionate about fashion. Let me break this down into actionable steps:\n\n1. Market Research - Identify your target demographic\n2. Brand Identity - Create your unique style and voice\n3. Supplier Research - Find manufacturers and materials\n4. Design Process - Create your first collection\n5. E-commerce Setup - Build your online store\n\nI've generated specific tasks for each area. Ready to see your project dashboard?";
    }
    
    if (lowerMessage.includes('app') || lowerMessage.includes('software')) {
      return "A software project! Love the tech energy 💻 Here's how we can structure your development journey:\n\n1. User Research - Define your target users and their problems\n2. MVP Planning - Outline core features for launch\n3. Technical Stack - Choose your development tools\n4. UI/UX Design - Create user-friendly interfaces\n5. Development Sprint - Build your minimum viable product\n\nI've created tasks to get you started on each phase!";
    }
    
    return "That sounds like an amazing opportunity! 🌟 Based on what you've shared, I can help you structure this into manageable steps:\n\n1. Vision & Strategy - Define your core mission\n2. Market Analysis - Research your competition and opportunities\n3. Business Model - Plan how you'll make money\n4. Marketing Strategy - Build your audience\n5. Launch Preparation - Get ready to go live\n\nI've generated specific tasks for your project. Want to check out your dashboard?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Startup Mentor</h1>
        <p className="text-muted-foreground">Share your idea and let's build something amazing together</p>
      </div>

      <Card className="gaming-card h-[600px] flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.sender === 'user' 
                    ? 'bg-gradient-to-br from-gaming-purple to-purple-700' 
                    : 'bg-gradient-to-br from-gaming-cyan to-cyan-600'
                }`}>
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                
                <div className={`p-4 rounded-2xl ${
                  message.sender === 'user' 
                    ? 'chat-bubble-user' 
                    : 'chat-bubble-ai'
                }`}>
                  <p className="whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gaming-cyan to-cyan-600 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="chat-bubble-ai p-4">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-gaming-cyan rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gaming-cyan rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gaming-cyan rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-6 border-t border-border/50">
          <div className="flex gap-4">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Describe your startup idea..."
              className="flex-1 bg-muted/50 border-border/50 focus:border-gaming-purple/50"
            />
            <Button 
              onClick={handleSendMessage}
              className="btn-gaming px-6"
              disabled={!inputValue.trim() || isTyping}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {messages.length > 2 && (
            <div className="mt-4 text-center">
              <Button 
                onClick={onTasksGenerated}
                className="btn-gaming"
              >
                View Your Project Dashboard
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
