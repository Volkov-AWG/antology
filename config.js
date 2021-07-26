const config = {
    db: {
      user: 'postgres',
      password: 'changeme',
      host: '10.5.0.2',
      port: '5432',
      database: 'postgres'
    },
    tables:{
        tree: 'anthologyTree',
        branch: 'branch',
        urllist: 'urlList'
    }
};

module.exports = config;
