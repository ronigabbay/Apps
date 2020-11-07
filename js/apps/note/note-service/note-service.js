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
                backgroundColor: '#fff'
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
                backgroundColor: '#fff'
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
                url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS8HPKgIa1QQyHe17fWIOYC-CWxu8uUhKlqpA&usqp=CAU",
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
                url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAeFBMVEX/twHuHCX/uwD/vQDtBSb5iBHtEib6jhD1Yhr/uQD/vgD/wADxSR3tDSb/wgD/tQD2bxX4ghLwNSDuIyP+rQD7mgr1aRfzWRr2chX9qAb8ngnxRB7+sAH5jA/6lgz6kg3/xwD3eRPwOB/yTxz9owf4fhLzXhnvKyF3AK0OAAAEkUlEQVR4nO2ca4+qOhSGpS3VlosgKCCoI6L8/3+4uV+LunM+zM7hfTKZTDKdxHnS1dVVVtlsAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP9XhJr/MHBNUP+2nXNJplqIOCrGbW8+/ZWP/Y9ATkyJN9FHt556IDuR3/nk/wKFPU2JtR/6E8RZGKdpzFmtPxFZC07coROxCRbtFaajta5/4qLWwh/DFU0k8dQyr77xWvVlrdOP6Gp93jBzkMzjk9/nQapx7xEcKn069I3D8ToQQm/a1B43f1zmZT9bDn1zmCO7EYI+50O4KZ88s936N9A3lhP3OoTYqUaY0s06r9A3luN3C5/Ym6rpyU0aSb+NaegbhW6fSEl0UG5sitl3dww/59A3VWO9uj0LPc6SRqvPeLLQ2B+QOqZmDl25QXWutlfo29wtFu6jFPomk+/c2BMkfFNpVBKL/SH0jWD3JnQFeX2w1/8N9LUTKm7t7R/v7VlW+QV9Iyles2dZSrmdZs+NkkhH6hjpY7daBD3OqtwxXmSc9aPc5NA3CMhdHbryspRy24GOfS8PSm3dgr4uIg+bMnQF/ZRyC2F2GbeezBj0dXMqq+yJzynXcu2YazyXR+jrplS1ZxGJssodwwN7azHm2iGCt1VilvZIlL9f9prBNzs5+3bWhDL0aV5ZrMntN/LK8H24Nz2woK8N3SspKo37t5WGxovgxYFVq485dOFodElfP02hj6dCiL35ttIY4qUFBw3nfbU+KxLET7+2V6QZYhgy2VnQVwsg5w912lifvAavUyJTDn0af0hyWThYXtLnMl4Ubdj3laHryu33SaPVV1i3n9BX6AvlvJHgq9nnQF9J8jeJo9K3jc0gkWjSqHQ8pBDvmqjm+qhhGPsXMm/lgz3Juxa+GV5ckGLf11YdPBOCPr+PX17S/Ax99VEpvf7F7oWzVjb0NQf1n54QDbBO7h1HBv2BVdWOK8SH55MdORX2A2tfb6tqUf42gVh340Wu6O/rZfGUVP70b+LXSiJ2ljn0DZTUTaWLfVUDeGCfWGA82wOH3/4/fonxc97mKTnxPyYQdqZJkpA9Zt/QStNQ/7HBhcfyHN7Dq33CgdVQy6MWIcTSZaNmXJiZzGJpdoG+UVA2/WmCuu/91dFtoUVo7IW13ZHy+woE+vpplbe9uSR798C8LHg5qo55c27QuiD+7CZbJy/2Q4s5/hHNucuhuHyPkpv2kzkyybH2zeV090sXK7jyXseutQd9Yzdp/34CqSvXP27SjCYe1j7V7GOn/kaguk23mH161F1cgL6Jv23vQ/kMqbxRqUX2Eycu6sWtvxSoTCD1fd7o54bUoVzbBldSlQkk35mce7tTDH0qWDh8l4HUrdl9cq51++b16hPnhZ0dOw7fjvH+nkdX6K0PES94yUdKSLTchMDj1drbiOTAuAo2eg1OdQRoqQceZu9rWhFC6DsFr+vEiaBnRzVwp6/8JWCEqpg7EeqBa00bAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArIE/GtpFQ1qgfJMAAAAASUVORK5CYII=",
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
                url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRySijn1p-MyrR0eqbkNnN6oIybFhMvz8ZYbQ&usqp=CAU",
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
                url: "https://image.slidesharecdn.com/kodakpresentationrev-101116153026-phpapp01/95/kodak-case-study-1-638.jpg?cb=1422673854",
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