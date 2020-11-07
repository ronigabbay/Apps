import {eventBus, EVENT_NOTE_ADDED, EVENT_NOTE_PINNED,
	EVENT_NOTE_STYLED, EVENT_NOTE_EDITING, EVENT_NOTE_UPDATED,
	EVENT_NOTE_DELETED, EVENT_LIST_NOTE_STATUS_CHANGED, EVENT_NOTE_FILTERED
} from '../../../service/event-bus-service.js'



export default {
	props: ['note'],
	template: `
		<aside class="note-actions">

			<span> &nbsp; </span>
			
				<div class="dropdown-content">
					<template v-for="color in availableColors">
						<span :style="{'background-color': color.value}" class="color-palet"
							:class="getBgColorClass(color.value)"
							@click="styleNote(color.value)">&nbsp; </span>
					</template>
				</div>
            </i>
            <img src="./assets/icons/edit.ico" class="fas fa-edit" title="Edit" @click="editNote"/>
		</aside>
	`,
	computed: {
		getIconClass() {
			return this.noteTypesInfo.icon + ' visible';
		},
		getIconTitle() {
			return this.capitalizeFirstLetter(this.note.settings.noteType + ' note');
		},
	},
	methods: {
		pinNote() {
			eventBus.$emit(EVENT_NOTE_PINNED, this.note.id);
		},
		styleNote(newBgColor) {
            console.log('bgcolor',newBgColor);
			eventBus.$emit(EVENT_NOTE_STYLED, this.note.id, newBgColor);
		},
		editNote() {
			eventBus.$emit(EVENT_NOTE_EDITING, this.note.id);
		},
		removeNote() {
			eventBus.$emit(EVENT_NOTE_DELETED, this.note.id);
		},
		capitalizeFirstLetter(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		},
		getBgColorClass(color) {
            // console.log(this.note,'this note actions');
			return (this.note.styles.backgroundColor === color) //? 'selected' : '';
		},
	},
	data() {
		return {
			availableColors: [
				{ value: '#ffffff', name: 'white' },
				{ value: '#ff8888', name: 'red' },
				{ value: '#ffcc88', name: 'orange' },
				{ value: '#ffff88', name: 'yellow' },
				{ value: '#ccff99', name: 'green' },
				{ value: '#aaffee', name: 'turquoise' },
				{ value: '#88ddff', name: 'sky' },
				{ value: '#88bbff', name: 'blue' },
				{ value: '#ddbbff', name: 'purple' },
				{ value: '#dddddd', name: 'grey' },
			]
		}
	}
}




