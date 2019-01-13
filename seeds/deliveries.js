exports.seed = async knex => {
  // Hashed "password" and "dhl"
  const password =
    '$2a$10$YMy.khzkJRVT.dUseCCyzuw/Al67ZinA2tm4XmekhcFlJYtHlYi5q';
  const dhl = '$2a$10$hoNDERAF4II9E1JATV7YSO3HFHbaVX5IYyyR69GZrYebsTOMjt.nS';

  return knex('deliveries')
    .del()
    .then(() =>
      knex('deliveries').insert([
        {
          id: 1,
          title: 'KazExpress',
          login: 'kazexp',
          password,
        },
        {
          id: 2,
          title: 'NovaPoshta',
          login: 'novaposhta',
          password,
        },
        {
          id: 3,
          title: 'DHL',
          login: 'dhl',
          password: dhl,
          refresh_token: 'x67YR3Mn6VeUnYrd',
        },
      ]),
    );
};
