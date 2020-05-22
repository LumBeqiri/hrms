<template>
    <div class="page_content">



        <table class="hrms_table">
                    <thead>
                        <tr>
                          <td>Name</td>
                          <td>Surname</td>
                          <td>Department</td>
                          <td>Role</td>
                          <td></td>
                        </tr>
                    </thead>
                    <tbody>
                      <tr>
                          <td>
                            {{singleUser.metadata.first_name}}
                          </td>
                          <td>
                             {{singleUser.metadata.last_name}}
                          </td>
                          <td>
                            {{ singleUser.department.name }}
                          </td>
                          <td>
                            {{ singleUser.role.name }}
                          </td>
                      </tr>
                    </tbody>
          </table>


    </div>
</template>
<script>
import { globalMixings } from '@utils/global-mixin'

export default {
  mixins: [globalMixings],
  name : "UserSingle",
  components:{},
  computed: {
    singleUser(){
        return this.$store.getters['users/get_hrms_user']

      },
  },
  watch: {
    singleUser(newvalue){
              return newvalue
      },
  },
  data(){
     return {}
  },
  methods:{
    async get_user(){
        let user_id = this.$route.params.userId;
        let result =  await this.$store.dispatch('users/GET_HRMS_USER',user_id)

      }
  },
  created(){
    this.get_user();
  },
  mounted(){},
}
</script>
<style lang="scss" scoped>
    .hrms_table{
    display: table;
    width: 100%;
    background:#f1f1f1;
    border:2px solid #f1f1f1;

    td{
        padding:10px;

    }
    thead{
        tr{
                background: '#000'
        }
    }

}

$gl-ms         : "screen and (max-width: 23.5em)"; // up to 360px
$gl-xs         : "screen and (max-width: 35.5em)"; // up to 568px
$gl-sm         : "screen and (max-width: 48em)";   // max 768px
$gl-md         : "screen and (max-width: 64em)";   // max 1024px
$gl-lg         : "screen and (max-width: 80em)";   // max 1280px

table 			      {
  border-spacing: 1;
  border-collapse: collapse;
  background:white;
  border-radius:6px;
  overflow:hidden;
  max-width:800px;
  width:100%;
  margin:0 auto;
  position:relative;

  *               { position:relative }

  td,th           { padding-left:8px}

  thead tr        {
    height:60px;
    background:#FFED86;
    font-size:16px;
  }

  tbody tr        { height:48px; border-bottom:1px solid #E3F1D5 ;
    &:last-child  { border:0; }
  }

 	td,th 					{ text-align:left;
		&.l 					{ text-align:right }
		&.c 					{ text-align:center }
		&.r 					{ text-align:center }
	}
}


@media #{$gl-xs}              {

  table					              { display:block;
	  > *,tr,td,th              { display:block }

    thead                     { display:none }
    tbody tr                  { height:auto; padding:8px 0;
      td                      { padding-left:45%; margin-bottom:12px;
        &:last-child          { margin-bottom:0 }
        &:before              {
          position:absolute;
          font-weight:700;
          width:40%;
          left:10px;
          top:0
        }

        &:nth-child(1):before { content:"Code";}
        &:nth-child(2):before { content:"Stock";}
        &:nth-child(3):before { content:"Cap";}
        &:nth-child(4):before { content:"Inch";}
        &:nth-child(5):before { content:"Box Type";}
      }
    }
  }
}


</style>
