<template>
    
    <div>
        <h1>Painel ADM</h1>

                <table class="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Cargo</th>
                        <th>Ações</th>

                    </tr>

                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user.id">
                        <td>{{ user.nome }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ processRole( user.role) }}</td>
                        <td>
                            <button class="button is-success">Editar</button> 
                            <button class="button is-danger" @click="mostrarModal(user.id_user)">Remover</button>
                        </td>

                    </tr>
                </tbody>

            </table>

            <div :class="{modal: true, 'is-active': showModal}">
                <div class="modal-background"></div>
                <div class="modal-content">
                    <div class="card">
                        <header class="card-header">
                            <p class="card-header-title"> 
                                Você quer realmente deletar este usuário?
                            </p>
                        </header>
                        <div class="card-content">
                                dfsgdfsgsfd
                        </div>
                        <footer class="card-footer">
                            <button class="card-footer-item button" @click="hideModal()">Cancelar</button>
                            <button class="card-footer-item button" @click="deleteUser()">Sim, quero deletar</button>

                        </footer>

                    </div>

                </div>
                <button class="modal-close is-large" @click="hideModal()" aria-label="close"></button>

            </div>
    </div>

</template>
<script>
import axios from 'axios';
export default {
    // componente é carregado assim que a página é carregada
    created(){

        
        var req ={
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        axios.get("http://localhost:8686/user",req ).then(res=>{
           
            this.users = res.data;

        }).catch(err=>{
            console.log(err);
        })
    },
    data(){

        return{
            users: [],
            showModal: false,
            deleteUserId: -1
        }

    },
    methods:{

        processRole(value){

            if(value == 0){

                return "Usuário Comum"

            }else if(value == 1){
                
                return "Admin"

            }

        },
        hideModal(){
            this.showModal = false;
        },
        mostrarModal(id){
    

            this.deleteUserId = id
            
            this.showModal = true;
        },
        deleteUser(){

            var req ={
                headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            }

            axios.delete("http://localhost:8686/user/"+ this.deleteUserId, req).then(res=>{

                console.log(res);
                this.showModal = false;

                this.users = this.users.filter(u => u.id_user != this.deleteUserId)
                
            }).catch(err =>{
                console.log(err);
                this.showModal = false;
            })
        }

    }
    
}
</script>

<style>

</style>