import { useEffect, useRef, useState } from 'react';
import ChatBubble from './chatBubble';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faCircleXmark, faPaperPlane  } from '@fortawesome/free-solid-svg-icons';

function ChatApp({ loggedInUser }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [clickedChatButton, setClickedChatButton] = useState(false);

  const ws = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    ws.current = new WebSocket('ws://localhost:8080/');

    ws.current.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.current.onmessage = (event) => {
      // Check if the message is a Blob
      if (event.data instanceof Blob) {
        const reader = new FileReader();
        reader.onload = () => {
          const newMessage = JSON.parse(reader.result);
          setMessages((prevMessages) => {
            // Check if the message is already in the state
            if (!prevMessages.some((msg) => msg.id === newMessage.id)) {
              return [...prevMessages, newMessage];
            }
            return prevMessages;
          });
        };
        reader.readAsText(event.data);
      } else {
        // Assume the message is a string
        const newMessage = JSON.parse(event.data);
        setMessages((prevMessages) => {
          // Check if the message is already in the state
          if (!prevMessages.some((msg) => msg.id === newMessage.id)) {
            return [...prevMessages, newMessage];
          }
          return prevMessages;
        });
      }
    };

    ws.current.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.current.close();
    };
  }, []);

  const sendMessage = () => {
    if (input.trim() !== '') {
      const message = {
        sender: loggedInUser.name,
        message: input,
        id: Date.now(),
        timestamp: new Date().toISOString() // Add timestamp here
      };
      ws.current.send(JSON.stringify(message));
      setMessages((prevMessages) => [...prevMessages, message]);
      setInput('');
    }
  };

  return (
    <>
      <div className='fixed bottom-4 right-4 z-10'>
        {clickedChatButton ? (
          <div className="chat-app w-80 h-96 bg-gray-100 shadow-lg rounded-lg flex flex-col">
            <div className="chat-window flex-1 overflow-y-auto p-4">
              <div className='flex justify-end'>
                <button
                  onClick={() => setClickedChatButton(false)}
                  className="w-6 h-6 text-red-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <FontAwesomeIcon icon={faCircleXmark} />
                </button>
              </div>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === loggedInUser.name ? 'justify-end' : 'justify-start'} mb-2`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg ${msg.sender === loggedInUser.name
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-black'
                      }`}
                  >
                    <div className="text-xs text-gray-500">
                      {msg.sender} - {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                    <div>
                      {msg.message}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="chat-input flex p-4 border-t border-gray-300 bg-white">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        ) : (
          <button
            className='bg-blue-500 text-white py-2 px-4 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75'
            onClick={() => setClickedChatButton(!clickedChatButton)}
          >
            <FontAwesomeIcon icon={faCommentDots} />
          </button>
        )}
      </div>
    </>
  );
}

export default ChatApp;