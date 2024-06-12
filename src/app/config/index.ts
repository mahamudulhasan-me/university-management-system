import dotenv from "dotenv";

dotenv.config();

export default {
  port: process.env.PORT || 1440,
  mongodb_url: process.env.MONGODB_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  default_password: process.env.DEFAULT_PASSWORD,
  node_env: process.env.NODE_ENV,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_expiration_time: process.env.JWT_EXPIRATION_TIME,
};
