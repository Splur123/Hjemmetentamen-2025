const Item = require('../models/item');

exports.getStatus = (req, res) => {
  res.json({ status: 'ok' });
};

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createItem = async (req, res) => {
  try {
    const item = new Item({ name: req.body.name });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const result = await Item.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid ID' });
  }
};
