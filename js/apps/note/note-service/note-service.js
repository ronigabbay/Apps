import { utilService } from '../../../service/util-service.js'

export const noteService = {
    getNotes,
    getEmptyNote,
    saveNote,
    remove,
    styleNote,
    getNoteById,
    updateListNoteStatus,
    saveTodo,
    editNote,
    closeEdit

}
const STORAGE_KEY = 'noteDB'

function getNotes() {
    gNotes = utilService.loadFromStorage(STORAGE_KEY)
    // console.log(notes,notes.length);
    if (!gNotes || !gNotes.length) {
        console.log('if statment');
        gNotes = _createNotes()
        // notes = gNotes
        console.log(gNotes);
        utilService.storeToStorage(STORAGE_KEY, gNotes)
    }
    return Promise.resolve(gNotes)

}

function remove(noteId) {
    const idx = gNotes.findIndex(note => note.id === noteId);
    gNotes.splice(idx, 1);
    utilService.storeToStorage(STORAGE_KEY, gNotes)

    return Promise.resolve()
}


function getNoteById(id) {
    var note = gNotes.find(note => note.id === id);
    return Promise.resolve(note);
}


function updateListNoteStatus(id, listIdx) {//not in use dbl check
    console.log('in service update status');
    return getNoteById(id)
        .then(note => {
            note.info.todos[listIdx].completed = !note.info.todos[listIdx].completed;
            saveNoteToStorage();
        });
}

function editNote(id, newData) {
    return getNoteById(id)
        .then(note => {
            if (note.isEdit && note.type === 'text') {
                note.info.txt = newData
            } else if (note.isEdit && note.type === 'todo') {
                note.info.todos.join('+')
                // return saveTodo(note)
                console.log(note.info.todos, note, 'wanted------');

            }
            saveNoteToStorage();
            note.isEdit = !note.isEdit;
            // return Promise.resolve(note);
        });

}

function closeEdit(id) {
    // console.log('pooo---------');
    return getNoteById(id)
        .then(note => {
            note.isEdit = !note.isEdit;
            console.log(note.isEdit, '--------');
            saveNoteToStorage();
            // return Promise.resolve(note)
        });
}


function saveTodo(note) {
    if (!note) Promise.reject();

    switch (note.type) {
        case 'todo':
            let listArr = note.info.todos.split('+');
            note.info.todos = listArr.map(item => {
                return { text: item, completed: false };
            });
            break;
        // default:
        // 	return Promise.reject();
    }
    note.id = utilService.makeId();
    gNotes.unshift(note);

    utilService.storeToStorage(STORAGE_KEY, note);
    return Promise.resolve(note);
}




function _createNotes() {
    return [
        {
            id: utilService.makeId(),
            type: "text",
            isPinned: true,
            isMarked: false,
            isEdit: false,
            styles: {
                backgroundColor: '#fff'
            },
            info: {
                txt: "Fullstack Me Baby!"
            }
        },
        {
            id: utilService.makeId(),
            type: "video",
            isPinned: true,
            isMarked: false,
            isEdit: false,
            styles: {
                backgroundColor: '#fff'
            },
            info: {
                url: "https://i.gifer.com/19Vg.gif"
            },
            placeholder: ''
        },
        {
            id: utilService.makeId(),
            type: "video",
            isPinned: true,
            isMarked: false,
            isEdit: false,
            styles: {
                backgroundColor: '#fff'
            },
            info: {
                url: "https://www.youtube.com/embed/eI4an8aSsgw"
            },
            placeholder: ''
        },
        {
            id: utilService.makeId(),
            type: "img",
            isPinned: true,
            isMarked: false,
            isEdit: false,
            styles: {
                backgroundColor: '#fff'
            },
            info: {
                url: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
                title: "Me playing Mi"
            },
            placeholder: ''

        },
        {
            id: utilService.makeId(),
            type: "todo",//was: note-to-do
            created: Date.now(),
            isPinned: true,
            isMarked: false,
            isEdit: false,
            styles: {
                backgroundColor: '#fff'
            },
            info: {
                todos: [
                    { txt: "Do that", doneAt: null },
                    { txt: "Do this", doneAt: 187111111 }
                ],

            },
            placeholder: ''

        },
        {
            id: utilService.makeId(),
            type: "todo",//was: note-to-do
            created: Date.now(),
            isPinned: true,
            isMarked: false,
            isEdit: false,
            styles: {
                backgroundColor: '#fff'
            },
            info: {
                todos: [
                    { txt: "get Milk", doneAt: null },
                    { txt: "Help Dafna make her homework", doneAt: null },
                    { txt: "Call grandma to wish a  happy birthday", doneAt: null },
                    { txt: "Ask for a raise", doneAt: null },
                    { txt: "Shower before your date", doneAt: null }
                ],

            },
            placeholder: ''

        }
    ]
}


// id: utilService.makeId(),
// type: "todo",//was: note-to-do
// created:Date.now(),
// info: {
//     todos: [
//         { txt: "Do that",doneAt: null },
//         { txt: "Do this",doneAt: 187111111 }
//     ],

function getEmptyNote() {
    return {
        id: utilService.makeId(),
        type: 'text',
        isPinned: false,
        isMarked: false,
        isEdit: false,
        styles: {
            backgroundColor: '#fff'
        },
        info: { txt: '', url: '', todos: [{ txt: '', doneAt: null }] }

    }
}

var gNotes = [
    {
        id: utilService.makeId(),
        type: "text",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: utilService.makeId(),
        type: "text",
        isPinned: true,
        info: {
            txt: "HOORAY AND WELCOME!"
        },
    },
    {
        id: utilService.makeId(),
        type: "img",
        info: {
            url: "http://some-img/me",
            title: "Me playing Mi"
        },
        style: {
            backgroundColor: "#00d"
        },

    },
    {
        id: utilService.makeId(),
        type: "todo",
        info: {
            label: "How was it:",
            todos: [
                { txt: "Do that", doneAt: null },
                { txt: "Do this", doneAt: 187111111 }
            ],
        },
    }
]


function styleNote(id, bgColor) {
    console.log('note id service:', id, 'color', bgColor);
    return getNoteById(id)
        .then(note => {
            note.styles.backgroundColor = bgColor;
            console.log(note);
            // _saveNotesToStorage(note);
            saveNoteToStorage()
        });
}

function saveNote(currNote) {
    // console.log(currNote.type);
    console.log(currNote.info.txt);
    gNotes.unshift(currNote)
    utilService.storeToStorage(STORAGE_KEY, gNotes)
    console.log(gNotes)
    return Promise.resolve(gNotes)

}





function saveNoteToStorage() {
    utilService.storeToStorage(STORAGE_KEY, gNotes);
}















// function saveNote(currNote) {
//     console.log(currNote.type);
//     console.log(currNote.info.txt);
//     gNotes.push(currNote)
//     utilService.storeToStorage(STORAGE_KEY, gNotes)
//     console.log(gNotes)
//     return Promise.resolve(gNotes)

// }