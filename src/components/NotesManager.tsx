import { useEffect, useState } from "react";
import { Note, NoteManager } from "@/utils/NoteManager";
import { MdNoteAdd } from "react-icons/md";
import NoteModal from "./NoteModal";

const NotesManager: React.FC = () => {
  const [noteManager, setNodeManager] = useState<NoteManager | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setNodeManager(new NoteManager());
  }, []);

  useEffect(() => {
    if (noteManager) {
      setNotes(noteManager.getAllNotes());
      setLoading(false);
    }
  }, [noteManager]);

  const openNoteModal = () => {
    const noteModal = document.getElementById("note-modal");
    if (noteModal instanceof HTMLDialogElement) {
      noteModal.showModal();
    }
  };

  const closeNoteModal = () => {
    const noteModal = document.getElementById("note-modal");
    if (noteModal instanceof HTMLDialogElement) {
      noteModal.close();
    }
  };

  if (loading)
    return (
      <div className="w-full flex flex-col items-center justify-center flex-1">
        <span className="loading loading-spinner loading-xs"></span>
      </div>
    );

  return (
    <>
      <li>
        <ul className="menu m-0 p-0 my-2 flex-row gap-2 justify-center before:bg-transparent">
          <li>
            <a
              className="menu-btn tooltip before:bg-transparent before:text-xs before:-mb-2.5 before:duration-0 after:hidden"
              data-tip="Создать заметку"
            >
              <button onClick={openNoteModal}>
                <MdNoteAdd size={20}></MdNoteAdd>
              </button>
            </a>
          </li>
        </ul>
      </li>
      <li className="text-xs">
        <p className="menu-title text-base-content text-xs">Список заметок</p>
        <ul className="flex flex-col gap-y-0.5 mt-0.5">
          {notes.map((note) => (
            <li key={note.id}>
              <a className="block p-0">
                <button className="px-4 py-2 w-full h-full text-left rounded-md">
                  {note.title}
                </button>
              </a>
            </li>
          ))}
        </ul>
      </li>
      <NoteModal noteManager={noteManager!} setNotes={setNotes} close={closeNoteModal}></NoteModal>
    </>
  );
};

export default NotesManager;
