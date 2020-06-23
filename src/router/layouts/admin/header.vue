
<template>
    <header>
             <b-navbar toggleable="lg" type="light" variant="transparent  ">
                    <div class="container">
                        <b-navbar-brand :to="'/'">
                            <img src="/images/logo.svg" height="40px"/>
                        </b-navbar-brand>

                        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

                        <b-collapse id="nav-collapse" is-nav>
                        <b-navbar-nav>
                            <b-nav-item :to="'/app/dashboard'">Dashboard</b-nav-item>
                            <b-nav-item :to="'/app/departments'">Departments</b-nav-item>
                            <b-nav-item :to="'/app/users'">Users</b-nav-item>
                            <b-nav-item :to="'/app/positions'">Positions</b-nav-item>
                            <b-nav-item :to="'/app/applicants'">Applicants</b-nav-item>
                            <b-nav-item :to="'/app/recruitments'">Recruitments</b-nav-item>
                        </b-navbar-nav>

                        <!-- Right aligned nav items -->
                        <b-navbar-nav class="ml-auto">
                              <b-nav-item-dropdown right>
                                <!-- Using 'button-content' slot -->
                                <template v-slot:button-content>
                                  {{user_profile_info.metadata.first_name | capitalizeLetter }}
                                </template>
                                <b-dropdown-item href="#">Profile</b-dropdown-item>
                                <b-dropdown-item  @click="logoutUser()">Sign Out</b-dropdown-item>
                              </b-nav-item-dropdown>
                            </b-navbar-nav>

                        </b-navbar-nav>
                        </b-collapse>
                    </div>
                </b-navbar>


   </header>
</template>

<script>
import {globalMixings} from '@/src/utils/global-mixin.js'
export default {
    mixins: [ globalMixings ],
    components: { },
    computed: {
        user_profile_info(){
                return this.$store.getters['user/auth/get_user_details']
        },
    },
    watch: {
        user_profile_info(newvalue){
                return newvalue
        },
    },


     data(){
      return {}
    },
    methods:{

      async logoutUser(){
        await this.$store.dispatch('user/auth/LogOutUser')
      },
      async get_user_data(){
         let result = await this.$store.dispatch('user/auth/GET_USER_PROFILE')

      }
    },
    filters:{
        capitalizeLetter(value){
            return value.charAt(0).toUpperCase() + value.slice(1)
        }
    },


    created() {
        this.get_user_data();
    },

}
</script>



<style lang="scss" module>

</style>
