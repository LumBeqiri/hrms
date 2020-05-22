<template>
    <div class="page_content">
      <div class="container">
             <h1>Department Page</h1>

             <template v-if="departmentList.length == 0">
                <div class="text-center mt-4 ml-4 mb-4 mr-4">
                       <b-spinner label="Spinning"></b-spinner>
                </div>

             </template>
             <template v-else>
                <ul class="departments">
                  <li class="department_item" v-for="(department_item, index) in departmentList" :key="index">
                        <h5>{{department_item.name}}</h5>
                        <div class="department-actions" v-if="user_role.id == 1">
                          <b-button size="md"  :to="{ name: 'departmentSingle', params: { departmentId: department_item.id }}" variant="info" class="ml-2" type="submit">View</b-button>
                            <b-button size="md" @click="editDepartment(department_item.id)" variant="danger" class="" type="submit">Delete</b-button>
                            <b-button size="md"  @click="deleteDepartment(department_item.id)" variant="success" class="ml-2" type="submit">Edit</b-button>
                        </div>
                        <div class="department-actions" v-if="user_role.id == 2">
                            <b-button size="md"  :to="{ name: 'departmentSingle', params: { departmentId: department_item.id }}" variant="info" class="ml-2" type="submit">View</b-button>
                        </div>

                  </li>
                </ul>
             </template>


      </div>

    </div>
</template>
<script>
import { globalMixings } from '@utils/global-mixin'
export default {
  mixins: [globalMixings],
  name : 'DpeartmentPage',
  components:{},
  computed: {
      departmentList(){

              return this.$store.getters['departments/get_department_details']
      },
  },
  watch: {
      departmentList(newvalue){
              return newvalue
      },
  },
  data(){
     return {}
  },
  methods:{
      async get_departments(){
         let result =  await this.$store.dispatch('departments/GET_DEPARTMENTS')

      },
      editDepartment(departmentID){
        alert(departmentID)
      },
      deleteDepartment(departmentID){
        alert(departmentID)
      }

  },
  created(){
      this.get_departments();
  },
  mounted(){},
}
</script>
<style lang="scss" scoped>
    .departments{
        margin:0;
        padding:0;
        padding-top:40px;
        .department_item{
          display:flex;
          justify-content: space-between;
          margin-bottom:10px;
        }
    }
</style>
