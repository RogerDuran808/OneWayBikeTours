import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Send, User, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! 👋 Welcome to One Way Bike Tours! I'm Sarah, and I'm here to help you discover the perfect cycling adventure. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
    },
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

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('tour') || input.includes('bike')) {
      return "Hey there! 🚴‍♀️ We have some amazing bike tour options. From breathtaking mountain views to peaceful forest paths and stunning lakeside routes - there's something for everyone. What kind of adventure are you dreaming of?";
    } else if (input.includes('price') || input.includes('cost')) {
      return "Great question! Our half-day adventures start at $75, full-day experiences at $120, and if you're up for a multi-day journey, those begin at $300. Everything's included - bikes, gear, snacks, the works! 🌟";
    } else if (input.includes('book') || input.includes('reserve')) {
      return "Awesome! I'm so excited to help you plan your adventure. Just hit that 'Book Now' button and we'll get you all set up. Or I can walk you through everything right here - whatever works best for you! 🎉";
    } else if (input.includes('equipment') || input.includes('gear')) {
      return "Don't worry about gear! We've got top-notch mountain bikes, safety helmets, and all the equipment you'll need. Everything's maintained perfectly and we have options for all experience levels. Just bring your sense of adventure! 😊";
    } else if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! Welcome to One Way Bike Tours! I'm here to help you discover the perfect cycling adventure. What would you like to know about our tours? 🚵‍♂️";
    } else {
      return "Thanks for reaching out! I love chatting about our bike tours and helping people find their perfect adventure. Whether it's about routes, gear, booking, or just dreaming about your next ride - I'm here for you! What's on your mind? 🌲";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Interface */}
      {isOpen && (
        <Card className={cn(
          "w-80 h-96 mb-4 flex flex-col animate-slide-up shadow-chat rounded-2xl overflow-hidden",
          "border border-border bg-background"
        )}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-chat-primary text-white">
            <div className="flex items-center gap-2">
              <span className="font-semibold">One Way Bike Tours</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-2",
                  message.sender === 'user' ? "justify-end" : "justify-start"
                )}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-chat-primary flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">
                    S
                  </div>
                )}
                <div
                  className={cn(
                    "max-w-[70%] p-3 rounded-2xl text-sm",
                    message.sender === 'user'
                      ? "bg-chat-bubble-user text-white"
                      : "bg-chat-bubble-bot border border-border"
                  )}
                >
                  {message.text}
                </div>
                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-chat-muted flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-foreground" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-2 justify-start">
                <div className="w-8 h-8 rounded-full bg-chat-primary flex items-center justify-center flex-shrink-0 text-white font-semibold text-sm">
                  S
                </div>
                <div className="bg-chat-bubble-bot border border-border p-3 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-chat-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-chat-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-chat-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about our bike tours..."
                className="flex-1 border-border focus:ring-chat-primary rounded-xl"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-chat-primary hover:bg-chat-primary-hover text-white px-3 rounded-xl"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full shadow-chat transition-all duration-300",
          "bg-chat-primary hover:bg-chat-primary-hover text-white",
          "hover:scale-105 active:scale-95",
          isOpen ? "rotate-180" : "animate-bounce-gentle"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>
    </div>
  );
};

export default ChatBot;