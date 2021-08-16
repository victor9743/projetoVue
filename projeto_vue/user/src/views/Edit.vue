<template>
    
    <div>
        <h2>Edição de Usuários</h2>

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


                <button class="button is-success" @click="update">Editar</button>
            </div>
        </div>

    </div>
    
</template>
<script>
import axios from 'axios';

export default {
    created(){
            var req ={
                headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }

        // pegando o parametro da url 
        axios.get("http://localhost:8686/user/" + this.$route.params.id, req).then(res=>{
            
       
            if(res.data != undefined){
                this.id = res.data.id_user;
                this.name = res.data.name;
                this.email = res.data.email;
                this.$router.push({name: 'users'})
                
                
            }
           
            
        }).catch(err=>{
            console.log(err.response);
            this.$router.push({name: 'users'})
        });

    },

    data(){

        return{
             name: "",
             email: "",
             id: -1,
             erro: undefined
        }
    },
    methods:{

         update(){
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