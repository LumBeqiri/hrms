<template>
  <div id="main-content" >
       <admin-header></admin-header>
       <router-view></router-view>
  </div>
</template>

<script>

  import AdminHeader from '@layouts/admin/header.vue'
  export default {

    components: {
        'admin-header': AdminHeader,
    },


  }
</script>

<style lang="scss" scoped>

</style>
