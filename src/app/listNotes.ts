export async function listNotes() {
  // For now, return a list of 3 random notes.
  return [
    { id: 1, content: "First note content" },
    { id: 2, content: "Second note content" },
    { id: 3, content: "Third note content" }
  ];
}