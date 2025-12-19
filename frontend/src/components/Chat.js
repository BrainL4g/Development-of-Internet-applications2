import { useState, useEffect, useRef } from 'react';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [connected, setConnected] = useState(false);
  const ws = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const socket = new WebSocket(`ws://${window.location.hostname}:8000/chat/ws`);

    socket.onopen = () => {
      setConnected(true);
    };

    socket.onmessage = (event) => {
      setMessages(prev => [...prev, event.data]);
    };

    socket.onclose = () => {
      setConnected(false);
      setMessages(prev => [...prev, 'Соединение закрыто']);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setMessages(prev => [...prev, 'Ошибка соединения']);
    };

    ws.current = socket;

    return () => {
      socket.close();
    };
  }, []);  // <-- Пустой массив — эффект только один раз!

  const sendMessage = () => {
    if (input.trim() && ws.current && connected) {
      ws.current.send(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>Чат магазина продуктов</h3>
        <span className={`status ${connected ? 'connected' : 'disconnected'}`}>
          {connected ? 'Подключено' : 'Отключено'}
        </span>
      </div>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className="message">
            {msg}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Введите сообщение..."
          disabled={!connected}
        />
        <button onClick={sendMessage} disabled={!connected}>
          Отправить
        </button>
      </div>
    </div>
  );
}

export default Chat;