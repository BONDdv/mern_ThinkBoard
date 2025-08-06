import Note from "../models/Note.js";

export const getAllNotes = async (req, res) => {    
    try {
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes)
    } catch (error) {
        console.log("Error in getAllNotes controller", error);
        res.status(500).json({message: "Internal server error"})
    }
}

export const createNotes = async (req,res) => {
    try {
        const {title, content} = req.body;
        const note = new Note({title,content});

        const saveNote = await note.save();
        res.status(201).json(saveNote)
    } catch (error) {
        console.log("Error in createNotes controller", error);
        res.status(500).json({message: "Internal server error"})
    }
}

export const updateNotes = async (req,res) => {
    try {
        const {title, content} = req.body;
        const updateNote = await Note.findByIdAndUpdate(
            req.params.id, 
            {title,content},
            {
                new:true,
            }
        )

        if(!updateNote) return res.status(404).json({message: "Note not found"});

        res.status(200).json(updateNote)
    } catch (error) {
        console.log("Error in updateNotes controller", error);
        res.status(500).json({message: "Internal server error"})
    }
}

export const deleteNotes = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)

        if(!deletedNote) return res.status(404).json({message: "Note not found"});

        res.status(200).json({message: "Note deleted successfully!!"})
    } catch (error) {
        console.log("Error in deleteNotes controller", error);
        res.status(500).json({message: "Internal server error"})
    }
}


export const getNoteById = async (req,res) => {
    try {
        const note = await Note.findById(req.params.id)

        if(!note) return res.status(404).json({message: "Note not found"});

        res.status(200).json(note)
    } catch (error) {
        console.log("Error in getNoteById controller", error);
        res.status(500).json({message: "Internal server error"})
    }
}