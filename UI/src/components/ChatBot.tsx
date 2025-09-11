import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { MessageCircle, X, Send, User } from 'lucide-react';
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
      text: "Hi there! 👋 Welcome to One Way Bike Tours! I'm Gerrit, and I'm here to help you discover the perfect cycling adventure. What would you like to know?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Lightweight markdown renderer for bot messages: supports **bold**, lists (- or *), and paragraph spacing
  const renderMarkdown = (text: string) => {
    // Preprocess: normalize spaces and convert inline bullets like ": - item - item" into proper newlines
    let normalized = text
      // Replace non-breaking spaces with regular spaces to fix headings like "###\u00A0Title"
      .replace(/\u00A0/g, ' ')
      // Break lists after colon or period when followed by space-hyphen
      .replace(/([:.])\s+-\s+/g, '$1\n- ') 
      // Also handle multiple inline hyphen items by converting " - " sequences into new lines when there are no existing breaks
      .replace(/\s-\s(?=\*\*|[A-Za-z0-9])/g, '\n- ');

    const lines = normalized.split('\n');
    const elements: React.ReactNode[] = [];
    let listBuffer: string[] = [];

    const flushList = () => {
      if (listBuffer.length) {
        elements.push(
          <ul className="list-disc pl-5 my-2 space-y-1" key={`ul-${elements.length}`}>
            {listBuffer.map((item, idx) => (
              <li key={`li-${elements.length}-${idx}`}>{renderInline(item)}</li>
            ))}
          </ul>
        );
        listBuffer = [];
      }
    };

    const renderInline = (line: string) => {
      // Bold: **text**
      const parts = line.split(/(\*\*[^*]+\*\*)/g);
      return (
        <>
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            return <span key={i}>{part}</span>;
          })}
        </>
      );
    };

    for (const rawLine of lines) {
      const line = rawLine.trimEnd();
      if (line.trim().length === 0) {
        // Paragraph break
        flushList();
        elements.push(<div className="h-2" key={`spacer-${elements.length}`} />);
        continue;
      }

      // Markdown ATX headings: #, ##, ###, etc.
      const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
      if (headingMatch) {
        flushList();
        const level = headingMatch[1].length;
        const content = headingMatch[2].trim();
        const common = "font-semibold leading-snug mt-2 mb-1";
        if (level === 1) elements.push(<h1 className={common + " text-lg"} key={`h-${elements.length}`}>{renderInline(content)}</h1>);
        else if (level === 2) elements.push(<h2 className={common + " text-base"} key={`h-${elements.length}`}>{renderInline(content)}</h2>);
        else elements.push(<h3 className={common + " text-sm"} key={`h-${elements.length}`}>{renderInline(content)}</h3>);
        continue;
      }

      // Lines ending with a colon can be treated as subheadings (e.g., "Touring Bike:")
      if (/^[^\-\*\d].*:\s*$/.test(line)) {
        flushList();
        const content = line.replace(/:\s*$/, '');
        elements.push(
          <h4 className="font-semibold leading-snug mt-2 mb-1 text-sm" key={`h4-${elements.length}`}>
            {renderInline(content)}
          </h4>
        );
        continue;
      }

      // Unordered list bullet
      if (/^[-*]\s+/.test(line)) {
        listBuffer.push(line.replace(/^[-*]\s+/, ''));
        continue;
      }

      // Numbered list like "1. Item"
      const orderedMatch = line.match(/^(\d+)\.\s+(.*)$/);
      if (orderedMatch) {
        // Convert ordered items into unordered visually for simplicity
        listBuffer.push(orderedMatch[2]);
        continue;
      }

      // Normal paragraph
      flushList();
      elements.push(
        <p className="my-1 leading-relaxed" key={`p-${elements.length}`}>
          {renderInline(line)}
        </p>
      );
    }

    // Flush any remaining list
    if (listBuffer.length) flushList();

    return (
      <div className="prose prose-sm max-w-none prose-p:my-1 prose-li:my-0 prose-headings:font-semibold prose-headings:my-1">
        {elements}
      </div>
    );
  };

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
    try {
      // Build chat history for backend
      const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text, history }),
      });

      if (!resp.ok) {
        throw new Error(`Request failed: ${resp.status}`);
      }

      const data: { reply?: string } = await resp.json();
      const replyText = data.reply?.trim() || "I'm having trouble responding right now. Please try again in a moment.";

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: replyText,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    } catch (err) {

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
                text: 'Sorry, there was a connection error. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
    } finally {
      setIsTyping(false);
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
                    G
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
                  {message.sender === 'bot' ? (
                    renderMarkdown(message.text)
                  ) : (
                    <div className="whitespace-pre-wrap leading-relaxed">{message.text}</div>
                  )}
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
                  G
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