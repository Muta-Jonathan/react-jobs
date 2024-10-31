import { useState } from 'react';
import { FaComments,FaPaperPlane } from 'react-icons/fa';

const ChatbotIcon = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [response, setResponse] = useState('');

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleQuerySubmit = async () => {
    try {
      const reply = await fetch('api/chat', { // Change this line
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userQuery }),
      });
      
      if (!reply.ok) {
        throw new Error(`HTTP error! status: ${reply.status}`);
      }
      
      const data = await reply.json();
      setResponse(data.answer);
      setUserQuery(''); // Clear input after sending
    } catch (error) {
      console.error("Error submitting query:", error);
    }
  };
  
  
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-2">
      {/* Chatbot Button */}
      <button
        onClick={toggleChat}
        className="relative flex items-center justify-center w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <FaComments size={24} />
        {/* "Live" Indicator */}
        <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
      </button>

      {/* Chatbox Display */}
      {isChatOpen && (
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg w-64">
          <p className="text-gray-800 font-semibold mb-2">Chat with our AI!</p>
          <p className="text-sm text-gray-600">How can we help you today?</p>
          <div className="mt-4 max-h-80 overflow-y-auto hide-scrollbar">
            <div className="mt-4 bg-light-blue-200 border border-indigo-600 rounded-lg p-4 shadow-md">
            <div 
            className="text-gray-700"
            // Using dangerouslySetInnerHTML to render HTML content if needed
            dangerouslySetInnerHTML={{ __html: response || 'Ask anything!!' }} 
          />
            </div>
          </div>
          <textarea 
            className="w-full p-2 mt-2 border rounded"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            placeholder="Type your question..." />
          <button 
            className="flex items-center justify-center bg-indigo-600 text-white rounded p-2 mt-2 w-full hover:bg-indigo-700"
            onClick={handleQuerySubmit}>
            <FaPaperPlane className="mr-2" /> {/* Icon next to text */}
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatbotIcon;
