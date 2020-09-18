<template>
  <v-btn
    class="jira-time-tracker-button"
    rounded
    :color="color"
    nuxt
    :to="routingPath"
    :disabled="disabled"
    @click="action"
  >
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: 'JButton',
  props: {
    label: {
      type: String,
      default: 'Button'
    },
    color: {
      type: String,
      default: 'primary'
    },
    routingPath: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    action: {
      type: Function,
      default() {
        console.error('Button action needs to be added!')
      }
    }
  }
}
</script>

<style scoped></style>
