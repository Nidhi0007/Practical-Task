const fs = require("fs");

// create user function
module.exports.createUser = async (req, res) => {
  // reading from json file
  var data = fs.readFileSync("../server/models/user.json");
  const getUser = JSON.parse(data);
  const checkEmail = getUser.userData.some(
    (item) => item.email === req.body.email
  );
  if (checkEmail) {
    return res.status(400).json({ message: "Email Already exist" });
    // throw new Error();
  }
  // writing to json file
  req.body.id = new Date().valueOf();
  req.body.deleted = false;
  getUser.userData.push(req.body);
  var newData = JSON.stringify(getUser);
  fs.writeFile("../server/models/user.json", newData, (err) => {
    // error checking
    if (err) throw err;

    console.log("New data added");
  });
  res.json({
    data: req.body,
  });
};
// edit user function
module.exports.editUser = async (req, res) => {
  const id = req.params.id;
  var data = fs.readFileSync("../server/models/user.json");
  const getUser = JSON.parse(data);
  const checkEmail = getUser.userData.some(
    (item) => item.email === req.body.email
  );
  if (checkEmail && req.body.email) {
    return res.status(400).json({ message: "Email Already exist" });
    // throw new Error();
  }

  getUser.userData.map((user) => {
    if (user.id == id) {
      user.email = req.body.email ? req.body.email : user.email;
      user.name = req.body.name;
      user.phone = req.body.phone;
    }
  });

  var newData = JSON.stringify(getUser);

  fs.writeFile("../server/models/user.json", newData, (err) => {
    // error checking
    if (err) throw err;

    console.log("New data updated");
  });
  res.json({
    data: req.body,
  });
  // });
};
// restore user function
module.exports.restoreUser = async (req, res) => {
  const id = req.params.id;
  var data = fs.readFileSync("../server/models/user.json");
  const getUser = JSON.parse(data);

  getUser.userData.map((user) => {
    if (user.id == id) {
      user.deleted = false;
    }
  });

  var newData = JSON.stringify(getUser);

  fs.writeFile("../server/models/user.json", newData, (err) => {
    // error checking
    if (err) throw err;
  });
  res.json({
    message: "User Restored",
  });
  // });
};
// remove user function
module.exports.removeUser = async (req, res) => {
  const id = req.params.id;
  var data = fs.readFileSync("../server/models/user.json");
  const getUser = JSON.parse(data);

  getUser.userData.map((user) => {
    if (user.id == id) {
      user.deleted = true;
    }
  });

  var newData = JSON.stringify(getUser);

  fs.writeFile("../server/models/user.json", newData, (err) => {
    // error checking
    if (err) throw err;
  });
  res.json({
    message: `${id} User Deleted`,
  });
  // });
};
// get all user function
module.exports.getUser = async (req, res) => {
  // reading from json file
  var data = fs.readFileSync("../server/models/user.json");
  const getUser = JSON.parse(data);
  const deleted = req.query.deleted == "false" ? false : true;
  const filteredUsers = getUser.userData.filter((item) => {
    return item.deleted == deleted;
  });
  // writing to json file

  res.json({
    data: filteredUsers,
  });
};
