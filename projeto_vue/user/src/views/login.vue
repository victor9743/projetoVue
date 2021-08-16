<template>
    
    <div>
        <h2>Login</h2>

        <hr>

        <div class="columns is-mobile is-centered">

            <div class="column is-half">

       
                <div v-if="erro != undefined">
                    <div class="notification is-danger">
                        <p>{{ erro }}</p>
                    </div>
                </div>

                <label for="">Email</label>
                <input type="email" placeholder="Email" class="input" v-model="email">

                <label for="">Senha</label>
                <input type="password" placeholder="Senha" class="input" v-model="password">
                <hr>

                <button class="button is-success" @click="login">Logar</button>
            </div>
        </div>

    </div>
    
</template>

<script>
import axios from 'axios';

export default {
    
    data(){

        return{
             password: "",
             email: "",
             erro: undefined
        }
    },
    methods:{

        login(){
            //  chamada da API com axios
            axios.post("http://localhost:8686/login",{  
                password: this.password,
                email: this.email
            }).then(res =>{
        
                //  pegar o token e armazena-lo no localstorage
                localStorage.setItem('token', res.data.token)

                this.$router.push({name: 'Home'});

            }).catch(err =>{
                
                //  retorno do erro
                var msgErro = err.response.data.err;

                this.erro = msgErro;

            })

        
        }

    }

    
}
</script>