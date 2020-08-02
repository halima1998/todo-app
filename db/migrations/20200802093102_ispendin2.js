const  _ = require("underscore");

exports.up = async(knex) => {
   await knex.schema.alterTable('trush', function(table) {
     table.boolean('isPending').after('users_id').nullable();
   });
   
   const promises = []
   const allTodo = await knex.select().table('trush')
   
   _.each(allTodo, (todo) => {
     console.log(todo)
    const promise = knex.table('trush').update({
      isPending: true
    }).where('id', todo.id)
    promises.push(promise)
   })
   
   return Promise.all(promises)
};

exports.down = async (knex) => {
  await knex.schema.alterTable('trush', (table) => {
    table.dropColumn("isPending")
  });
};
