// Important imports that always should be present
import {
    API_CONFIG
  } from '@utils/server.js';
  
  
  const state = {
    positions: [],

  
  
  };
  
  
  const mutations = {
    SET_POSITIONS(state, data) {
      state.positions = data
    },
    RESET(state) {
      state.positions = []
   
    }
  };
  
  
  const actions = {
  
  
  
    GET_POSITIONS({commit}) {
      let current_api = API_CONFIG.API_ENDPOINT + 'positions'
  
  
      return new Promise((resolve, reject) => {
        API_CONFIG.SITE_AXIOS
          .get(current_api, {}, {
            cache: true,
            retryTimes: 2
          })
          .then(response => {
            console.log(response);
            commit('SET_POSITIONS', response.data); 
            resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  

  

  

  
  
  };
  
  const getters = {
    get_positions(state) {
      return state.positions
    }

  };
  
  export default {
    state,
    mutations,
    actions,
    getters
  }
  