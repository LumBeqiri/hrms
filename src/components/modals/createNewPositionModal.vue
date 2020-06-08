<template>
  <b-modal
    modal-class="msrt-modal "
    dialog-class="modal-content mstr-medium-modal"
    header-class="msrt-modal-title without-icon primary"
    body-class="modal-body-desc modal-with-form"
    footer-class="modal_actions"
   
    @hide="ChangeToDefault"
    ref="CreateNewUserModal"
    title="Using Component Methods"
  >
    <template v-slot:modal-header="{ close }">
      <!-- ICON CHANGE DEPENDING ON MASTER TYPE -->
      <div class="icon">
         <i class="mstr mstr-lg mstr-icon-tv-outline"></i>
      </div>

      <div class="title">
         
         <p>Open a new Position  </p>
        <!-- MODAL CLOSE ICON -->
        <div class="modal-close-action" @click="hideModal">
                
        </div>
      </div>
    </template>

    <!-- MODAL BODY -->
    <template v-slot:default="{ hide }">
       
      <form  class="hrms_form">
            <div class="row" align-v="center">
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                    <div class="form__group" >
                        <label>Position name</label>
                            <input
                            type="text"
                            v-model="name"
                            placeholder="Name"
                            class="hrms_input"
                            required
                            > 
                            <p v-show="validation.hasError('first_name')" class="error_message">
                                <template v-if="validation.allErrors('first_name') == 'Required.'">
                                    This field is required
                                 </template>
                                </p>        
                    </div>
                </div>
                <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6"> 
                        <div class="form__group" >
                                        <label>Role</label>
                                        <select class="hrms_input" v-model="role_id">
                                            <option value>Select Department</option>
                                            <option v-for="(department,index) in departmentList" :key="index" :value="department.id" >{{department.name}}</option>
                                        </select>
                                    
                                        <p v-show="validation.hasError('department')" class="error_message">
                                            <template v-if="validation.allErrors('department') == 'Required.'">
                                            This field is required
                                            </template>
                                        </p>
                                </div>
                    </div>
            </div><!--first row ends here-->
            <div class="row" align-v="center">
                    <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                        <div class="form__group" >
                                <label>Base Salary</label>
                            <input
                                    type="text"
                                    v-model="base_salary"
                                    placeholder="Base Salary"
                                    class="hrms_input"
                                    required
                                    >
                            <p v-show="validation.hasError('base_salary')" class="error_message">
                                    <template v-if="validation.allErrors('base_salary') == 'Required.'">
                                    This field is required
                                    </template>
                                </p>
                        </div>
                    </div>
                    
            </div><!--second row ends here-->
               

      </form>
    </template>

    <template v-slot:modal-footer="{ ok, cancel, hide }">
      <div class="button_item">
             <button type="button" @click="hideModal">Close</button>
      </div>
      <div class="button_item">
            <b-button
            @click="CreateUser()"
            variant="primary"
            type="submit"
            id="apply-filter-masters"
            >
            <template v-if="!buttonSubmitting">Add new user</template>
                <template v-else>
                    <b-spinner small variant="white" label="Spinning"></b-spinner>
                </template>
            </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
export default {

  name: 'CreateNewPositionModal',
  components: {
    
  },
  computed: {
   departmentList(){

              return this.$store.getters['departments/get_department_details']
      }
  
  },

  watch: {
    departmentList(newvalue){
              return newvalue
      },
  },


   data() {
        return {
                buttonSubmitting: false,
                name : '',
                department_id: '',
                qty: ''
    }
  },
  validators: {
    name: function(value) {
      return this.$Validator.value(value).maxLength(25).required()
    },
    department_id: function(value) {
      return this.$Validator.value(value).required()
    },
    qty: function(value) {
      return this.$Validator.value(value).maxLength(7).integer()
    },
  },
  
  
  methods: {

      async get_departments(){
         let result =  await this.$store.dispatch('departments/GET_DEPARTMENTS')
        
      },
   
    hideModal() {
      this.$refs['CreateNewUserModal'].hide()
    },
    toggleModal() {
      //console.log()
      this.$refs['CreateNewUserModal'].show()
    },

    /**
     * * EVENT FIRED BEFORE MODAL BECOMES VISIBLE
     */
    modalIsVisible() {
     
    },


    async CreateUser() {
      let validationSucceded = await this.$validate()
      console.log(validationSucceded)
    
        let data = {
                "first_name": this.first_name,
                "last_name" : this.last_name,
                "base_salary": this.base_salary,
                "street": this.street,
                "city" : this.city,
                "country" :this.country,
                "email": this.email,
                "department_id": this.department_id,
                "role_id": this.role_id,
                "password": this.password,
                "confirm_password": this.confirm_password
            }

console.log(data);
        let result = await this.$store.dispatch('users/CREATE_USER', data)
        if(result){
                await this.$store.dispatch('users/GET_HRMS_USERS')
                this.hideModal()
        }else{
            alert('Please confirm all fields , or there is a problem with api ')
        }
    },
    /**
     * * EVENT FIRED WHEN MODAL CLOSES
     */
    ChangeToDefault() {
      this.validation.reset()
    },
  },
   created(){
      this.get_departments();
      this.get_roles();
  },

}
</script>