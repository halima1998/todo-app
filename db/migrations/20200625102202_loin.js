
exports.up = async (knex) => {
await knex.schema.createTable('login' , table =>{
    table.increments('id')
    table.string('email').notNullable()
    table.string('password').notNullable()
})
  
};

exports.down = async(knex)  => {
  await knex.schema.dropTable('login')
};
