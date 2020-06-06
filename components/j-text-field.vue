<template>
  <v-text-field
    class="j-text-field"
    :label="label"
    :type="type"
    outlined
    clearable
    dense
    :value="value"
    :hint="hint"
    :rules="[this.rules.requiredRule, this.rules.emailRules]"
    @input="$emit('input', $event)"
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
    hint: {
      type: String,
      default: ''
    },
    minCharacter: {
      type: Number,
      default: 0
    },
    required: {
      type: Boolean,
      default: false
    },
    isEmail: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // eslint-disable-next-line no-useless-escape
      emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      rules: {
        requiredRule: (value) => !this.required || !!value || 'Required.',
        emailRules: (value) =>
          !this.isEmail ||
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
          'E-mail must be valid'
      }
    }
  },
  methods: {
    handleInput() {
      this.$emit('input', this.value)
    }
  }
}
</script>
