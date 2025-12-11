import mongoose  from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";

const UserSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true}
});

const UserModel = mongoose.model("users", UserSchema);

class Users{
    constructor(body){
        this.body = body
        this.errors = []
        this.user = null
    }

    async login(){
        this.validate()
        if(this.errors.length > 0) return;
        this.user = await UserModel.findOne({email: this.body.email});
        if(!this.user){
            this.errors.push("Usuário não existe");
            this.user = null;
            return;
        }

        if(!bcryptjs.compareSync(this.body.password != this.user.password)){
            this.errors.push("Senha inválida");
            return;
        }
    }

    validate(){
        this.cleanUp()

        if(!validator.isEmail(this.body.email)) this.errors.push("E-mail inválido");
        if(this.body.password.length > 6 || this.body.password.length < 6) {
            this.errors.push("A senha precisa ter 6 caracteres")
        }
    }

    cleanUp(){
        for(let key in this.body){
            if(typeof key != "string") this.body[key] = "";
        }

        this.body = {
            name: this.body.name,
            email: this.body.email,
            password: this.body.password
        };
    }

    async userExist(){
        this.user = await UserModel.findOne({email: this.body.email});
        if(this.user) this.errors.push("Usuário já está cadastrado no sistema");
    }
}

module.exports = Users


