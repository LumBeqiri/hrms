<template>
    <div class="page_content">
      <h2>Dashboard</h2>
    </div>
</template>
<script>
export default {
  name : 'Dashboard',
  metaInfo: {
    title: 'Dashboard',
    titleTemplate: '%s | vue-meta Example App'
  },
  components:{},
  computed: {},
  watch: {
    $route: {
          immediate: true,
          handler(to, from) {
              document.title = to.meta.title || 'Dashboard';
          }
      },
  },
  data(){
     return {}
  },
  methods:{},
  created(){},
  mounted(){},
}
</script>
<style lang="scss" scoped></style>
