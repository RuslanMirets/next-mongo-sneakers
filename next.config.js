module.exports = {
  reactStrictMode: false,
  devIndicators: {
    buildActivity: false,
  },
  env: {
    BASE_URL: 'http://localhost:3000',
    MONGODB_URL:
      'mongodb+srv://admin:admin123@cluster0.6xwsu.mongodb.net/next_sneakers?retryWrites=true&w=majority',
    ACCESS_TOKEN_SECRET: 'secret_key',
    REFRESH_TOKEN: 'refresh_key',
  },
};
