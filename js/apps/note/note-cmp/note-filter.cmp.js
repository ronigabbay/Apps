import { eventBus } from '../../../service/event-bus-service.js'
import { EVENT_NOTE_FILTERED } from '../../../service/event-bus-service.js'
export default {
    template: `
        <section class="search note-filter">

            <div>
                <!-- <button @input="updateFilter">updateFilter</button> -->
                <input v-model="filter.txt" class="search-input" type="search" placeholder="Search notes" @input="updateFilter">
            </div>

            <select v-model="filter.type" class="search-select" @change="updateFilter">
                <option value="">All</option>
                <option value="text">Text</option>
                <option value="img">Image</option>
                <option value="video">Video</option>
                <option value="todo">List</option>
            </select>				
            <!-- <select v-model="filter.color" placeholder="color"  name="color" @change="updateFilter">
                <option value="">All</option>
                <option value="#fff">White</option> IF TIME PERMITS DO COLORS!!
                <option value="#ff8888">Red</option>
                <option value="#ffcc88">Orange</option>
                <option value="#ffff88">Yellow</option>
                <option value="#ccff99">Green</option>
                <option value="#88bbff">Blue</option>
            </select>				 -->
        </section>`,
    data() {
        return {
            filter: { txt: '', color: '', type: '' }
        }
    },
    methods: {
        updateFilter() {
            eventBus.$emit(EVENT_NOTE_FILTERED, this.filter);
        },
    }
}
