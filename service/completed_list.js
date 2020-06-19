var knex = require('../knex');

module.exports = {
    createCompleted_list: () => {
        return  knex.select().table('users')
    }
}