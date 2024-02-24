import React, { useState, useEffect } from "react";
import { Note, NoteManager } from "@/utils/NoteManager";

interface NoteModalProps {
  noteManager: NoteManager;
  setNotes: (notes: Note[]) => void; 
  close: () => void;
}

const NoteModal: React.FC<NoteModalProps> = ({ noteManager, setNotes, close }) => {
  const [noteTitle, setNoteTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");

  const saveNote = () => {
    noteManager.addNote(noteTitle, noteContent);
    setNotes(noteManager.getAllNotes());
    close();
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !(document.activeElement instanceof HTMLButtonElement)) {
      saveNote();
    }
  }

  return (
    <dialog id="note-modal" className="modal" onKeyDown={handleKeyDown}>
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-ghost w-8 h-8 no-animation text-base-content text-opacity-50 hover:bg-transparent hover:text-opacity-100 absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-base">Создание заметки</h3>
        <label className="form-control w-full py-2">
          <div className="label">
            <span className="label-text">Название заметки</span>
          </div>
          <input
            type="text"
            placeholder="Название заметки"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
            className="input input-md input-bordered w-full transition-all duration-150 focus:outline-0 focus:border-base-content"
          />
        </label>
        <label className="form-control w-full py-2">
          <div className="label">
            <span className="label-text">Содержимое заметки</span>
          </div>
          <textarea
            placeholder="Введите содержимое"
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            className="textarea textarea-md textarea-bordered h-24 w-full transition-all duration-150 focus:outline-0 focus:border-base-content"
          />
        </label>
        <div className="flex w-full justify-end gap-2">
          <button
            className="btn no-animation bg-base-200 hover:bg-base-300 hover:border-base-300"
            onClick={close}
          >
            Отмена
          </button>
          <button
            className="btn no-animation bg-base-content bg-opacity-90 text-base-200 hover:bg-base-content hover:bg-opacity-100"
            onClick={saveNote}
          >
            Сохранить
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default NoteModal;
