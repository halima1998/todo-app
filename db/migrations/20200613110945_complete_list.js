
exports.up = async(knex) => {
    await knex.schema.createTable('completed_list' ,table => {
        table.increments('id')
        table.string('todo').notNullable()
        table.string('description').notNullable()
        table.timestamp("created_at").defaultTo(knex.fn.now())
        table.integer('users_id').unsigned()
        table.foreign('users_id').references('id').inTable('users')
    })
};

exports.down = async(knex) => {
  await knex.schema.dropTable('completed_list');
};
