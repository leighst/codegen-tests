'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { createNote, listNotes, updateNote } from "@/app/";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    async function fetchNotes() {
      const notesList = await listNotes();
      setNotes(notesList);
    }
    fetchNotes();
  }, []);

  const handleCreateNote = async () => {
    await createNote(currentNote);
    setCurrentNote('');
    // Refresh notes list after creating a note
    const notesList = await listNotes();
    setNotes(notesList);
  };

  const handleUpdateNote = async (noteId, content) => {
    await updateNote(noteId, content);
    setEditingNote(null);
    // Refresh notes list after updating a note
    const notesList = await listNotes();
    setNotes(notesList);
  };

  return (
    <div className="container mx-auto max-w-xl p-4">
      <header className="mb-4">
        <h3 className="text-lg font-semibold">ingest</h3>
      </header>
      <section className="mb-4">
        <Textarea
          className="mb-2"
          placeholder="Enter your note here..."
          value={currentNote}
          onChange={(e) => setCurrentNote(e.target.value)}
        />
        <Button onClick={handleCreateNote}>Add Note</Button>
      </section>
      <section>
        {notes.map((note) => (
          <Card key={note.id} className="mb-4 p-2">
            <Textarea
              as="div"
              readOnly
              className="resize-none border-none"
              value={note.content}
              onClick={() => setEditingNote(note)}
            />
          </Card>
        ))}
      </section>
      {editingNote && (
        <Dialog open={Boolean(editingNote)} onOpenChange={setEditingNote}>
          <DialogContent>
            <Textarea
              className="w-full mb-2"
              value={editingNote.content}
              onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
            />
            <Button onClick={() => handleUpdateNote(editingNote.id, editingNote.content)}>Update Note</Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
