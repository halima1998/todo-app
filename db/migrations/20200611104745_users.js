
exports.up = async (knex) => {
    await knex.schema.createTable('users', table => {
        table.increments('id')
        table.string('name').notNullable()
        table.string('last_name').notNullable()
        table.string('userName').notNullable(),
        table.string('email').notNullable().unique()
        table.string('password').notNullable()
    })
   
};

exports.down = async (knex) => {
    await knex.schema.dropTable('users');
};
