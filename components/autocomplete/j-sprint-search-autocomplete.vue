<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    item-text="name"
    item-value="id"
    hide-no-data
    hide-selected
    clearable
    label="Sprints"
    :placeholder="placeholder"
    @change="$emit('sprintSelected', { selectedItem: model })"
  ></v-autocomplete>
</template>

<script>
import GetSprintsInBoardService from '@/service/time-tracker/GetSprintsInBoardService'

export default {
  name: 'JSprintSearchAutocomplete',
  props: {
    boardId: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      entries: [],
      isLoading: false,
      model: null,
      search: null
    }
  },
  computed: {
    items() {
      return this.entries
    }
  },
  watch: {
    boardId(val) {
      if (this.items.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      // Lazily load input items
      GetSprintsInBoardService.getSprintsInABoard(val)
        .then((res) => res.data)
        .then((res) => {
          this.entries = res.values
        })
        .catch((err) => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    }
  }
}
</script>

<style scoped></style>
