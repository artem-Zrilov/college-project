module.exports = {
    jwt: {
        secret: process.env.JWT_SECRET || 'my secret test key',
        options: {
            expiresIn: 3600000000,
        },
        cookie: {
            expires: new Date( Date.now() + 3600000000),
        }
    }
};

