exports.up = async(knex) => {
    await knex.schema.createTable('trush' ,table => {
        table.increments('id')
        table.string('todo').notNullable()
        table.timestamp("created_at").defaultTo(knex.fn.now())
        table.integer('users_id').unsigned().notNullable()
        table.foreign('users_id').references('id').inTable('users')
    })
};

exports.down = async(knex) => {
  await knex.schema.dropTable('trush');
};
