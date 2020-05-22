// Important imports that always should be present
import {
  API_CONFIG
} from '@utils/server.js';
import router from '@router'
import Vue from 'vue'



const state = {
  department_details: [],
};


const mutations = {
  SET_DEPARTMENT_DETAILS(state, data) {
    state.department_details = data
  },
  RESET(state) {
    state.department_details = []
  }
};


const actions = {



  GET_DEPARTMENTS({commit}) {
    let current_api = API_CONFIG.API_ENDPOINT + 'departments'


    return new Promise((resolve, reject) => {
      API_CONFIG.SITE_AXIOS
        .get(current_api, {}, {
          cache: true,
          retryTimes: 2
        })
        .then(response => {
          console.log(response);
          commit('SET_DEPARTMENT_DETAILS', response.data); // Set user is loggedin
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });
  },


};

const getters = {
  get_department_details(state) {
    return state.department_details
  },

};

export default {
  state,
  mutations,
  actions,
  getters
}
