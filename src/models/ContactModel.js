const mongoose = require('mongoose');
const validator = require('validator')

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: false, default: '' },
  email: { type: String, required: false, default: ''},
  tel: { type: String, required: false, default: '' },
  createDate: {type: Date, default: Date.now}
});

const ContactModel = mongoose.model('Contact', ContactSchema);

function Contact(body) {
    this.body = body;
    this.errors = [];
    this.contact = null;
}



Contact.prototype.register = async function () {
  this.valid();
  if(this.errors.length > 0) return;
  this.contact = await ContactModel.create(this.body)
}

Contact.prototype.valid = function () {
      this.cleanUp()
     // Validation

     //Validation Email

     if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-email invalido');
     if (!this.body.name) this.errors.push('Required Name')
     if (!this.body.email && !this.body.tel){
        this.errors.push('Required Email or Phone')
     } 
     
    }
  Contact.prototype.cleanUp = function(){
      for(const key in this.body) {
        if(typeof this.body[key] !== 'string'){
          this.body[key] = '';
        }
      }
      this.body = {
        name: this.body.name,
        lastName: this.body.lastName,
        email: this.body.email,
        tel: this.body.tel,
      };
    };

    Contact.prototype.edit = async function(id) {
        if(typeof id !== 'string') return
        this.valid();
        if(this.errors.length > 0) return;
       this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {new : true})
      }

// Metodos Estaticos
Contact.searchId = async function(id) {
  if (typeof id !== 'string') return ;
   const contact = await ContactModel.findById(id);
   return contact;
}

Contact.searchContacts = async function() {

   const contacts = await ContactModel.find()
   .sort({createIn: -1})
   return contacts;
}

Contact.delete = async function(id) {
   if(typeof id !== 'string') return
   const contact = await ContactModel.findOneAndDelete({_id: id})
   
   return contact;
}


module.exports = Contact;
