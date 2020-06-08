<template>
<div class="page_content">
      <div class="container">
    
        <b-row align-v="center">

            <div class="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">
                <div class="hrms_breadcrumb">
                    <b-breadcrumb>
                      <b-breadcrumb-item href="#home">
                        
                        Dashboard
                      </b-breadcrumb-item>
                      <b-breadcrumb-item active>Departments</b-breadcrumb-item>
                    </b-breadcrumb>

              </div>
            </div>

            <div class="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">

                <div class="hrms_actions text-right">
                      <ul>
                        <li>
                            <b-button variant="primary" @click="openNewDepartmentModal">Create Department</b-button>
                        </li>
                      </ul>
                  </div>
            </div>
        </b-row>
    
      <template v-if="departmentList.length == 0">
        <div class="text-center mt-4 ml-4 mb-4 mr-4">
                <b-spinner label="Spinning"></b-spinner>
        </div>

      </template>
      <template v-else>

        <table class="hrms_table">
            <thead>
                <tr>
                  <td>Department</td>
                  <td>Operations</td>
                </tr>
            </thead>
            <tbody>
              <tr v-for="(department_item, index) in departmentList" :key="index">
                  <td>
                    {{department_item.name  }}
                  </td>
                
                  <template v-if="user_role.id == 1">
                      <td class="table-actions">
                        <b-button size="md" @click="deleteDepartment(department_item.id)" variant="danger" class="ml-2" type="submit">Delete</b-button>
                        <b-button size="md"  @click="openEditDepartmentModal(department_item.id, department_item.name)" variant="success" class="ml-2" type="submit">Edit</b-button>
                      </td>
                  </template>
                    <template v-if="user_role.id !== 1">
                      <td class="table-actions">
                          
                      </td>
                  </template>

              </tr>
            </tbody>
        </table>
      </template>


      </div>

      <create-new-department-modal ref="CreateNewDepartmentModal"/>
      <edit-department-modal ref="EditDepartmentModal"/>


    </div>
</template>
<script>
import CreateDepartmentModal from '@modals/createNewDepartmentModal.vue'
import EditDepartmentModal from '@modals/editDepartmentModal.vue'
import { globalMixings } from '@utils/global-mixin'
export default {
  mixins: [globalMixings],
  name : 'DepartmentPage',
  
  components:{
    'create-new-department-modal' : CreateDepartmentModal,
    'edit-department-modal': EditDepartmentModal
  },
  computed: {
      departmentList(){

              return this.$store.getters['departments/get_department_details']
      },
  },
  watch: {
      departmentList(newvalue){
              return newvalue
      },
  
      $route: {
          immediate: true,
          handler(to, from) {
              document.title = to.meta.title || 'Departments';
          }
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
      async deleteDepartment(id){
        let result =  await this.$store.dispatch('departments/DELETE_DEPARTMENT', id)
        await this.$store.dispatch('departments/GET_DEPARTMENTS')
      },

       openNewDepartmentModal(){
       this.$refs.CreateNewDepartmentModal.toggleModal();
      },
      openEditDepartmentModal(id, name){
       
        this.$refs.EditDepartmentModal.toggleModal(id, name);
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
