const db = require('./index');

// Do not use transactions with the pool.query method.

module.exports = {
  getTrip: async (tripId, userId) => {
    try {
      // specify user_table.id to remove ambiguity
      const query = `SELECT t.id, t.location, t.start_date, t.end_date, t.picture FROM trips_table t JOIN user_table u ON u.id = t.user_id where u.id='${userId}' and t.id='${tripId}'`;

      const response = await db.query(query);

      // console.log(response);
      if (response.rows.length <= 0) {
        return null;
      }

      return {
        id: response.rows[0].id,
        location: response.rows[0].location,
        dateStart: response.rows[0].start_date,
        dateEnd: response.rows[0].end_date,
        picture: response.rows[0].picture
      };
    } catch (err) {
      // console.log(err);
      throw err;
    }
  },

  getTrips: async (userId) => {
    try {

      const query = `SELECT t.id, t.location, t.start_date, t.end_date, t.picture FROM trips_table t JOIN user_table u ON u.id = t.user_id where u.id='${userId}'`;

      const response = await db.query(query);

      console.log(response);
      if (response.rows.length <= 0) {
        return [];
      }

      const trips = response.rows.map((trip) => {
        return {
          id: trip.id,
          location: trip.location,
          dateStart: trip.start_date,
          dateEnd: trip.end_date,
          picture: trip.picture
        };
      });

      return trips;
    } catch (err) {
      // console.log(err);
      throw err;
    }
  },

  createTrip: async (data, userId) => {
    try {

      const {
        location,
        dateStart,
        dateEnd,
        picture
      } = data;

      const query = `insert into trips_table(location, start_date, end_date, picture, user_id) values('${location}', '${dateStart}', '${dateEnd}', '${picture? picture: null}', ${userId}) RETURNING *`;

      const response = await db.query(query);

      if (response.rows.length <= 0) {
        return null;
      }

      return {
        id: response.rows[0].user_id,
        location: response.rows[0].location,
        dateStart: response.rows[0].start_date,
        dateEnd: response.rows[0].end_date,
        picture: response.rows[0].picture,
      };

    } catch (err) {
      throw (err);
    }
  },

  updateTrip: async (data, userId) => {
    try {

      const {
        tripId,
        location,
        dateStart,
        dateEnd,
        picture
      } = data;

      let query = `
      UPDATE trips_table SET location =
       '${location}', start_date = '${dateStart}', end_date = '${dateEnd}' `;

      if (picture) {
        query += `, picture = '${picture}' `;
      }

      query += `WHERE id = '${tripId}' and user_id = '${userId}' RETURNING *`;

      console.log(query);

      const response = await db.query(query);

      return {
        id: response.rows[0].id,
        location: response.rows[0].location,
        dateStart: response.rows[0].start_date,
        dateEnd: response.rows[0].end_date,
        picture: response.rows[0].picture
      };

    } catch (err) {
      throw (err);
    }
  },

  deleteTrip: async (tripId, userId) => {
    try {
      // specify user_table.id to remove ambiguity
      const query = `DELETE FROM trips_table where user_id='${userId}' and id='${tripId}'`;
      console.log(query)
      const response = await db.query(query);

      console.log(response);
      // if (response.rows.length <= 0) {
      //   return null;
      // }

      return 200;
    } catch (err) {
      // console.log(err);
      throw err;
    }
  },
};