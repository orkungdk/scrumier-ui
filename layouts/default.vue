<template>
  <v-app light>
    <v-navigation-drawer
      v-if="$store.getters.isAuthenticated"
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
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
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon
        v-if="$store.getters.isAuthenticated"
        @click.stop="drawer = !drawer"
      />
      <v-btn
        v-if="$store.getters.isAuthenticated"
        icon
        @click.stop="miniVariant = !miniVariant"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn
        v-if="$store.getters.isAuthenticated"
        icon
        @click.stop="clipped = !clipped"
      >
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon style="margin-right: 5px" to="/" @click.stop="fixed = !fixed">
        <v-avatar size="45">
          <v-img :src="logoPath" height="50px" width="50px"> </v-img>
        </v-avatar>
      </v-btn>
      <v-toolbar-title style="color: #0151cc" v-text="title" />
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
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  middleware: ['session-control', 'auth'],
  data() {
    return {
      logoPath: require('../assets/small-logo.png'),
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-calendar-text',
          title: 'Timesheet',
          to: '/time-tracking/timesheet'
        },
        {
          icon: 'mdi-account-key',
          title: 'Administration',
          to: '/administration/admin-view'
        },
        {
          icon: 'mdi-help',
          title: 'About',
          to: '/about-page'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Jira Time Tracking'
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
