// Important imports that always should be present
import {
  API_CONFIG
} from '@utils/server.js';


const state = {
  applicants: [],
  applicant : []
  


};


const mutations = {
  SET_APPLICANTS(state, data) {
    state.applicants = data
  },
  SET_APPLICANT(state, data) {
    state.applicant = data
  },

  RESET(state) {
    state.applicants = [],
    state.applicant = []
  }
};


const actions = {


  CREATE_APPLICANT({}, applicantDetails) {
    let data = { 
      ...applicantDetails
  }

    let current_api = API_CONFIG.API_ENDPOINT + 'applicants' 
    
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

  GET_APPLICANTS({commit}) {
    let current_api = API_CONFIG.API_ENDPOINT + 'applicants'


    return new Promise((resolve, reject) => {
      API_CONFIG.SITE_AXIOS
        .get(current_api, {}, {
          cache: true,
          retryTimes: 2
        })
        .then(response => {
          //console.log(response);
          commit('SET_APPLICANTS', response.data); 
          resolve(true);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  GET_APPLICANT({commit}, app_id) {
     if(app_id == '' || app_id == null){
       return
     }
     let current_api = API_CONFIG.API_ENDPOINT + 'applicants/'+ app_id
 
     return new Promise((resolve, reject) => {
       API_CONFIG.SITE_AXIOS
         .get(current_api, {}, {
           cache: true,
           retryTimes: 2
         })
         .then(response => {
           commit('SET_APPLICANT', response.data)
           resolve(true);
         })
         .catch(error => {
           reject(error);
         });
     });
   },


  DELETE_APPLICANT({}, id) {
  
    let current_api = API_CONFIG.API_ENDPOINT + 'applicants/'+ id

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
  get_applicants(state) {
    return state.applicants
  },
  get_applicant(state){
    return state.applicant
  }

};

export default {
  state,
  mutations,
  actions,
  getters
}
