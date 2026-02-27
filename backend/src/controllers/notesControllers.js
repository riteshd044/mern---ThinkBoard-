import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  try {
    const filter =
      req.user.role === "user"
        ? { user: req.user._id }
        : {};

    const notes = await Note.find(filter)
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Server error while fetching notes" });
  }
};

export const getNoteById = async (req, res) => {
    try{
        const note = await Note.findById(req.params.id);
        if(!note) res.status(404).json({message:"Note not found!"})
        res.status(200).json(note);
    }catch(error){
        console.error("Error fetching note:", error);
        res.status(500).json({message:"Server error while fetching note"});
    }
};

export const createNote = async (req, res) => {
    try{
        const {title, content} = req.body;
        const user = req.user;
        const newNote = new Note({title:title, content:content, user:user._id});

        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    }catch(error){
        console.error("Error creating notes:", error);
        res.status(500).json({message:"Server error while creating notes"});
    }
};

export const putNote = async (req, res) => {
    try{
        const id = req.params.id;
        const updatedNote = await Note.findByIdAndUpdate(id, req.body,
            {
                new: true, // return the updated document instead of the old one.
                overwrite: true // make it true PUT . Replace the entire document with the provided data.
            });

        if(!updatedNote) res.status(404).json({message: "Note not found"});

        res.status(201).json(updatedNote);
    }catch(error){
        console.error("Error updating notes:", error);
        res.status(500).json({message:"Server error while updating notes"});
    }
};

export const patchNote = async (req, res) => {
    try{
        const id = req.params.id;
        const updatedNote = await Note.findByIdAndUpdate(id, { $set: req.body},
            { new: true });

        if(!updatedNote) res.status(404).json({message: "Note not found"});

        res.status(201).json(updatedNote);
    }catch(error){
        console.error("Error updating notes:", error);
        res.status(500).json({message:"Server error while updating notes"});
    }
};

export const deleteNote = async (req, res) => {
    try{
        const id = req.params.id;
        const deletedNote = await Note.findByIdAndDelete(id);
        
        if(!deletedNote) res.status(404).json({message:"note not found"});
        
        res.status(200).json(deletedNote);
    }catch(error){
        console.error("Error deleting notes:", error);
        res.status(500).json({message:"Server error while deleting notes"});
    }
    
};