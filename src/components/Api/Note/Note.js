import api from '../../../lib/api';
import { apiFetch } from '../../../lib/api';

async function GetNoteByRelatedToId(relatedToId) {
  const serverUrl = `${apiFetch}/api/notes/relatedTo/${relatedToId}`;
  const response = await fetch(serverUrl, {
    method: 'GET',
  });
  return response.json();
}

const GetAllAssociatedNotes = (contacts) => {
  const response = api.get(`api/notes/contacts/${contacts}`);
  return response;
};

async function UpdateNote(noteId, body) {
  const serverUrl = `${apiFetch}/api/notes/${noteId}`;
  console.log(body);
  const response = await fetch(serverUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return response.json();
}

async function AddNote(body) {
  const serverUrl = `${apiFetch}/api/notes`;
  const response = await fetch(serverUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (response.ok) {
    return response.json();
  }

  return false;
}

async function DeleteNote(noteId) {
  const serverUrl = `${apiFetch}/api/notes/${noteId}`;
  const response = await fetch(serverUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    return true;
  }
  return false;
}

export {
  GetNoteByRelatedToId, GetAllAssociatedNotes, UpdateNote, AddNote, DeleteNote,
};
