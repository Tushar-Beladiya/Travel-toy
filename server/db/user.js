const db = require('./index');

// Do not use transactions with the pool.query method.

module.exports = {
  createUser: async (userData) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password
      } = userData;
      const query = `
          INSERT INTO user_table(firstname, lastname, user_email, user_password)
          VALUES('${firstName}', '${lastName}', '${email}', '${password}')
          `;
      console.log(query);

      const response = await db.query(query);
      return response.command;
    } catch (err) {
      throw (err);
    }
  },

  getUser: async (email) => {

    try {
      const query = `SELECT * FROM user_table WHERE user_email = '${email}'`;
      const response = await db.query(query);

      if (response.rows.length <= 0) {
        return null;
      }

      const {
        firstname,
        lastname,
        user_email,
        id,
        user_password
      } = response.rows[0];
      const userData = {
        id: id,
        firstName: firstname,
        lastName: lastname,
        email: user_email,
        password: user_password
      }
      return userData;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  deleteUser: async (email) => {
    const query = `DELETE FROM user_table WHERE user_email = '${email}'`
    db.query(query)
      .then(response => {
        return response;
      })
      .catch(err => {
        console.log(err)
        throw (err);
      });
  },

  updateUser: async (userData, id) => {
    const {
      firstname,
      lastname,
      email,
      password
    } = userData;

    const query = `
    UPDATE user_table SET firstname = '${firstname}', lastname = '${lastname}', user_email = '${email}', user_password = '${password}' WHERE id = '${id}'
    `;
    db.query(query)
      .then(response => {
        return response;
      })
      .catch(err => {
        console.log(err);
        throw (err);
      })
  }
};