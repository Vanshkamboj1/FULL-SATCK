// server.js
// Combined Implementation: Playing Cards CRUD API + Concurrent Ticket Booking System
// Author: Vansh Kamboj
// Date: October 2025

const express = require('express');
const app1 = express(); // For Playing Cards API
const app2 = express(); // For Ticket Booking System

app1.use(express.json());
app2.use(express.json());

// ===============================
// 🂡 RESTful API for Playing Cards
// ===============================

let cards = [
  { id: 1, suit: 'Hearts', value: 'A' },
  { id: 2, suit: 'Spades', value: '10' },
  { id: 3, suit: 'Diamonds', value: 'K' }
];

// GET all cards
app1.get('/cards', (req, res) => {
  res.json(cards);
});

// GET single card
app1.get('/cards/:id', (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  card ? res.json(card) : res.status(404).send('Card not found');
});

// CREATE new card
app1.post('/cards', (req, res) => {
  const { suit, value } = req.body;
  if (!suit || !value) return res.status(400).send('Suit and value are required');
  const newCard = { id: cards.length + 1, suit, value };
  cards.push(newCard);
  res.status(201).json(newCard);
});

// UPDATE existing card
app1.put('/cards/:id', (req, res) => {
  const card = cards.find(c => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).send('Card not found');

  const { suit, value } = req.body;
  if (!suit || !value) return res.status(400).send('Suit and value are required');

  card.suit = suit;
  card.value = value;
  res.json(card);
});

// DELETE a card
app1.delete('/cards/:id', (req, res) => {
  const index = cards.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Card not found');
  const deletedCard = cards.splice(index, 1);
  res.json(deletedCard);
});

// Start Playing Cards API
app1.listen(3000, () => console.log('🂡 Playing Cards API running at http://localhost:3000'));


// ===========================================
// 🎟️ Concurrent Ticket Booking System with Lock
// ===========================================

let seats = {
  A1: { booked: false, lockedBy: null, lockExpiresAt: null },
  A2: { booked: false, lockedBy: null, lockExpiresAt: null },
  A3: { booked: false, lockedBy: null, lockExpiresAt: null }
};

// Function to clear expired locks
function clearExpiredLocks() {
  const now = Date.now();
  for (const key in seats) {
    if (seats[key].lockExpiresAt && seats[key].lockExpiresAt < now) {
      seats[key].lockedBy = null;
      seats[key].lockExpiresAt = null;
    }
  }
}

// Lock a seat
app2.post('/lock/:seatId', (req, res) => {
  const seatId = req.params.seatId;
  const userId = req.body.userId;
  clearExpiredLocks();

  const seat = seats[seatId];
  if (!seat) return res.status(404).send('Invalid seat ID');
  if (seat.booked) return res.status(400).send('Seat already booked');
  if (seat.lockedBy && seat.lockExpiresAt > Date.now())
    return res.status(400).send('Seat is locked by another user');

  seat.lockedBy = userId;
  seat.lockExpiresAt = Date.now() + 60000; // lock for 60 seconds
  res.send(`Seat ${seatId} locked by ${userId}`);
});

// Book a seat
app2.post('/book/:seatId', (req, res) => {
  const seatId = req.params.seatId;
  const userId = req.body.userId;
  clearExpiredLocks();

  const seat = seats[seatId];
  if (!seat) return res.status(404).send('Invalid seat ID');
  if (seat.booked) return res.status(400).send('Seat already booked');
  if (seat.lockedBy !== userId) return res.status(403).send('Seat not locked by you');

  seat.booked = true;
  seat.lockedBy = null;
  seat.lockExpiresAt = null;
  res.send(`Seat ${seatId} successfully booked by ${userId}`);
});

// View seat status
app2.get('/seats', (req, res) => {
  clearExpiredLocks();
  res.json(seats);
});

// Start Booking System
app2.listen(4000, () => console.log('🎟️ Booking System running at http://localhost:4000'));
