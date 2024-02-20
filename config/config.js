module.exports = {
    development: {
        username: 'min',
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.HOST,
        dialect: 'mysql',
        port: process.env.PORT,
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: process.env.PRODUCTNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        host: process.env.PRODUCTHOST,
        dialect: 'mysql',
        port: process.env.PORT,
    },
};
