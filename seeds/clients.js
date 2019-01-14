exports.seed = async knex => {
  // Hashed "password"
  const password =
    '$2a$10$YMy.khzkJRVT.dUseCCyzuw/Al67ZinA2tm4XmekhcFlJYtHlYi5q';

  return knex('clients')
    .del()
    .then(() =>
      knex('clients').insert([
        {
          id: 1,
          login: 'foo',
          password,
        },
        {
          id: 2,
          login: 'bar',
          password,
        },
      ]),
    );
};
