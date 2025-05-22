const Item = require('../models/item');

exports.getStatus = (req, res) => {
  res.json({ status: 'ok' });
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ error: 'Server error while fetching items' });
  }
};

exports.createItem = async (req, res) => {
  try {
    // Validering av input
    const { name, description, category, price, inStock } = req.body;
    
    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const itemData = {
      name: name.trim(),
      description: description ? description.trim() : '',
      category: category || 'other',
      price: price || 0,
      inStock: inStock !== undefined ? inStock : true
    };

    const item = new Item(itemData);
    await item.save();
    
    res.status(201).json(item);
  } catch (err) {
    console.error('Error creating item:', err);
    
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        error: 'Validation error', 
        details: err.message 
      });
    }
    
    res.status(500).json({ error: 'Server error while creating item' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Sjekk om ID er gyldig MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: 'Invalid item ID format' });
    }

    const result = await Item.findByIdAndDelete(id);
    
    if (!result) {
      return res.status(404).json({ error: 'Item not found' });
    }
    
    res.json({ 
      message: 'Item deleted successfully',
      deletedItem: result
    });
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ error: 'Server error while deleting item' });
  }
};