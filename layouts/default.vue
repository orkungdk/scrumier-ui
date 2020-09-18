<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="$store.getters.isAuthenticated"
      v-model="drawer"
      color="rgba(224, 236, 245, 0.35)"
      :clipped="clipped"
      :expand-on-hover="false"
      :mini-variant="miniVariant"
      mini-variant-width="80"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-icon>
            <v-img height="32" width="32" :src="item.icon" />
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      style="padding: 0 16px"
      color="primary"
      :clipped-left="clipped"
      fixed
      app
    >
      <v-app-bar-nav-icon
        style="color: white"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-btn icon style="margin: 5px" to="/" @click.stop="fixed = !fixed">
        <v-avatar size="45">
          <v-img :src="logoPath" height="50px" width="50px"> </v-img>
        </v-avatar>
      </v-btn>
      <v-toolbar-title
        style="color: white; font-family: Archivo Black,sans-serif; font-size: 1.8em"
        v-text="title"
      />
      <v-spacer />
      <v-menu bottom offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-avatar class="ma-2" v-bind="attrs" v-on="on">
            <img :src="$store.getters.getLoggedInUser.avatarUrl" alt="John" />
          </v-avatar>
        </template>
        <v-list dense>
          <v-list-item-group color="primary">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account-box-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title @click="detail">Details</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-history</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>History</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-exit-to-app</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title @click="logout">Logout</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'Index',
  middleware: ['session-control', 'auth'],
  data() {
    return {
      logoPath: require('../assets/small-logo.png'),
      clipped: true,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: require('../assets/calendar-lineal.svg'),
          title: 'Timesheet',
          to: '/time-tracking/timesheet',
          tooltip: 'My Work'
        },
        {
          icon: require('../assets/report.svg'),
          title: 'Reports',
          to: '/time-tracking/'
        },
        {
          icon: require('../assets/idea.svg'),
          title: 'Administration',
          tooltip: 'Admin',
          to: '/administration/admin-view'
        },
        {
          icon: require('../assets/information.svg'),
          title: 'About',
          to: '/about-page'
        }
      ],
      miniVariant: true,
      right: true,
      rightDrawer: false,
      title: 'KRONOS'
    }
  },
  methods: {
    logout() {
      this.$store.commit('logout')
      this.$router.push('/authentication/login')
    },
    detail() {
      this.$router.push('/user-details')
    }
  }
}
</script>

<style>
/*.tooltip {
  position: relative;
  display: inline-block;
}
.tooltip .tooltipText {
  overflow: visible;
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  !* Position the tooltip text - see examples below! *!
  position: absolute;
  z-index: 1;
  top: 5px;
  left: 105%;
}

.tooltip .tooltipText::after {
  overflow: visible;
  content: ' ';
  position: absolute;
  top: 50%;
  right: 100%; !* To the left of the tooltip *!
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent black transparent transparent;
}

.tooltip:hover .tooltipText {
  visibility: visible;
}*/
</style>
