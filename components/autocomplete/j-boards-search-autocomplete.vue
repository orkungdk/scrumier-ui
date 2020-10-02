<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    hide-no-data
    hide-selected
    clearable
    label="Boards"
    item-text="name"
    item-value="id"
    placeholder="Start typing to search"
    prepend-icon="mdi-database-search"
    @change="$emit('boardSelected', { selectedItem: model })"
  ></v-autocomplete>
</template>

<script>
import GetAllBoardsService from '@/service/time-tracker/GetAllBoardsService'

export default {
  name: 'JBoardSearchAutocomplete',
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
    search(val) {
      // Items have already been loaded
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
