<template>
  <span style="order: 1">
    <v-dialog v-model="dialog" persistent max-width="30%">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          height="50px"
          width="95%"
          depressed
          class="addWorklogButton"
          v-on="on"
        >
          <div class="addWorklogButtonHovered">
            <span>
              Log Time
            </span>
          </div>
          <span class="plusIcon"><v-icon>mdi-plus</v-icon></span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Log Time</span>
        </v-card-title>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-select
                :items="['0-17', '18-29', '30-54', '54+']"
                label="Select issue.."
                outlined
                required
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-textarea label="Description" outlined no-resize></v-textarea>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                prepend-icon="mdi-briefcase"
                outlined
                label="Worked*"
                required
              ></v-text-field>
            </v-col>
            <v-spacer />
            <v-col cols="12" md="6">
              <v-text-field
                prepend-icon="mdi-av-timer"
                outlined
                label="Remaining Estimate"
                required
              ></v-text-field>
              <v-spacer />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
export default {
  name: 'JWorklogAddButton',
  data: () => ({
    dialog: false
  })
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
