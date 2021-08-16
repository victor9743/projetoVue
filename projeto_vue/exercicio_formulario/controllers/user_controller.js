var User = require("../models/User");
var passwordToken = require("../models/passwordToken");
var bcrypt = require("bcrypt");

var jwt = require ("jsonwebtoken");

var secret ="dfosgndfçsnnfsudgibfgsbgçfd";

class userController{

    async index(req, res){

         var users = await User.findALL();

         res.json(users);

    }

    async create(req, res){
        
        var {email, name, password} = req.body;
        
        console.log(req.body);

        if(email == undefined || email == '' || email == ' '){
            res.status(400);
            res.json({err: "email inválido"})
            return;
        }

        var emailExists = await User.findEmail(email);

        if(emailExists){

            res.status(406);
            res.json({err: "O email já está cadastrado !!!"})

            return;

        }

        await User.criarUsuario(email, password, name);
        
        res.status(200);
        res.send("Pegando o corpo da requisição");
    }

    async buscaUser(req, res){

        var id = req.params.id;
        var usuario = await User.findById(id);

        if(id == undefined){

            res.status(404);
          

        }else{
            res.json(usuario);
        }
        
    }

    async editUser(req, res){

       var {id, name, role, email}= req.body;

       var result = await User.Edit(id, email, name, role);

       if(result != undefined){
           if(result.status){

               res.send("ok");
           }else{
               res.status(406);
               res.json(result);
           }
       }else{

        res.status(406);
        res.send("erro");
       }

    }

    async remove(req, res){
        var id= req.params.id

        var result = await User.delete(id);


        if(result != undefined || result != ""){
            
            res.status(200);
            res.send('ok');
     
        }else{
            res.status(406);
            res.send("erro")    
        };

    }

    async recoverPassword(req, res){
        var email = req.body.email;

        var result = await passwordToken.create(email);

        if(result.status){
            res.status(200);
            res.send("" + result.token);

        }else{
            res.status(406);
            res.send("erro");
        }

    }
    
    async changepassword(req, res){

        var token = req.body.token;
      
        var password = req.body.password;
        
        // verifica se o token está valido
        var isTokenInvalid = await passwordToken.validate(token);

    
    
        if(isTokenInvalid.status){

            try {
                await User.changepass(password, isTokenInvalid.token.user_id, isTokenInvalid.token.token);
                res.status(200)
                res.send("senha alterada");
                
            } catch (error) {
                
            }
           

        }else{
            res.status(406);
            res.send("Token Inválido");
        }
        
    }

    async login(req, res){

        var {email, password} = req.body;

        var user = await User.findByEmail(email);

        if(user != undefined){

            var result = await bcrypt.compare(password, user.senha);

            if (result) {

                // gerar token de acesso

                var token = jwt.sign({email: user.email, role: user.role}, secret);

                res.status(200);
                res.json({token: token});

                
            } else {
                res.status(406);
                res.json({err: "Senha Incorreta"});
                
            }

        }else{
            res.status(406);
            res.json({ status: false, err: "O usuario não existe"})
        }

    }


}

module.exports = new userController();