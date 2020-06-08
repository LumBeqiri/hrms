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
  
    CREATE_POSITION({}, positionDetails) {
   
      let current_api = API_CONFIG.API_ENDPOINT + 'positions'
      let data = { 
          ...positionDetails
      }
      return new Promise((resolve, reject) => {
        API_CONFIG.SITE_AXIOS
          .post(current_api, data , {
            cache: false,
            retryTimes: 2
          })
          .then(response => {
             resolve(true);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
  
  
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
  
    DELETE_POSITION({}, id) {
  
      let current_api = API_CONFIG.API_ENDPOINT + 'positions/'+ id

      return new Promise((resolve, reject) => {
        API_CONFIG.SITE_AXIOS
          .delete(current_api , {
            cache: false,
            retryTimes: 2
          })
          .then(response => {
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
  