const db = require('./index');

// Do not use transactions with the pool.query method.

module.exports = {
  getProfile: async (userId) => {
    try {
      // specify user_table.id to remove ambiguity
      const query = `SELECT * FROM user_table JOIN profile_table ON user_table.id = profile_table.id where user_table.id='${userId}'`;
      const response = await db.query(query);

      console.log(response);
      if (response.rows.length <= 0) {
        return null;
      }
      const {
        id,
        firstname,
        lastname,
        user_email,
        traveler_type,
        home_city,
        profile_picture,
        background_picture
      } = response.rows[0];

      const profileData = {
        id: id,
        firstName: firstname,
        lastName: lastname,
        email: user_email,
        travelerType: traveler_type,
        homeCity: home_city,
        profilePicture: profile_picture,
        backgroundPicture: background_picture
      }

      return profileData;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  addProfile: async (profileData, userId) => {
    try {

      const {
        homeCity,
        travelerType
      } = profileData;

      const query = `insert into profile_table(id, home_city, traveler_type) values('${userId}', '${homeCity}', '${travelerType}')`;

      const response = await db.query(query);
      return response;

    } catch (err) {
      throw (err);
    }
  },

  updateProfile: async (profileData, id) => {
    try {

      const {
        firstName,
        lastName,
        homeCity,
        travelerType,
        profilePicture,
        backgroundPicture
      } = profileData;


      let query_profile = `update profile_table set `;

      if (homeCity)
        query_profile += `home_city = '${homeCity}',`;

      if (travelerType)
        query_profile += `traveler_type = '${travelerType}',`;

      if (profilePicture)
        query_profile += `profile_picture = '${profilePicture}',`;

      if (backgroundPicture)
        query_profile += `background_picture = '${backgroundPicture}',`;

      // remove last ',' from the query_profile
      query_profile = query_profile.substring(0, query_profile.length - 1);

      query_profile += ` WHERE id='${id}'`;

      console.log(query_profile);

      let response1;
      try {
        if (firstName || lastName) {
          let query_user = `update user_table set `;

          if (firstName)
            query_user += `firstname = '${firstName}',`;

          if (lastName)
            query_user += `lastname = '${lastName}',`;

          // remove last ',' from the query_user
          query_user = query_user.substring(0, query_user.length - 1);

          query_user += ` WHERE id='${id}'`;
          console.log(query_user);

          response1 = await db.query(query_user);
        }
      } catch (err) {
        console.log(err);
        response1 = false;
      }

      let response2;
      try {
        response2 = await db.query(query_profile);
      } catch (err) {
        console.log(err);
        response2 = false;
      }

      const response = [{
        error: response1 ? false : true,
        errorMsg: response1 ? "" : "Unable to update firstName or lastName"
      }, {
        error: response2 ? false : true,
        errorMsg: response2 ? "" : "Unable to update profile_table"
      }];

      return response;

    } catch (err) {
      throw (err);
    }
  }
};