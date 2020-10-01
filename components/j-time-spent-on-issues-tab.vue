<template>
  <v-row class="fill-height">
    <v-col cols="3">
      <v-list subheader two-line>
        <v-subheader inset>Folders</v-subheader>

        <v-list-item v-for="issue in issues" :key="issue.key">
          <v-list-item-avatar>
            <v-icon class="grey lighten-1" dark>
              mdi-folder
            </v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="issue.summary"></v-list-item-title>

            <v-list-item-subtitle v-text="issue.key"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col cols="9">
      <j-doughnut-chart></j-doughnut-chart>
    </v-col>
  </v-row>
</template>

<script>
import JDoughnutChart from '@/components/j-doughnut-chart'

export default {
  name: 'JTimeSpentOnIssuesTab',
  components: { JDoughnutChart },
  props: {
    issues: {
      type: Object,
      default: () => {}
    },
    doughnutData: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped></style>
