import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatService, ChatMessage } from '../services/chatService';
import { useTranslation } from 'react-i18next';
import { AiOutlineSend, AiOutlineClose, AiOutlineMessage } from 'react-icons/ai';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  // Function to parse and render URLs and email addresses as clickable anchors
  const renderMessageWithLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    
    // First split by URLs, then process each part for emails
    const urlParts = text.split(urlRegex);
    
    return urlParts.map((urlPart, urlIndex) => {
      if (urlPart.match(urlRegex)) {
        // Render URL
        return (
          <a
            key={`url-${urlIndex}`}
            href={urlPart}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:text-accent-light underline break-all"
            onClick={(e) => e.stopPropagation()}
          >
            {urlPart}
          </a>
        );
      }
      
      // Process for emails in non-URL parts
      const emailParts = urlPart.split(emailRegex);
      
      return emailParts.map((emailPart, emailIndex) => {
        if (emailPart.match(emailRegex)) {
          // Render email
          return (
            <a
              key={`email-${urlIndex}-${emailIndex}`}
              href={`mailto:${emailPart}`}
              className="text-accent hover:text-accent-light underline break-all"
              onClick={(e) => e.stopPropagation()}
            >
              {emailPart}
            </a>
          );
        }
        return emailPart;
      });
    });
  };

  // Initialize ChatService to trigger debug logs
  React.useEffect(() => {
    new ChatService();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      let assistantMessage = '';
      
      await ChatService.streamMessage(inputMessage, (chunk: string) => {
        assistantMessage += chunk;
        
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          
          if (lastMessage && lastMessage.role === 'assistant') {
            lastMessage.content = assistantMessage;
          } else {
            newMessages.push({
              role: 'assistant',
              content: assistantMessage,
              timestamp: new Date()
            });
          }
          
          return newMessages;
        });
      });

    } catch (error) {
      console.error('Chat error:', error);
      
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: t('ChatError') || 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo.',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
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
    <div className="fixed bottom-8 right-4 z-50 sm:right-4">
      {/* Chat Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className="bg-accent hover:bg-accent-light text-white p-3 sm:p-4 rounded-full shadow-lg transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Open chat"
        >
          <AiOutlineMessage size={20} />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-primaryDark border border-gray-700 rounded-lg shadow-2xl fixed bottom-20 right-4 left-4 sm:left-auto sm:w-96 w-auto h-[60vh] sm:h-[500px] max-h-[600px] flex flex-col"
          >
            {/* Header */}
            <div className="bg-accent text-white p-4 rounded-t-lg flex justify-between items-center">
              <h3 className="font-semibold">{t('ChatWithMe') || 'Chat conmigo'}</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-accent-light p-1 rounded transition-colors duration-300"
                aria-label="Close chat"
              >
                <AiOutlineClose size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 && (
                <div className="text-center text-gray-400 py-8">
                  <p>{t('ChatWelcome') || '¡Hola! ¿En qué puedo ayudarte?'}</p>
                </div>
              )}
              
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-accent text-white'
                          : 'bg-gray-700 text-gray-200'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap break-words">
                        {message.role === 'assistant' 
                          ? renderMessageWithLinks(message.content)
                          : message.content
                        }
                      </p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-700 text-gray-200 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-700">
              <div className="flex space-x-2 min-w-0">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={t('TypeMessage') || 'Escribe tu mensaje...'}
                  className="flex-1 min-w-0 bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm sm:text-base"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-accent hover:bg-accent-light disabled:bg-gray-600 text-white p-2 rounded-lg transition-colors duration-300 flex-shrink-0"
                  aria-label="Send message"
                >
                  <AiOutlineSend size={16} className="sm:size-20" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
