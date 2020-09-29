<template>
  <date-range-picker
    ref="picker"
    v-model="dateRange"
    :opens="opens"
    :locale-data="{ firstDay: 1, format: 'DD-MM-YYYY HH:mm:ss' }"
    :show-dropdowns="showDropdowns"
    :auto-apply="autoApply"
    @update="updateValues"
  >
    <template v-slot:input="picker" style="min-width: 350px;">
      {{ picker.startDate | date }} - {{ picker.endDate | date }}
    </template>
  </date-range-picker>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

export default {
  name: 'DatePickerMenu',
  components: { DateRangePicker },
  data() {
    return {
      opens: 'center',
      showDropdowns: 'true',
      autoApply: 'false',
      dateRange: {
        startDate: new Date(),
        endDate: new Date()
      }
    }
  },
  methods: {
    updateValues() {
      this.$emit('dateChanged', {
        startDate: this.dateRange.startDate.toISOString().substring(0, 10),
        endDate: this.dateRange.endDate.toISOString().substring(0, 10)
      })
    }
  }
}
</script>

<style scoped></style>
