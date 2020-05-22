<template>
  <div id="app">
    <mstrNotification/>
    <RouterView :key="$route.fullPath" />

    <div class="snackbar" v-if="snackWithButtons" >
        <div class="snackbar_content">
          <img src="/images/software.svg" width="30px">
          <p>New Version Available</p>

          <button  class="btn btn--primary smaller" @click.stop="refreshApp">
              Reload
          </button>

        </div>
     </div>

  </div>
</template>

<script>
import appConfig from '@src/app.config'
export default {

  methods: {
    async accept() {
      this.showUpgradeUI = false
      await this.$workbox.messageSW({ type: "SKIP_WAITING" });
    },
    showRefreshUI(e) {
      // Display a snackbar inviting the user to refresh/reload the app due
      // to an app update being available.
      // The new service worker is installed, but not yet active.
      // Store the ServiceWorkerRegistration instance for later use.
      this.registration = e.detail;
      this.snackBtnText = 'Refresh';
      this.snackWithBtnText = 'New version available!';
      this.snackWithButtons = true;
    },
    refreshApp() {
      this.snackWithButtons = false;
      // Protect against missing registration.waiting.
      if (!this.registration || !this.registration.waiting) { return; }
      this.registration.waiting.postMessage('skipWaiting');
    },
  },
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === 'function' ? title(this.$store) : title
      return title ? `${title} | ${appConfig.title}` : appConfig.title
    },
  },
  data() {
    return {
      refreshing: false,
      registration: null,
      snackBtnText: '',
      snackWithBtnText: '',
      snackWithButtons: false,
      timeout: 0,
    };
  },

  created(){
    // Listen for swUpdated event and display refresh snackbar as required.
    document.addEventListener('swUpdated', this.showRefreshUI, { once: true });
    // Refresh all open app tabs when a new service worker is installed.
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.refreshing) return;
      this.refreshing = true;
      window.location.reload();
    });

  }
}
</script>
<style lang="scss">
// Allow element/type selectors, because this is global CSS.
// stylelint-disable selector-max-type, selector-class-pattern

// Normalize default styles across browsers,
// https://necolas.github.io/normalize.css/
@import '~normalize.css/normalize.css';
// Style loading bar between pages.
// https://github.com/rstacruz/nprogress
@import '~nprogress/nprogress.css';

#nprogress .bar {
  background: #000;
}
.snackbar {
    &:before{
              position: fixed;
              content: "";
              background: rgba(0, 0, 0, 0.35);
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              right: 0;
              z-index: 99;
    }

    .snackbar_content{

         position: fixed;
        bottom: 30px;
        left: 0;
        right: 0;
        margin: 0 auto;
        max-width: 366px;
        padding: 20px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        background: #fff;
        z-index: 999;
        border-radius: 7px;
        align-content: center;
        align-items: center;

        p{
          margin:0;
          font-family: "Poppins",'sans-serif';
        }

        .snackClose{

        }
    }
}

</style>
