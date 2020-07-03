// Important imports that always should be present
import {
    API_CONFIG
  } from '@utils/server.js';
  
  
  const state = {
    bonuses: []
  };
  
  
  const mutations = {
    SET_BONUSES(state, data) {
      state.bonuses = data
    },

    RESET(state) {
      state.bonuses = []   
    }
  };
  
  
  const actions = {
  
    ADD_BONUS({}, bonus_details) {
   
      let current_api = API_CONFIG.API_ENDPOINT + 'payrolls'
      let data = { 
        ...bonus_details
    }
      console.log(bonus_details)

      return new Promise((resolve, reject) => {
        API_CONFIG.SITE_AXIOS
          .post(current_api, data , {
            cache: false,
            retryTimes: 2
          })
          .then(response => {
            console.log(response);
             resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    


  };
  
  const getters = {
    get_recruitments(state) {
      return state.recruitments
    },
    get_recruitment(state){
      return state.recruitment
    }

  };
  
  export default {
    state,
    mutations,
    actions,
    getters
  }
  