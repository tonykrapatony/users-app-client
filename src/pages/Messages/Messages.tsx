import React, { FC, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

type MessagesProps = {}

const Messages: FC<MessagesProps> = () => {
  const [data, setData] = useState<string>('');
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);

  // Підключення до сервера через WebSocket
  const socket = io('http://192.168.0.105:5000');

  // Використовуємо useEffect для підключення до WebSocket при завантаженні компонента
  useEffect(() => {
    // Отримуємо повідомлення від сервера
    socket.on('getUsers', (users) => {
      console.log('Received from server:', users);
    });

    // Відключаємо сокет при відмонтованні компонента
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  // Обробник зміни в полі вводу
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value);
  };

  // Обробник відправки повідомлення
  const onSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(data)
    socket.emit('events', data);
  }

  const getUsers = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(data)
    socket.emit('users');
  }

  return (
    <div>
      <p>Messages</p>
      <p><input type="text" value={data} onChange={changeHandler} /></p>
      <p><button onClick={onSend}>Send</button></p>

      <p><button onClick={getUsers}>getUsers</button></p>

      <div>
        <h3>Received Messages:</h3>
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Messages;
