<template>
    
    <div>
        <h2>Registro de usuário!</h2>

        <hr>

        <div class="columns is-mobile is-centered">

            <div class="column is-half">

       
                <div v-if="erro != undefined">
                    <div class="notification is-danger">
                        <p>{{ erro }}</p>
                    </div>
                </div>

                <label for="">Nome</label>
                <input type="text" placeholder="Nome do Usuário" class="input" v-model="name">

                <label for="">Email</label>
                <input type="email" placeholder="Email" class="input" v-model="email">

                <label for="">Senha</label>
                <input type="password" placeholder="Senha" class="input" v-model="password">
                <hr>

                <button class="button is-success" @click="register">Cadastrar</button>
            </div>
        </div>

    </div>
    
</template>
<script>
import axios from 'axios';

export default {
    
    data(){

        return{
             name: "",
             password: "",
             email: "",
             erro: undefined
        }
    },
    methods:{

         register(){
            //  chamada da API com axios
            axios.post("http://localhost:8686/user",{
                name: this.name,
                password: this.password,
                email: this.email
            }).then(res =>{
                
                console.log(res);

                // redireciona o usuario para outra rota
                this.$router.push({name: 'Home'})
            }).catch(err =>{
                
                //  retorno do erro
                var msgErro = err.response.data.err;

                this.erro = msgErro;

            })

        
        }

    }

    
}
</script>
<style scoped>

</style>