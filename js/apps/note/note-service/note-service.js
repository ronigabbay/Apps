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
            type: "img",
            isPinned: true,
            isMarked: false,
            isEdit: false,
            styles: {
                backgroundColor: '#fff'
            },
            info: {
                url: "https://i.pinimg.com/originals/b0/3d/04/b03d044029121a37d9df316146581931.jpg"
            },
            placeholder: ''

        },
        {
            id: utilService.makeId(),
            type: "text",
            isPinned: true,
            isMarked: false,
            isEdit: false,
            styles: {
                backgroundColor: '#ffff88'
            },
            info: {
                txt: "Pick up kids from school at 15:00"
            }
        },
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
                txt: "Tarantino night tonight"
            }
        },
        {
            id: utilService.makeId(),
            type: "img",
            isPinned: true,
            isMarked: false,
            isEdit: false,
            styles: {
                backgroundColor: '#ccff99'
            },
            info: {
                url: "https://image.slidesharecdn.com/kodakpresentationrev-101116153026-phpapp01/95/kodak-case-study-1-638.jpg?cb=1422673854"
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
                url: "https://i.gifer.com/19Vg.gif"
            },
            placeholder: ''
        },
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
                txt: "Make resrvations for you and Dafna"
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
                backgroundColor: '#ffff88'
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
                    { text: "Call Mom", doneAt: null },
                    { text: "Sleep", doneAt: 187111111 }
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
                backgroundColor: '#ff8888'
            },
            info: {
                todos: [
                    { text: "get Milk", doneAt: null },
                    { text: "Help Dafna make her homework", doneAt: null },
                    { text: "Call grandma to wish a  happy birthday", doneAt: null },
                    { text: "Ask for a raise", doneAt: null },
                    { text: "Shower before your date", doneAt: null }
                ],

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
                backgroundColor: '#aaffee'
            },
            info: {
                url: "https://s4.glose.com/jMkmE6TLFS/28c46d8d0a2039df2448e09cf9a68c9f044cfb65/e30%3D/starfall/57dab8d9cd26cd0056d9b033-58084fea95cee4003cf1f2de.jpg",
                title: "Me playing Mi"
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
                backgroundColor: '#88bbff'
            },
            info: {
                url: "https://image.slidesharecdn.com/eastmankodakcompanyfuntimefilm-111208045748-phpapp02/95/eastman-kodak-company-funtime-film-1-728.jpg?cb=1495797569",
                title: "Me playing Mi"
            },
            placeholder: ''

        },
        {
            id: utilService.makeId(),
            type: "text",
            isPinned: true,
            isMarked: false,
            isEdit: false,
            styles: {
                backgroundColor: '#ddbbff'
            },
            info: {
                txt: "Watch the new South Park special"
            }
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
                url: "https://media.ksdk.com/assets/KSDK/images/da1f5878-dd34-4345-b645-bd113b7de5e5/da1f5878-dd34-4345-b645-bd113b7de5e5_750x422.jpg",
                title: "Me playing Mi"
            },
            placeholder: ''
        },
        {
            id: utilService.makeId(),
            type: "text",
            isPinned: true,
            isMarked: false,
            isEdit: false,
            styles: {
                backgroundColor: '#dddddd'
            },
            info: {
                txt: "JOB INTERVIEW TOMMOROW"
            }
        },
        {
            id: utilService.makeId(),
            type: "text",
            isPinned: true,
            isMarked: false,
            isEdit: false,
            styles: {
                backgroundColor: '#ffff88'
            },
            info: {
                txt: "Get your shit together"
            }
        },
        {
            id: utilService.makeId(),
            type: "todo",//was: note-to-do
            created: Date.now(),
            isPinned: true,
            isMarked: false,
            isEdit: false,
            styles: {
                backgroundColor: '#ddbbff'
            },
            info: {
                todos: [
                    { text: "Watch Borat 1", doneAt: null },
                    { text: "Watch Borat 2", doneAt: null },
                    { text: "Repeat", doneAt: null },
                ],

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
                url: "https://img1.looper.com/img/gallery/will-bojack-horseman-season-7-ever-happen/intro-1584547451.jpg",
                title: "Me playing Mi"
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
                url: "https://img4.goodfon.com/wallpaper/nbig/4/b9/chili-lake-pehoe-torres-del-paine-national-park-gory-skaly-o.jpg",
                title: "Me playing Mi"
            },
            placeholder: ''
        },
        {
            id: utilService.makeId(),
            type: "text",
            isPinned: true,
            isMarked: false,
            isEdit: false,
            styles: {
                backgroundColor: '#dddddd'
            },
            info: {
                txt: "Book a trip with Dafna"
            }
        },
        {
            id: utilService.makeId(),
            type: "todo",//was: note-to-do
            created: Date.now(),
            isPinned: true,
            isMarked: false,
            isEdit: false,
            styles: {
                backgroundColor: '#ff8888'
            },
            info: {
                todos: [
                    { text: "Wash the car", doneAt: null },
                    { text: "join scientology", doneAt: null },
                    { text: "Buy foof for Nabil", doneAt: null },
                ],

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
                url: "https://www.cam.ac.uk/sites/www.cam.ac.uk/files/styles/content-885x432/public/news/research/news/120315-kodak-color-film-credit-dok1-from-flickr.jpg?itok=XxdYADP1",
                title: "Me playing Mi"
            },
            placeholder: ''
        },

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