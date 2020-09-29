<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="date"
        label="Date"
        prepend-icon="mdi-event"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="date" range>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
      <v-btn text color="primary" @click="saveDateAndEmitEvent">OK</v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'DatePickerMenu',
  data() {
    return {
      date: '',
      menu: false
    }
  },
  methods: {
    saveDateAndEmitEvent() {
      this.$refs.menu.save(this.date)
      this.$emit('dateChanged', {
        startDate: this.date[0],
        endDate: this.date[1]
      })
    }
  }
}
</script>

<style scoped></style>
