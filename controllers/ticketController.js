const Ticket = require('../models/ticket');

// Create a new ticket
exports.createTicket = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const ticket = new Ticket({ title, description, status });
    await ticket.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all tickets
exports.getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single ticket by ID
exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a ticket by ID
exports.updateTicket = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    let ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    ticket.title = title || ticket.title;
    ticket.description = description || ticket.description;
    ticket.status = status || ticket.status;
    ticket.updatedAt = Date.now();

    await ticket.save();
    res.status(200).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a ticket by ID
exports.deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    await ticket.remove();
    res.status(200).json({ message: 'Ticket removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
