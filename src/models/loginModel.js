const validator = require('validator')
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const { register } = require('../controllers/loginController');

const LoginSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const LoginModel = mongoose.model('Login', LoginSchema);

class Login {
  constructor(body){
      this.body = body;
      this.errors = [];
      this.user = null;

      
    }
//login
  async login(){
    this.valid();
    if (this.errors.length > 0) return;
    this.user = await LoginModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push('Usuario invalido');
      return;
    }

    if(bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push('Senha invalida');
      this.user = null;
      return;
    }
  }

  //  register
   async register(){
      this.valid();
      if (this.errors.length > 0) return;

       await this.userExists();
      if (this.errors.length > 0) return;
      const salt = bcryptjs.genSaltSync();
      this.body.password = bcryptjs.hashSync(this.body.password, salt);

      this.user = await LoginModel.create(this.body)

    }

  async userExists() {
      this.user = await LoginModel.findOne({ email: this.body.email });
      if (this.user) this.errors.push('Usuário já existe');
 }

    valid() {
      this.cleanUp()
     // Validation
     //Validation Email
     if(!validator.isEmail(this.body.email)) this.errors.push('E-email invalido')
     // Validation Passwoerd
    if (this.body.password.length < 3 || this.body.password.length > 8) {
      if (this.body.password.length < 3) {
        this.errors.push('Password must be more than 3 chatacters')
      } else if (this.body.password.length > 8) {
        this.errors.push('Máximo de 8 caracteres');

      }
    }

    }
    cleanUp( ){
      for(const key in this.body) {
        if(typeof this.body[key] !== 'string'){
          this.body = '';
        }
      }
      this.body = {
        email:  this.body.email,
        password:this.body.password
      };
    }
}

module.exports = Login;
