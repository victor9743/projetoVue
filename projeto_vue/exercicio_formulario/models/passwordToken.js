var knex = require("../database/connection");
var User = require("./User");

class PasswordToken{

    async create(email){
        var user = await User.findByEmail(email)
      

        if(user != undefined){

            try {
                var token = Date.now();
                await knex.insert(
                    {
                        user_id : user.id_user,
                        used: 0,
                        token: token // UUID
    
                    }
                ).table("passwordtokens")
                
                return {status: true, token : token}

            } catch (error) {
                console.log(error);
                return {status: false, err: "Erro !"}
                
            }

            


        }else{
            return {status: false, err: "O email passado não existe no banco de dados!"}
        }
    }

    async validate(tokenvalue){
    

        try {
            var result = await knex.select().where({token: tokenvalue}).table("passwordtokens")
            if(result.length > 0){

                var tk = result[0];

                if(tk.used){
                    return {status : false};
                }else{
                
                    return {status : true, token : tk};
                    
                }

            }else{
                return {status: false};
            }
        } catch (error) {
            console.log(error)
            return false;
            
        }
    }

    async setUsed(tokenvalue){
        console.log("user", tokenvalue)
        await knex.update({used: 1}).where({token: tokenvalue}).table("passwordtokens")

    }
}

module.exports = new PasswordToken;