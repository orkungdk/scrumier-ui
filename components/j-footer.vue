<template>
  <v-footer :fixed="true" app>
    <v-row justify="center" no-gutters>
      <!--      HOME -->
      <v-btn
        to="/time-tracking/timesheet"
        color="primary"
        text
        rounded
        class="my-2"
      >
        <b> Home </b>
      </v-btn>
      <!--      TEAM -->
      <v-btn color="primary" text rounded class="my-2">
        <b> Team </b>
      </v-btn>
      <!--      Git -->
      <v-btn
        color="primary"
        text
        rounded
        class="my-2"
        href="https://github.com/users/orkungdk/projects/1"
        target="_blank"
      >
        <b> Git </b>
      </v-btn>
      <!--      Contact Us -->
      <v-btn color="primary" text rounded class="my-2" @click="dialog = true">
        <b> Contact Us </b>
      </v-btn>
    </v-row>
    <v-dialog v-model="dialog" width="80%">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Contact Us
        </v-card-title>
        <j-text-field
          v-model="contact.email"
          label="E-mail"
          is-email
        ></j-text-field>
        <j-text-field v-model="contact.phone" label="Phone"></j-text-field>
        <j-text-field
          v-model="contact.message"
          label="Your Message"
        ></j-text-field>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-footer>
</template>

<script>
import JTextField from '~/components/j-text-field'
export default {
  components: { JTextField },
  data: () => ({
    dialog: false,
    contact: {
      email: '',
      phone: '',
      message: ''
    }
  })
}
</script>
<style scoped></style>
