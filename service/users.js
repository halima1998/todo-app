var knex = require('../knex');
const bcrypt = require('bcrypt');
// module.exports = {
//     createUser:(details) => {
//     return knex("users").insert(details);
// },
// getUsers: () =>{
//     return knex("users")
// }
   const createUser = async (user) => {
    const {name,last_name,userName,email, password} = user;
    return  knex('users')
        .insert({
            name,
            last_name,
            userName,
            email,
            password: await hashPassword(password)
        })
        .then((res) => res)
        .catch((err) => { 
            console.log(err);
             return err });
}
const hashPassword = async (textPassword) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return  bcrypt.hash(textPassword, salt);
}
// }
module.exports = { createUser }