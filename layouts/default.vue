<template>
  <v-app light>
    <v-navigation-drawer
      v-if="$store.getters.isAuthenticated"
      v-model="drawer"
      :clipped="clipped"
      :expand-on-hover="false"
      :permanent="true"
      :mini-variant="false"
      width="80"
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
          <v-row
            style="margin: 5px 0"
            no-gutters
            justify="center"
            align-content="center"
            class="tooltip"
          >
            <v-col>
              <svg width="48" height="48" viewBox="0 0 48 48">
                <g transform="translate(12 14)" fill="none" fill-rule="evenodd">
                  <rect
                    stroke="#004976"
                    stroke-width="1.5"
                    fill-opacity="0.64"
                    fill="#00D8F6"
                    x="0.75"
                    y="3.75"
                    width="22.5"
                    height="16.5"
                    rx="2"
                  ></rect>
                  <path fill="#004976" d="M1 4h22v4H1z"></path>
                  <rect
                    fill="#004976"
                    x="20"
                    width="2"
                    height="5"
                    rx="1"
                  ></rect>
                  <rect
                    fill="#004976"
                    x="11"
                    width="2"
                    height="5"
                    rx="1"
                  ></rect>
                  <rect fill="#004976" x="2" width="2" height="5" rx="1"></rect>
                  <rect
                    fill="#004976"
                    x="16"
                    y="15"
                    width="4"
                    height="2"
                    rx="0.5"
                  ></rect>
                  <rect
                    fill="#004976"
                    x="10"
                    y="15"
                    width="4"
                    height="2"
                    rx="0.5"
                  ></rect>
                  <rect
                    fill="#004976"
                    x="4"
                    y="15"
                    width="4"
                    height="2"
                    rx="0.5"
                  ></rect>
                  <rect
                    fill="#004976"
                    x="16"
                    y="10.5"
                    width="4"
                    height="2"
                    rx="0.5"
                  ></rect>
                  <rect
                    fill="#004976"
                    x="10"
                    y="10.5"
                    width="4"
                    height="2"
                    rx="0.5"
                  ></rect>
                  <rect
                    fill="#004976"
                    x="4"
                    y="10.5"
                    width="4"
                    height="2"
                    rx="0.5"
                  ></rect>
                </g>
              </svg>
            </v-col>
            <span class="tooltipText">{{ item.tooltip }}</span>
          </v-row>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary" :clipped-left="clipped" fixed app>
      <v-btn icon style="margin: 5px" to="/" @click.stop="fixed = !fixed">
        <v-avatar size="45">
          <v-img :src="logoPath" height="50px" width="50px"> </v-img>
        </v-avatar>
      </v-btn>
      <v-toolbar-title style="color: white; " v-text="title" />
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
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
          tooltip: 'Welcome'
        },
        {
          icon: 'mdi-calendar-today',
          title: 'Timesheet',
          to: '/time-tracking/timesheet',
          tooltip: 'My Work'
        },
        {
          icon: 'mdi-account-key',
          title: 'Administration',
          tooltip: 'Admin',
          to: '/administration/admin-view'
        },
        {
          icon: 'mdi-help',
          title: 'About',
          to: '/about-page'
        }
      ],
      miniVariant: true,
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

<style>
.tooltip {
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

  /* Position the tooltip text - see examples below! */
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
  right: 100%; /* To the left of the tooltip */
  margin-top: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent black transparent transparent;
}

.tooltip:hover .tooltipText {
  visibility: visible;
}
</style>
