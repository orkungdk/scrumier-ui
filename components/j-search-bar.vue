<template>
  <v-container style="width: 40%">
    <v-flex class="search">
      <label>
        <input
          type="text"
          class="search-bar"
          placeholder="Search for issues or worklogs"
        />
      </label>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: 'JSearchBar'
}
</script>

<style scoped>
.search-bar {
  width: 100%;
  padding: 5px 12px;
  border: 2px solid #c4c6c6;
  border-radius: 5px;
  outline: none;
  color: #9dbfaf;
  transition: background-color 300ms ease-in;
  /*TODO: Change colors*/
}
.search-bar::placeholder {
  font-weight: bold;
  font-size: small;
  opacity: 0.6;
}
.search-bar:focus {
  transition: all 300ms ease-in;
  border-color: #919191;
}
.search-bar:hover {
  background-color: whitesmoke;
}
.search {
  width: 100%;
  position: relative;
}
</style>
