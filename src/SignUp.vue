<template>
    <div class="sign-up">
        <div class="title">Sign up</div>
        <div class="name-area">
            <div class="input-area">
                <b-form-group id="fieldset-1" label="Name" label-for="input-1" :invalid-feedback="invalidFeedback[0]" :valid-feedback="validFeedback[0]" :state="state[0]">
                    <b-form-input id="input-1" style="box-shadow:none" v-model="data[0]" :state="state[0]" trim></b-form-input>
                </b-form-group>
            </div>
            <div class="photo-area">
                <label class="upload">
                    <input class="changeHead" type="file" style="display:none" accept="image/gif,image/jpeg,image/jpg,image/png"/>
                    <div :style="image"></div>
                </label>
            </div>
        </div>
        <div class="other-area">
            <b-form-group id="fieldset-2" label="Email address" label-for="input-2" :invalid-feedback="invalidFeedback[1]" :valid-feedback="validFeedback[1]" :state="state[1]">
                <b-form-input id="input-2" style="box-shadow:none" v-model="data[1]" :state="state[1]" trim></b-form-input>
            </b-form-group>
            <b-form-group id="fieldset-3" label="Mobile number" label-for="input-3" :invalid-feedback="invalidFeedback[2]" :valid-feedback="validFeedback[2]" :state="state[2]">
                <b-form-input id="input-3" type="number" style="box-shadow:none" v-model="data[2]" :state="state[2]" trim></b-form-input>
            </b-form-group>
            <b-form-group id="fieldset-4" label="Password" label-for="input-4" :invalid-feedback="invalidFeedback[3]" :valid-feedback="validFeedback[3]" :state="state[3]">
                <b-form-input id="input-4" style="box-shadow:none" type="password" v-model="data[3]" :state="state[3]" trim></b-form-input>
            </b-form-group>
        </div>
        <div class="btn-area">
            <button class="reg">Register</button>
        </div>
    </div>
</template>

<script>
export default {
    props:[],
    name: 'SignUp',
    data(){
        return{
          data: ['','','',''],
          image: {backgroundImage: "url("+require('./assets/icon/photo.png')+")"}
        }
    },
    computed: {
        state() {
            return this.data.map(Element=>{
                return (Element.length >= 4||Element==='') ? true : false
            })
        },
        invalidFeedback() {
            return this.data.map(Element=>{
             if (Element.length > 4) {
                    return ''
                } 
                else if (Element.length > 0) {
                    return '請輸入至少4個字元'
                }
                else {
                    return 'Please enter something'
                }
            })
        },
        validFeedback() {
            return this.state.map(Element=>{
                return (Element === true ) ? 'Thank you' : ''
            })
        }
    },  
}
</script>
<style scope>
    .sign-up{
        flex-grow: 1;
        width: 100%;
        display: flex;
        flex-direction: column;     
    }
    .title{
        flex-grow: 1;
        width: 100%;
        color: white;
        font-size: 3vh;
    }
    .name-area{
        flex-grow: 1;
        display: flex;
        background-color: rgb(245,245,245);
        border-radius: 10px;
        padding: 1vh 5vh;
    }
    .input-area{
        flex-grow: 1;
    }
    .photo-area{
        flex-grow: 1;
    }
    .other-area{
        flex-grow: 1;
        padding: 1vh 6vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .other-area label{
        color: rgb(245,245,245);
        font-size: 3vh;
        font-weight: 300;
    }

    .photo-area,.upload,.input-area,.title,.btn-area{
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
    }
    .btn-area{
        flex-grow: 2;
        align-items: flex-start;
    }
    .photo-area{
        position: relative;
        justify-content: flex-end;
        width: 40%;
    }
    .upload{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(255,255,255);
        margin-bottom: 0;
        border-radius: 50%;
        width: 12vh;
        height: 12vh;
        -webkit-filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
        filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
    }
    .upload div{
        width: 40%;
        height: 40%;
        background-size: cover;
        background-position: center center;
    }
    .input-area{
        align-items: flex-end;
    }
    .input-area label{
        color: rgb(45,45,45);
        font-size: 3vh;
        font-weight: 800;
    }
    .input-area input, .other-area input{
        border-radius: 15px;
    }
    .input-area input{
        -webkit-filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
        filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3));
    }

    .other-area input,.other-area input:focus{
        background-color: rgb(73,73,73);
        color: white;
        border-color: transparent;
        border: none;
        height: 5vh;
    }

    .form-control.is-valid{
        background-image: none;
    }

    .form-control.is-valid,.form-control.is-valid:focus{
        border: none;
        border-color: transparent;
    }
    .valid-feedback{
        color: transparent;
    }

    .btn-area button{
        background-image: linear-gradient(270deg, rgb(155,51,84) 0%, rgb(58,44,105) 80%);
        font-size: 3vh;
        width: 42.5%;
        height: 60%;
        border-radius: 25px;
        font-weight: 600;
        border: none;
        color: white;
    }

</style>
