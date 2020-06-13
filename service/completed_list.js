var knex = require('../knex');

module.exports = {
    createCompleted_list: (details) => {
        return knex('completed_list').insert(details);
    }
}