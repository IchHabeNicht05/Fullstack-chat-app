const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config(); 
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173" }
});

io.on('connection', async (socket) => {
  console.log('Uživatel připojen:', socket.id);

  // 1. Načtení historie
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'asc' },
      take: 50
    });
    socket.emit('load_messages', messages);
  } catch (error) {
    console.error('Chyba DB:', error);
  }

  // 2. Logika pro indikátor psaní
  socket.on('typing', (data) => {
    // Pošleme informaci všem kromě odesílatele
    socket.broadcast.emit('user_typing', data);
  });

  // 3. Odesílání zpráv
  socket.on('send_message', async (data) => {
    try {
      const savedMessage = await prisma.message.create({
        data: {
          text: data.text,
          socketId: data.userId, 
        }
      });
      // Rozeslat všem i se jménem pro UI
      io.emit('receive_message', { ...savedMessage, userName: data.userName });
    } catch (error) {
      console.error('Chyba při ukládání:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Uživatel odpojen');
  });
});

server.listen(3001, () => {
  console.log('Server běží na portu 3001');
});