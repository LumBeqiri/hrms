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
                              <b-breadcrumb-item active>Users</b-breadcrumb-item>
                            </b-breadcrumb>

                      </div>
                    </div>

                    <div class="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">

                        <div class="hrms_actions text-right">
                              <ul>
                                <li>
                                    <b-button variant="primary" @click="openNewUserModal">Create user</b-button>
                                </li>
                              </ul>
                          </div>
                    </div>
               </b-row>
                


             <template v-if="hrms_users_list.length == 0">
                <div class="text-center mt-4 ml-4 mb-4 mr-4">
                       <b-spinner label="Spinning"></b-spinner>
                </div>

             </template>
             <template v-else>

                <table class="hrms_table">
                    <thead>
                        <tr>
                          <td>Name</td>
                          <td>Surname</td>
                          <td>Department</td>
                          <td>Role</td>
                          <td style="padding-right:80px;" class="l">Operations</td>
                        </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(user_item, index) in hrms_users_list" :key="index">
                          <td>
                            {{user_item.metadata.first_name | capitalizeLetter}}
                          </td>
                          <td>
                             {{user_item.metadata.last_name | capitalizeLetter}}
                          </td>
                          <td>
                             {{user_item.department.name | capitalizeLetter}}
                          </td>
                          <td>
                             {{user_item.role.name | capitalizeLetter}}
                          </td>
                          <template v-if="user_role.id == 1">
                              <td class="table-actions">
                                 <b-button size="md"  :to="{ name: 'usersSingle', params: { userId: user_item.id }}" variant="info" class="ml-2" type="submit">View</b-button>
                                <b-button size="md" @click="deleteUser(user_item.id)" variant="danger" class="ml-2" type="submit">Delete</b-button>
                                <b-button size="md"  @click="openEditUserModal(user_item.id)" variant="success" class="ml-2" type="submit">Edit</b-button>
                              </td>
                          </template>
                           <template v-if="user_role.id !== 1">
                              <td class="table-actions">
                                 <b-button size="md"  :to="{ name: 'usersSingle', params: { userId: user_item.id }}" variant="info" class="ml-2" type="submit">View</b-button>
                              </td>
                          </template>

                      </tr>
                    </tbody>
                </table>
             </template>


      </div>

      <create-new-user-modal ref="CreateNewUserModal"/>
      <edit-user-modal ref="EditUserModal"/>


    </div>

</template>
<script>
import CreateUserModal from '@modals/createNewUserModal.vue'
import EditUserModal from '@modals/editUserModal.vue'

import { globalMixings } from '@utils/global-mixin'
export default {
  mixins: [globalMixings],
  name : 'UsersPage',
  components:{
    'create-new-user-modal' : CreateUserModal,
    'edit-user-modal': EditUserModal
  },
  computed: {
      hrms_users_list(){

              return this.$store.getters['users/get_hrms_users']
      },
  },
  watch: {
      hrms_users_list(newvalue){
              return newvalue
      },
      $route: {
          immediate: true,
          handler(to, from) {
              document.title = to.meta.title || 'Users';
          }
      },
  },
  data(){
     return {}
  },
  methods:{
      async get_hrms_users(){
         let result =  await this.$store.dispatch('users/GET_HRMS_USERS')

      },
      async deleteUser(id){
        var result = confirm("Want to delete?");
        if (result) {
          let result =  await this.$store.dispatch('users/DELETE_USER', id)
          await this.$store.dispatch('users/GET_HRMS_USERS')
        }
         
      },

      openNewUserModal(){
       this.$refs.CreateNewUserModal.toggleModal();
      },
      openEditUserModal(id){
       
        this.$refs.EditUserModal.toggleModal(id);
      }

  },
  created(){
      this.get_hrms_users();
  },
  mounted(){},
}
</script>
<style lang="scss" scoped>
   


</style>
