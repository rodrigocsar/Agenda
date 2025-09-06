import 'core-js/stable';
import 'regenerator-runtime/runtime';

import Login from './modules/login'
import Edit from './modules/formEdit';


const login = new Login('.form-login');
const register = new Login('form-register');
login.init();
register.init();

const edit = new Edit('.form-edit');
edit.init();
//import './assets/css/style.css';

console.log('Olá mundo 3');
