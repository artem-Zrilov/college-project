'use strict';
const express = require('express');
const mongoose = require('mongoose');
const expHbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const config = require('./config');
const appRoutes = require('./routes/app');
const apiRoutes = require('./routes/api');



const PORT = process.env.PORT || 8080;
const host = '127.0.0.1';

const app = express();
const hbs = expHbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    helpers: {
        section: function(name, options) {
            if (!this.sections) this.sections = {};
            this.sections[name] = options.fn(this);
            return null;
        }
    }
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(cookieParser());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(appRoutes);
app.use('/api', apiRoutes)

app.use(express.static(path.join(__dirname, 'public')))

async function start() {
    try {
        await mongoose.connect('mongodb+srv://root:q1w2e3Z@cluster0.cg6b2.mongodb.net/doctors', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })

        require('./middleware/passport')(passport);

        app.listen(PORT, host, () => {
            console.log(`running on http://${host}:${PORT}`);
        });
    } catch (e) {
        console.log(e);
    }
}

start();
