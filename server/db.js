require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://Cluster63119:cUZ4b1tEZ31M@cluster63119.tvwb1rp.mongodb.net/LegacyProject?retryWrites=true&w=majority'
);

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

module.exports = mongoose;
