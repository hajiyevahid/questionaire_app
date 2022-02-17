<template>
    <div class="container">
        <div class="center">
          <img v-if="getResult()!=undefined && !checker() && isEmpty()" :src="getIcon()">
            <p v-if="isEmpty()!=true">{{getCurrent()}}/{{getLength()}}</p>              
              <div class="result" v-if="getResult()!=undefined && !checker() && isEmpty()">              
                <h3>Correct answers: {{getResult()}}/10</h3>
                <h3>You won the {{getTxt()}} prize!</h3>
              </div>
              <div class="intro" v-if="checker()!=true">
                <h3 v-if="getResult()==undefined" class="msg">Answer the questions and win the prize!</h3>
                <button class="button1" @click="handler" > {{getEl()}} </button>
              </div>
              <div v-if="loader()" class="loader"></div>
              <div v-if="isEmpty()!=true">
                <div class="question"><b></b>{{setRand()}}{{escaper(getQues().q[0])}}</div>
                <div v-for="item in getQues().ans" :key="item" id="options"> 
                  <label class="options">{{escaper(item)}}
                    <input type="radio" name="radio" :value="item"
                           @change="answered($event)">
                    <span class="checkmark"></span>
                  </label> 
                </div>
                <div> 
                      <button @click="addNext" class="button1 btn-custom">Next</button>
                </div>
              </div>
        </div>
        <div class="copyright">
          <p>&copy; Develepod by Vahid Hajiyev</p>
        </div>
    </div>
</template>

<script src="../store/handler.js">
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box
}
body {
  background-color: #333
}
.container {
  margin: auto;
  margin-top: 25vh;
  background-color: #ff898e;
  color: black;
  border-radius: 10px;
  padding: 20px;
  font-family: 'Montserrat', sans-serif;
  max-width: 700px;
  min-height: 50vh;
  font-weight: bold;
  position: relative;
}
.container>p {
    font-size: 32px
}
.result{
  padding-top: 8vh;
  height: 26vh;
}
h3, .copyright{
    text-shadow: 3px 5px rgb(0 0 0 / 8%)
}
img{
  width:10%;
}
h3.msg{
  margin-top: 2vh;
  height: 32vh;
  padding-top: 11vh;
}
.loader {
  border: 16px solid lightslategray; 
  border-top: 16px solid green;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: spin 2s linear infinite;
  margin: auto;
  margin-top:18vh;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.button1 {
  background-color: #4CAF50;
  border: none;
  color: #FFFFFF;
  padding: 15px 32px;
  text-align: center;
  -webkit-transition-duration: 0.4s;
  border-radius: 6px;
  transition-duration: 0.4s;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
}
.button1:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}
.btn-custom{
  margin-top: 5vh !important;
}
.btn-success {
    padding: 5px 25px;
    background-color: #21bf73
}
.checkmark {
    position: absolute;
    top: -1px;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #555;
    border: 1px solid #ddd;
    border-radius: 50%
}
.copyright{
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 10px;
  bottom: 6px;
  right: 10px;
}
.question {
  margin-top: 3vh;
  height: 6vh;
}

.options {
    position: relative;
    padding-left: 40px;
}
#options{
  padding-left: 6px;
}
#options label {
    padding-left: 40px;
    display: flex;
    margin-bottom: 15px;
    font-size: 14px;
    cursor: pointer;
    padding-top: 2px;
}

.options input {
    opacity: 0
}

.options input:checked~.checkmark:after {
    display: block
}

.options .checkmark:after {
    /* content: ""; */
    width: 10px;
    height: 10px;
    display: block;
    background: white;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: 300ms ease-in-out 0s
}

.options input[type="radio"]:checked~.checkmark {
    background: rgb(53 183 63);
    transition: 300ms ease-in-out 0s
}

.options input[type="radio"]:checked~.checkmark:after {
    transform: translate(-50%, -50%) scale(1)
}

</style>