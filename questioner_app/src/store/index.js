import { createStore } from 'vuex'
import axios from 'axios';

export default createStore({
    name:'store',
    state:{
        questions: {},
    },
    mutations:{
        setQuestions(state,a){
            state.questions = a
        }
    },
    actions:{
        async seed({commit}){
            const {data} = await axios.get('https://opentdb.com/api.php?amount=10&category=10&difficulty=easy&type=multiple')
            if(data){
                commit('setQuestions',{'a':data.results})
                }
            },
        req({dispatch}){
                dispatch('seed');
                },
    },
    getters:{
        getQuestions(state){
            return state.questions
        },        
    },
    modules:{

    }
})
