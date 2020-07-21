const  _ = require("underscore");

exports.up = async(knex) => {
   await knex.schema.alterTable('list', function(table) {
     table.boolean('isPending').after('users_id').nullable();
   });
   
   const promises = []
   const allTodo = await knex.select().table('list')
   
   _.each(allTodo, (todo) => {
     console.log(todo)
    const promise = knex.table('list').update({
      isPending: true
    }).where('id', todo.id)
    promises.push(promise)
   })
   
   return Promise.all(promises)
};

exports.down = async (knex) => {
  await knex.schema.alterTable('list', (table) => {
    table.dropColumn("isPending")
  });
};
