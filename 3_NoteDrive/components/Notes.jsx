import React, { useEffect, useState } from "react";
function Notes(props) {
  const email = props.email;
  const [state, setState] = useState({
    notes: [],
    ids: [],
  });
  const [newNote, setNewNote] = useState("");
  function handleChange(e) {
    const target = e.target.name;
    const val = e.target.value;
    setState({ ...state, [target]: val });
  }
  function handleNewNote(e) {
    setNewNote(e.target.value);
  }
  async function updateNotes() {
    try {
      const response = await fetch("/getnotes", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      const data = await response.json();
      const notes = data.notes;
      const ids = data.ids;
      setState({ ...state, notes: notes, ids: ids });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    updateNotes();
  }, []);
  async function deleteNote(e) {
    const id = e.target.parentElement.dataset.id;
    try {
      const response = await fetch("/deletenote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      });
      updateNotes();
    } catch (error) {
      console.log(error);
    }
  }
  async function addNote() {
    try {
      const response = await fetch("/addnote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: newNote, email: email }),
      });
      setNewNote("");
      updateNotes();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div id="dashboard">
      <div id="addNote">
        <h2>New Note!</h2>
        <textarea
          name="newNote"
          type="text"
          onChange={handleNewNote}
          value={newNote}
        />
        <button onClick={addNote}>Add</button>
      </div>
      <div id="notesContainer">
        {state.notes.map((note, index) => {
          return (
            <div
              key={state.ids[index]}
              data-id={state.ids[index]}
              className="note"
            >
              <span className="noteIndex">{index + 1}. </span>
              {note}
              <img
                src="./images/trash.png"
                alt="delete icon"
                className="trashNote"
                onClick={deleteNote}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Notes;
