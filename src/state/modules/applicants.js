// Important imports that always should be present
import {
  API_CONFIG
} from '@utils/server.js';


const state = {
  applicants: [],
  


};


const mutations = {
  SET_APPLICANTS(state, data) {
    state.applicants = data
  },

  RESET(state) {
    state.applicants = []
    
  }
};


const actions = {



  GET_APPLICANTS({commit}) {
    let current_api = API_CONFIG.API_ENDPOINT + 'applicants'


    return new Promise((resolve, reject) => {
      API_CONFIG.SITE_AXIOS
        .get(current_api, {}, {
          cache: true,
          retryTimes: 2
        })
        .then(response => {
          console.log(response);
          commit('SET_APPLICANTS', response.data); 
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });
  },




};

const getters = {
  get_applicants(state) {
    return state.applicants
  }

};

export default {
  state,
  mutations,
  actions,
  getters
}
