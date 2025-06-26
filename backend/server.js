const express = require('express');
const mongoose = require('mongoose');
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');
const User = require('./models/User'); 
const authRoutes = require('./routes/auth');
const songRoutes = require('./routes/song');
const playlistRoutes = require('./routes/playlist');
require('dotenv').config();
const cors = require('cors');
const app = express();
const port = 8080;

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());
// connect mongodb to our node app.
const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const cluster = process.env.MONGO_CLUSTER;

const uri = `mongodb+srv://${username}:${password}@${cluster}/spotify-clone?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("MongoDB Connected Successfully!");
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

// setup passport-jwt code
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'thisKeyIsSecret';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  User.findOne({_id: jwt_payload.identifier}, function(err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  });
}));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Use the auth routes
app.use('/auth', authRoutes);
app.use('/song', songRoutes);
app.use('/playlist', playlistRoutes);

app.listen(port, () => {
  console.log(`Our app listening on port ${port}`)
})
