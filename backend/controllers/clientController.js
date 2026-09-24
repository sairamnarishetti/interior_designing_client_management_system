const Client = require('../models/Client');
const User = require('../models/User');

// Get all clients with filtering and pagination
exports.getClients = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      status, 
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const query = {};
    
    // Add status filter if provided
    if (status) {
      query.status = status;
    }

    // Add search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    // Calculate skip value for pagination
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const total = await Client.countDocuments(query);

    // Get clients with pagination and sorting
    const clients = await Client.find(query)
      .populate('assignedDesigner', 'name email')
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      clients,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalClients: total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get single client by ID
exports.getClient = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id)
      .populate('assignedDesigner', 'name email')
      .populate('notes.createdBy', 'name');

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Create new client
exports.createClient = async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    
    // Populate designer info if assigned
    if (client.assignedDesigner) {
      await client.populate('assignedDesigner', 'name email');
    }
    
    res.status(201).json(client);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update client
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedDesigner', 'name email');

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete client
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Add note to client
exports.addNote = async (req, res) => {
  try {
    const { content } = req.body;
    const client = await Client.findById(req.params.id);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    client.notes.push({
      content,
      createdBy: req.user.id
    });

    await client.save();
    await client.populate('notes.createdBy', 'name');

    res.json(client.notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update client status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('assignedDesigner', 'name email');

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update last contact
exports.updateLastContact = async (req, res) => {
  try {
    const { notes, method } = req.body;
    const client = await Client.findByIdAndUpdate(
      req.params.id,
      {
        lastContact: {
          date: new Date(),
          notes,
          method
        }
      },
      { new: true }
    ).populate('assignedDesigner', 'name email');

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    res.json(client);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
