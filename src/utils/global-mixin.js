export const globalMixings = {
  computed: {
      user_role(){
          return this.$store.getters['user/auth/get_user_role']
      }
  },
  watch:{
    user_role(newvalue){
      return newvalue
    }
  },
  data() {
    return {}
  },
  filters:{
    capitalizeLetter(value){
        return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  methods: {},
  created() {}

}
