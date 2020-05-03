<template>
  <v-text-field
    class="j-text-field"
    :label="label"
    :type="type"
    outlined
    clearable
    dense
    :rules="rules"
    v-bind:value="value"
    v-on:input="$emit('input', $event)"
  ></v-text-field>
</template>

<script>
export default {
  name: 'JTextField',
  props: {
    value: String,
    label: {
      type: String,
      default: 'Label'
    },
    type: {
      type: String,
      default: 'text'
    },
    errorMessage: {
      type: String,
      default: ''
    },
    minCharacter: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    rules: [(value) => !!value || 'Required.']
  }),
  methods: {
    handleInput() {
      this.$emit('input', this.value)
    }
  }
}
</script>
