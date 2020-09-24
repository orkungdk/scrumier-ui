<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    item-key="name"
    class="elevation-1"
    show-expand
  >
    <template v-slot:expanded-item="{ headers }">
      <td :colspan="headers.length"><j-stacked-bar /></td>
    </template>
  </v-data-table>
</template>

<script>
import JStackedBar from '@/components/j-stacked-bar'

export default {
  name: 'JWorklogTable',
  components: { JStackedBar },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      headers: [
        {
          text: 'User',
          align: 'start',
          sortable: false,
          value: 'name'
        },
        { text: 'R', value: 'required' },
        { text: 'R%', value: 'requiredPercent' },
        { text: 'Logged', value: 'logged' }
      ],
      singleExpand: true,
      expanded: []
    }
  }
}
</script>

<style scoped></style>
