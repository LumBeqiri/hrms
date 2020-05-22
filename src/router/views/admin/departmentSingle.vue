<template>
    <div class="page_content">
        SINGLE DEPARTMENTS
    </div>
</template>
<script>
export default {
  name : 'SingleDepartment',
  components:{},
  computed: {},
  watch: {},
  data(){
     return {}
  },
  methods:{},
  created(){
      alert(this.$route.params.departmentId)
  },
  mounted(){},
}
</script>
<style lang="scss" scoped></style>
