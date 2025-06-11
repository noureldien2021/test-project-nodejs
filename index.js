
const http = require('http');
const mongoose = require('mongoose');
const User = require('./models/User');
const qs = require('querystring');

//connect to MongoDB

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017/mydatabase';

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});




//create server
http.createServer(async (req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk.toString());
    req.on('end', async () => {
      const data = qs.parse(body);
      const newUser = new User({ name: data.name, email: data.email });
      await newUser.save();
      res.writeHead(302, { Location: '/' });
      res.end();
    });
  } else {
    // form users
    const users = await User.find();
    let html = `
      <h1>Add User</h1>
      <form method="POST">
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <button type="submit">Add</button>
      </form>
      <h2>All Users</h2>
      <ul>
    `;
    // list users
    users.forEach(user => {
      html += `<li>${user.name} - ${user.email}</li>`;
    });
    html += '</ul>';
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  }
}).listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
