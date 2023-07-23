module.exports = ({ env }) => ({
  host: env('HOST'),
  url: env('WEBSITE_URL'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS'),
  },
});
