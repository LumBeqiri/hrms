// Important imports that always should be present
import {
  API_CONFIG
} from '@utils/server.js';
import router from '@router'
import Vue from 'vue'



const state = {
  hrms_users: [],
  hrms_user: []
};


const mutations = {
  SET_HRMS_USERS(state, data) {
    state.hrms_users = data
  },
  SET_HRMS_USER(state, data) {
    state.hrms_user = data
  },
  RESET(state) {
    state.hrms_users = []
  }
};


const actions = {



  GET_HRMS_USERS({commit}) {
    let current_api = API_CONFIG.API_ENDPOINT + 'users'


    return new Promise((resolve, reject) => {
      API_CONFIG.SITE_AXIOS
        .get(current_api, {}, {
          cache: true,
          retryTimes: 2
        })
        .then(response => {
          console.log(response);
          commit('SET_HRMS_USERS', response.data); // Set user is loggedin
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  //get single user from api
  GET_HRMS_USER({commit}, user_id) {

    let current_api = API_CONFIG.API_ENDPOINT + 'users/'+ user_id

    return new Promise((resolve, reject) => {
      API_CONFIG.SITE_AXIOS
        .get(current_api, user_id, {
          cache: true,
          retryTimes: 2
        })
        .then(response => {
         console.log(response)
          commit('SET_HRMS_USER', response.data)
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });
  },


};

const getters = {
  get_hrms_users(state) {
    return state.hrms_users
  },
  get_hrms_user(state){
    return state.hrms_user
  }

};

export default {
  state,
  mutations,
  actions,
  getters
}
