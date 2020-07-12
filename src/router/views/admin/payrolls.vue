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
                              <b-breadcrumb-item active>Payrolls</b-breadcrumb-item>
                            </b-breadcrumb>

                      </div>
                    </div>

                    <div class="col-6 col-md-6 col-sm-6 col-lg-6 col-xl-6">

                        <div v-if="user_role.name === CEO() || user_role.name === FINANCIAL_MANAGER() " class="hrms_actions text-right">
                              <ul>
                                <li>
                                    <b-button variant="primary" @click="openNewPayrollModal">Generate Payroll</b-button>
                                </li>
                              </ul>
                          </div>
                    </div>
               </b-row>

            
             <template v-if="payrolls.length == 0">
                <div class="text-center mt-4 ml-4 mb-4 mr-4">
                       <b-spinner label="Spinning"></b-spinner>
                </div>

             </template>
             <template v-else>
               
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li style="cursor: pointer" class="page-item"><a class="page-link" @click="goBack(payrolls.prev_page_url)">Previous</a></li>
                    <li style="cursor: pointer; margin-right:17px" class="page-item"><a class="page-link" @click="goNext(payrolls.next_page_url)">Next</a></li>
                    <p>Page {{payrolls.current_page}}</p>
                    
                  </ul>
                 </nav>

               

                <table class="hrms_table">
                    <thead>
                        <tr>
                          <td>Name</td>
                          <td>Surname</td>
                          <td>Salary</td>
                          <td>Bonus</td>
                          <td>Date</td>

                          <!-- <td style="padding-right:50px;" class="l">Operations</td> -->
                        </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(payroll, index) in payrolls.data" :key="index">
                          <td>
                            {{payroll.user.first_name}}
                          </td>
                          <td>
                             {{payroll.user.last_name}}
                          </td>
                          <td>
                             {{payroll.sum}}
                          </td>
                          <td >
                            {{payroll.bonus}}
                          </td>
                          <td >
                            {{payroll.created_at | moment("dddd, MMMM Do YYYY")}} 
                          </td>


                      </tr>
                    </tbody>
                </table>
             </template>


      </div>

      <create-new-recruitment-modal ref="CreateNewRecruitmentModal"/>
      <edit-user-modal ref="EditUserModal"/>
      <add-bonus-modal ref="AddBonusModal"/>


    </div>

</template>
<script>
import CreateRecruitmentModal from '@modals/createNewRecruitmentModal.vue'
import EditUserModal from '@modals/editUserModal.vue'
import AddBonusModal from '@modals/addNewBonusModal.vue'


import { globalMixings } from '@utils/global-mixin'
export default {
  mixins: [globalMixings],
  name : 'PayrollsPage',
  components:{
    'create-new-recruitment-modal' : CreateRecruitmentModal,
    'edit-user-modal': EditUserModal,
    'add-bonus-modal': AddBonusModal

  },
  computed: {
      payroll_list(){
        this.payrolls =  this.$store.getters['payrolls/get_payrolls']
      },
  },
  watch: {
      payroll_list(newvalue){
              return newvalue
      },
      $route: {
          immediate: true,
          handler(to, from) {
              document.title = to.meta.title || 'Payrolls';
          }
      },
  },
  data(){
     return {
       payrolls:{}
     }
  },
  methods:{
      async get_payrolls(){
          await this.$store.dispatch('payrolls/GET_PAYROLLS')

      },

      openNewPayrollModal(){
       this.$refs.AddBonusModal.toggleModal();
      },
      openEditUserModal(id){
       
        this.$refs.EditUserModal.toggleModal(id);
      },

      async goNext(current_page) {
        await this.$store.dispatch('payrolls/GET_NEXT_PAGE', current_page)
      },
    
    async goBack(current_page) {
      await this.$store.dispatch('payrolls/GET_PREVIOUS_PAGE', current_page)
		},

  },
  created(){
      this.get_payrolls();
  },
  mounted(){},
}
</script>
<style lang="scss" scoped>
   


</style>
