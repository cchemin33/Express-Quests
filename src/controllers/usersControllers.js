const database = require('../../database');

const deleteUsers = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("delete from users where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const updateUsers = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, email, city } = req.body;
  database
    .query(
      "UPDATE users SET firstname = ?, lastname = ?, email = ?, city = ? WHERE id = ?",
      [firstname, lastname, email, city, id]
    )
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
});
};

const postUsers = (req, res) => {
  const { firstname, lastname, email, city } = req.body;
  database
    .query(
      "INSERT INTO users(firstname, lastname, email, city) VALUES (?, ?, ?, ?)",
      [firstname, lastname, email, city]
    )
    .then(([result]) => {
      res.status(201).send({id: result.insertId});
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUsers = (req, res) => {
  let sql = "select * from users";
  const sqlValues = [];

  if (req.query.language != null) {
    sql += " where language = ?";
    sqlValues.push(req.query.language);
  }

  if (req.query.city != null) {
    if (sql.indexOf("where") === -1) {
      sql += " where city = ?";
    } else {
      sql += " and city = ?";
    }
    sqlValues.push(req.query.city);
  }

  database
    .query(sql, sqlValues)
    .then(([users]) => {
      if (users.length === 0) {
        res.sendStatus(204);
      } else {
        res.status(200).json(users);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUsersById = (req, res) => {
  const id = parseInt(req.params.id);

  database
    .query("select * from users where id = ?", [id])
    .then(([users]) => {
      if (users[0] != null) {
        res.status(200).json(users[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getUsers,
  getUsersById,
  postUsers,
  updateUsers,
  deleteUsers,
};