var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const passwordtoken = require("./passwordToken");

class User{

    async findALL(){

        try {
            
            var result = await knex.select(["id_user", "nome", "email","role"]).table("users");

            return result;

        } catch (error) {
            
            console.log(error);

            return [];
        }
        
    }
    async findById(id){


        try {
            
            var result = await knex.select(["id_user", "nome", "email","role"]).where({ id_user: id }).table("users");

            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }

        } catch (error) {
            
            console.log(error);

            return undefined;
        }

    }

    async criarUsuario(email, password, nome){

        try {

            var hash = await bcrypt.hash(password, 10);
            await knex.insert({email, senha: hash, nome, role: 0}).table("users");

        } catch (error) {
            console.log(error);
        }
        

    }

    async findEmail(email){
        
        try {

            var result = await knex.select("*").from("users").where({email: email})
            
            if(result.length >0){
                return true;

            }else{
                return false;
            }

        } catch (error) {
            
            console.log(error);

            return false;
        }
        
    }

    async Edit(id, email,name, role){
        try {
            
            var user = await this.findById(id);

            if(user != undefined){

                var editUser ={};

                if(email != undefined){

                    if(email != user.email){

                        var result = await this.findEmail(email);

                        if(result == false){
                            editUser.email = email;

                        }else{

                            return{status: false, err: "O usuário não existe!"}
                        }

                    }

                }
                if(name != undefined){

                    editUser.nome = name

                }

                if(role != undefined){
                    editUser.role = role
                }

                try {
                    await knex.update(editUser).where({id_user : id}).table("users");

                    return {status: true}
                    
                } catch (error) {

                    return {status: false, err: error}
                    
                }
                

            }else{
                return{status: false, err: "O usuário não existe!"}
            }

        } catch (error) {
            
            console.log(error);
    
        }

    }

    async delete(id){

         var usuario = await this.findById(id);

         if(usuario != undefined){

            try {

                await knex.delete().where({id_user: id}).table("users");
                return {status: true}

            } catch (error) {
                
                return {status: false, err: "usuario não existe"}
            }

         }else{
             return {status: false, err: "usuario não existe"}
         }
        
    }
    async findByEmail(email){

        try {
            
            var result = await knex.select(["id_user", "email", "nome", "senha","role"]).where({ email: email }).table("users");


            if(result.length > 0){
                return result[0];
            }else{
                return undefined;
            }

        } catch (error) {
            
            console.log(error);

            return undefined;
        }

    }

    async changepass(newpassword, id, token){
        var hash = await bcrypt.hash(newpassword, 10);

        await knex.update({senha : hash}).where({id_user: id}).table("users");

        await passwordtoken.setUsed(token);
    

            
           

    }

  

}

module.exports = new User();