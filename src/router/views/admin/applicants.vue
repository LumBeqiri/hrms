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
                              <b-breadcrumb-item active>Applicants</b-breadcrumb-item>
                            </b-breadcrumb>

                      </div>
                    </div>
                    <div class="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">

                        <div v-if="user_role.name === HR_MANAGER() || user_role.name === CEO()" class="hrms_actions text-right">
                              <ul>
                                <li>
                                    <b-button variant="primary" @click="openNewApplicantModal">Register Applicant</b-button>
                                </li>
                              </ul>
                          </div>
                    </div>
               </b-row>
             <template v-if="applicants_list.length == 0">
                <div class="text-center mt-4 ml-4 mb-4 mr-4">
                       <b-spinner label="Spinning"></b-spinner>
                </div>

             </template>
             <template v-else>

                <table class="hrms_table">
                    <thead>
                        <tr>
                          <td>Name</td>
                          <td>Last Name</td>
                          <td>Email</td>
                          <td>Position</td>
                          <td>Department</td>
                          <td style="padding-right:50px;" class="l">
                            Operations
                          </td>
                        </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(applicant, index) in applicants_list" :key="index">
                          <td>
                            {{applicant.first_name | capitalizeLetter}}
                          </td>
                          <td>
                             {{applicant.last_name | capitalizeLetter}}
                          </td>
                          <td>
                             {{applicant.personal_email }}
                          </td>
                          <td>
                             {{applicant.position.name | capitalizeLetter}}
                          </td>
                          <td>
                             {{applicant.position.department.name | capitalizeLetter}}
                          </td>
                        
                          <template v-if="user_role.name === HR_MANAGER() || user_role.name === CEO()">
                              <td class="table-actions">
                                <b-button size="md" @click="deleteApplicant(applicant.id)" variant="danger" class="ml-2" type="submit">Delete</b-button>
                                <b-button size="md"  @click="openEditApplicantModal(applicant.id)" variant="success" class="ml-2" type="submit">Edit</b-button>
                              </td>
                          </template>
                           <template v-else>
                              
                          </template>

                      </tr>
                    </tbody>
                </table>
             </template>


      </div>

      <create-new-applicant-modal ref="CreateApplicantModal"/>
      <edit-applicant-modal ref="EditApplicantModal"/>


    </div>

</template>
<script>
import CreateApplicantModal from '@modals/createNewApplicantModal.vue'
import EditApplicantModal from '@modals/editApplicantModal.vue'

import { globalMixings } from '@utils/global-mixin'
export default {
  mixins: [globalMixings],
  name : 'Applicants',
  components:{
    'create-new-applicant-modal' : CreateApplicantModal,
    'edit-applicant-modal': EditApplicantModal
  },
  computed: {
      applicants_list(){
              return this.$store.getters['applicants/get_applicants']
      },
  },
  watch: {
      applicants_list(newvalue){
              return newvalue
      },
      $route: {
          immediate: true,
          handler(to, from) {
              document.title = to.meta.title || 'Applicants';
          }
      },
  },
  data(){
     return {}
  },
  methods:{
      async get_applicants(){
         let result =  await this.$store.dispatch('applicants/GET_APPLICANTS')

      },
      async deleteApplicant(id){
      var result = confirm("Want to delete?");
      if (result) {
        let result =  await this.$store.dispatch('applicants/DELETE_APPLICANT', id)
        await this.$store.dispatch('applicants/GET_APPLICANTS')
      }

         
      },
      
      openNewApplicantModal(){
       this.$refs.CreateApplicantModal.toggleModal();
      },
      openEditApplicantModal(id){
       
        this.$refs.EditApplicantModal.toggleModal(id);
      }

  },
  created(){
      this.get_applicants();
  },
  mounted(){},
}
</script>
<style lang="scss" scoped>
   


</style>
