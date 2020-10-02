<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    hide-no-data
    hide-selected
    clearable
    label="Sprints"
    :placeholder="placeholder"
    return-object
  ></v-autocomplete>
</template>

<script>
import GetAllBoardsService from '@/service/time-tracker/GetAllBoardsService'

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
      return this.entries.map((entry) => entry.name)
    }
  },
  watch: {
    boardId(val) {
      if (this.items.length > 0) return

      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      // Lazily load input items
      GetAllBoardsService.getAllBoards()
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
