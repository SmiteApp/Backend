exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('users')
    .del()
    .then(function() {
      return knex('users').insert([
        { username: "alan", password: "testpassword" },
    
      ]);
    });
};