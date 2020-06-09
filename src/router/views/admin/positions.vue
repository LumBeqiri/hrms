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
                              <b-breadcrumb-item active>Positions</b-breadcrumb-item>
                            </b-breadcrumb>

                      </div>
                    </div>

                    <div class="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">

                        <div class="hrms_actions text-right">
                              <ul>
                                <li>
                                    <b-button variant="primary" @click="openNewPositionModal">Open Position</b-button>
                                </li>
                              </ul>
                          </div>
                    </div>
               </b-row>

             <template v-if="position_list.length == 0">
                <div class="text-center mt-4 ml-4 mb-4 mr-4">
                       <b-spinner label="Spinning"></b-spinner>
                </div>

             </template>
             <template v-else>

                <table class="hrms_table">
                    <thead>
                        <tr>
                          <td>Name</td>
                          <td>Department</td>
                          <td>Open Positions</td>
                          <td>Operations</td>
                        </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(position, index) in position_list" :key="index">
                          <td>
                            {{position.name | capitalizeLetter }}
                          </td>
                          <td>
                             {{position.department.name | capitalizeLetter }}
                          </td>
                          <td>
                             {{position.qty}}
                          </td>
                        
                          <template v-if="user_role.id == 1">
                              <td class="table-actions">
                                <b-button size="md" @click="deletePosition(position.id)" variant="danger" class="ml-2" type="submit">Delete</b-button>
                                <b-button size="md"  @click="openEditPositionModal(position.id)" variant="success" class="ml-2" type="submit">Edit</b-button>
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

      <create-new-position-modal ref="CreateNewPositionModal"/>
      <edit-position-modal ref="EditPositionModal"/>


    </div>

</template>
<script>
import CreateNewPositionModal from '@modals/createNewPositionModal.vue'
import EditPositionModal from '@modals/editPositionModal.vue'

import { globalMixings } from '@utils/global-mixin'
export default {
  mixins: [globalMixings],
  name : 'Positions',
  components:{
    'create-new-position-modal' : CreateNewPositionModal,
    'edit-position-modal': EditPositionModal
  },
  computed: {
      position_list(){
             // console.log(this.$store.getters['positions/get_positions'])
              return this.$store.getters['positions/get_positions']
      },
      single_position(){

      }
  },
  watch: {
      position_list(newvalue){
              return newvalue
      },
      $route: {
          immediate: true,
          handler(to, from) {
              document.title = to.meta.title || 'Positions';
          }
      },
  },
  data(){
     return {}
  },
  methods:{
      async get_positions(){
         let result =  await this.$store.dispatch('positions/GET_POSITIONS')

      },
      async deletePosition(id){
         let result =  await this.$store.dispatch('positions/DELETE_POSITION', id)
         await this.$store.dispatch('positions/GET_POSITIONS')
      },

     
      openNewPositionModal(){
       this.$refs.CreateNewPositionModal.toggleModal();
      },
      openEditPositionModal(id){
        this.$refs.EditPositionModal.toggleModal(id);
      }

  },
  created(){
      this.get_positions();
  },
  mounted(){},
}
</script>
<style lang="scss" scoped>
   


</style>
