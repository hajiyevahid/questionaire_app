import store from '../store/index';

export default {
    name:"LogForm",
    components:{
          store,
    },
    data(){
        return {
            start: false,
            answeredCount: [],
            havEverStarted:false,
            currentCorrect: undefined,
            current: 0,
            questions:"",
            curQues:"",
            result: 0,
            loadState:false,
            randomized: undefined
        }
    },
    methods:{
        async handler(){
            this.result = 0
            this.loadState = true
            this.start = true
            store.dispatch('req')
            console.log("getting new collectiond")
            await new Promise(resolve => setTimeout(resolve, 1111));
            this.questions = store.getters.getQuestions.a
            this.loadState = false
        },
        checker(){
            return this.start
        },
        isEmpty(){
            if(Object.prototype.toString.call(this.questions) === "[object Promise]")
                return false
            return this.questions.length != 10 ? true: false
        },
        finish(){
            this.sleep(500)
            for(let i=0; i<this.getLength();i++){
                if(this.answeredCount[i]){
                    this.result = this.result + 1
                }
            }
            this.havEverStarted = true
            console.log(this.getResult())
            this.questions = ""
            this.start = false
            this.randomized = false
            this.curQues = ""
            this.current = 0
            this.currentCorrect = undefined
        },
        getOne(){
            return this.questions[this.current]
        },
        randomizer(){
                let dd = [this.getOne().correct_answer,
                          this.getOne().incorrect_answers[0],
                          this.getOne().incorrect_answers[1],
                          this.getOne().incorrect_answers[2],
                         ]
                let arr = [0,1,2,3]
                arr.sort(() => Math.random() - 0.5);
                this.randomized=true
                return {'ans':[dd[arr[0]],dd[arr[1]],dd[arr[2]],dd[arr[3]]],"q":[this.getOne().question]}
        },
        setRand(){
            console.log(this.randomized, "rand")
            if (!this.randomized){
                this.randomized = true
                this.curQues = this.randomizer() 
            }
        },
        setLoad(){
            this.loadState = false
        },
        addNext(){
            if(this.current<this.questions.length-1 && this.currentCorrect!=undefined){
                this.currentCorrect = undefined
                this.current = this.current + 1
                this.randomized = false
                this.setRand()
            }
            if(this.current>this.questions.length-2 && this.currentCorrect!=undefined ){
                console.log(this.answeredCount)
                this.curQues = ""
                this.finish()
            }
        },
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        appStarted(){
            return 
        },
        getCurrent(){
            return this.current + 1
        },
        escaper(str){
            var he = require('he');
            return he.decode(str)
        },
        async answered(event){
            let rr = (event.target.value == this.getOne().correct_answer)
            this.currentCorrect = rr
            this.answeredCount[this.current] = rr
            
        },
        getEl(){
            if(this.havEverStarted){
                return 'Play 1 more time'
            }
            return 'Start the quiz'
        },
        getQues(){
            return this.curQues
        },
        getDisability(){
            return this.currentCorrect
        },
        getLength(){
            return this.questions.length
        },
        getResult(){
            return this.havEverStarted ? this.result : undefined
        },
        loader(){
            return this.loadState
        },
        getIcon(){
            var images = require.context('../assets/', false, /\.png$/)
            return  images('./' + this.getGrade() + ".png")
        },
        getGrade(){
            return this.result>8? "1" : (this.result<5 ? "3" : "2")
            
        },
        getTxt(){
            let g = this.getGrade()
            return g==1 ? "gold" : (g==2 ? 'silver' : 'bronze')
        }
    }

}






