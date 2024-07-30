const ToDo = require('../models/toDoModels');

const getToDo = async (req, res) => {
  try {
    const toDo = await ToDo.find();
    res.json({data : toDo});
  } catch (err) {
    console.error('Error fetching ToDos:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

const deleteToDo = async (req, res) => {
  const { id } = req.body;
  try {
    if (!id) {
      return res.status(400).json({ error: 'Invalid ID' });
    }

    const deletedToDo = await ToDo.findByIdAndDelete(id);

    if (!deletedToDo) {
      return res.status(404).json({ error: 'ToDo not found' });
    }
    res.json({ message: 'ToDo deleted successfully' });
  } catch (err) {
    console.error('Error deleting ToDo:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

const saveToDo = async (req, res) => {
  const { text } = req.body;
  try {
    if (!text) {
      return res.status(400).json({ error: 'Text field is required' });
    }

    const newToDo = new ToDo({ text });
    await newToDo.save();
    console.log("Added Successfully...");
    res.json({message : "Task added Successfully"});
  } catch (err) {
    console.error('Error saving ToDo:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

module.exports = { getToDo, saveToDo, deleteToDo };
