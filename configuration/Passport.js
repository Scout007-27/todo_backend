import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import db from "./Database.js";

const { models } = db;
const { User } = models;

/**
 * Passport Local Strategy for authenticating users using email and password.
 * This strategy is used for handling login attempts.
 * @memberof module:config
 * @author Kousheek Mahendaran
 */
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", // Field name for the email
      passwordField: "password", // Field name for the password
    },
    async (email, password, done) => {
      try {
        // Find the user by email
        const user = await User.findOne({ where: { Email: email } });
        if (!user) {
          return done(null, false, { message: "Incorrect email." });
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        // Authentication successful, return the user
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

/**
 * Serialize the user ID to store in the session.
 * @param {Object} user - The authenticated user object.
 * @param {Function} done - The callback to execute with the serialized user ID.
 * @memberof module:config
 * @author Kousheek Mahendaran
 */
passport.serializeUser((user, done) => {
  done(null, user.UserID);
});

/**
 * Deserialize the user ID stored in the session to retrieve the user object.
 * @param {number} id - The user ID stored in the session.
 * @param {Function} done - The callback to execute with the deserialized user object.
 * @memberof module:config
 * @author Kousheek Mahendaran
 */
passport.deserializeUser(async (id, done) => {
  try {
    // Find the user by primary key (ID)
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

export default passport;
