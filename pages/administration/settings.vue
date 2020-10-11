<template>
  <v-card>
    <v-tabs
      v-model="on"
      background-color="primary accent-4"
      centered
      dark
      icons-and-text
    >
      <v-tab v-for="tab in tabs" :key="tab">
        {{ tab.label }}
        <v-app-bar-nav-icon>
          <v-img height="32" width="32" :src="tab.icon" />
        </v-app-bar-nav-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="on">
      <v-tab-item v-for="tab in tabs" :key="tab">
        <v-card flat>
          <component :is="tab.tabItem"></component>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>
import JUserManagementTab from '~/pages/administration/tabs/j-user-management-tab'
import JGroupManagementTab from '~/pages/administration/tabs/j-group-management-tab'

export default {
  components: { JGroupManagementTab, JUserManagementTab },
  data() {
    return {
      on: null,
      tabs: [
        {
          key: 'userManagement',
          label: 'User Management',
          icon: require('~/assets/user-management.svg'),
          tabItem: 'j-user-management-tab'
        },
        {
          key: 'groupManagement',
          label: 'Group Management',
          icon: require('~/assets/group-management.svg'),
          tabItem: 'j-group-management-tab'
        },
        {
          key: 'scheduler',
          label: 'Scheduler',
          icon: require('~/assets/scheduler.svg'),
          tabItem: 'j-user-management-tab'
        },
        {
          key: 'configuration',
          label: 'Configuration',
          icon: require('~/assets/configuration.svg'),
          tabItem: 'j-user-management-tab'
        }
      ],
      text:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
  }
}
</script>

<style scoped></style>
