import fs from 'fs';
import path from 'path';

export type Note = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export class NoteManager {
  private notes: Note[];

  constructor() {
    this.notes = [];
    this.loadNotes();
  }

  private loadNotes(): void {
    const notes = localStorage.getItem("notes");
    this.notes = notes ? JSON.parse(notes) : [];
  }

  private saveNotes(): void {
    this.logAction('DEBUG', 'Сохранение заметок.');
    localStorage.setItem("notes", JSON.stringify(this.notes));
  }

  public addNote(title: string, content: string): Note {
    this.logAction('INFO', `Попытка добавления новой заметки. Пользовательский ввод: Заголовок: "${title}", Содержимое: "${content}".`);
    title = title.trim();
    content = content.trim();
    this.logAction('DEBUG', `Очистка данных от пробелов. Обновленный заголовок: "${title}", Обновленное содержимое: "${content}".`);

    if (!title || !content) {
      this.logAction('ERROR', 'Ошибка добавления заметки. Причина: "Заголовок и содержимое не могут быть пустыми или состоять только из пробелов".');
      throw new Error("Заголовок и содержимое не могут быть пустыми или состоять только из пробелов");
    }
    if (this.notes.some(note => note.title === title)) {
      this.logAction('ERROR', 'Ошибка добавления заметки. Причина: "Заметка с таким заголовком уже существует".');
      throw new Error("Заметка с таким заголовком уже существует");
    }
    const note = this.createNote(title, content);
    this.notes.push(note);
    this.saveNotes();
    this.logAction('INFO', `Заметка успешно добавлена и сохранена. ID новой заметки: ${note.id}.`);
    return note;
  }

  private createNote(title: string, content: string): Note {
    const id = this.generateUniqueId();
    const timestamp = new Date().toISOString();
    this.logAction('DEBUG', `Генерация уникального ID для новой заметки. Сгенерированный ID: ${id}.`);
    this.logAction('INFO', `Создание новой заметки. ID: ${id}, Заголовок: "${title}", Содержимое: "${content}", Дата создания: ${timestamp}, Дата обновления: ${timestamp}.`);
    this.logAction('DEBUG', `Добавление заметки в массив. Текущее количество заметок: ${this.notes.length + 1}.`);
    return { id, title, content, createdAt: timestamp, updatedAt: timestamp };
  }

  private generateUniqueId(): number {
    return this.notes.length > 0 ? Math.max(...this.notes.map(note => note.id)) + 1 : 1;
  }

  private logAction(level: 'INFO' | 'DEBUG' | 'ERROR', message: string): void {
    const logMessage = `[${new Date().toISOString()}] ${level}: ${message}\n`;
    fs.appendFile(path.join(__dirname, 'logs', 'noteManager.log'), logMessage, err => {
      if (err) {
        console.error('Ошибка записи в файл логов:', err);
      }
    });
  }

  public updateNote(id: number, title: string, content: string): void {
    const noteIndex = this.notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      throw new Error("Note not found");
    }
    this.notes[noteIndex] = {
      ...this.notes[noteIndex],
      title,
      content,
      updatedAt: new Date().toISOString(),
    };
    this.saveNotes();
  }

  public deleteNote(id: number): void {
    const noteIndex = this.notes.findIndex((note) => note.id === id);
    if (noteIndex === -1) {
      throw new Error("Note not found");
    }
    this.notes.splice(noteIndex, 1);
    this.saveNotes();
  }

  public getNote(id: number): Note | undefined {
    return this.notes.find((note) => note.id === id);
  }

  public getAllNotes(): Note[] {
    return this.notes;
  }

  public searchNotes(query: string): Note[] {
    return this.notes.filter(
      (note) => note.title.includes(query) || note.content.includes(query)
    );
  }

  public filterNotesByDate(startDate: string, endDate: string): Note[] {
    return this.notes.filter((note) => {
      const noteDate = new Date(note.createdAt).getTime();
      return (
        noteDate >= new Date(startDate).getTime() &&
        noteDate <= new Date(endDate).getTime()
      );
    });
  }
}
