<template>
  <span style="order: 1">
    <v-btn height="50px" width="95%" depressed class="addWorklogButton">
      <div class="addWorklogButtonHovered">
        <span>
          Log Time
        </span>
      </div>
      <span class="plusIcon"><v-icon>mdi-plus</v-icon></span>
    </v-btn>
  </span>
</template>

<script>
export default {
  name: 'JWorklogAddButton'
}
</script>

<style scoped>
.addWorklogButton {
  opacity: 0;
  margin: 5px auto;
  padding: 4px 8px;
}

.addWorklogButtonHovered {
  display: none;
}

.addWorklogButton:hover .addWorklogButtonHovered {
  display: flex;
  flex-direction: row;
}

.addWorklogButton:hover .plusIcon {
  display: none;
}
</style>
