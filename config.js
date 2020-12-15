module.exports = {
    jwt: {
        secret: process.env.JWT_SECRET || 'test',
        options: {
            expiresIn: 360000,
        },
        cookie: {
            expires: new Date( Date.now() + 360000),
        }
    }
};

