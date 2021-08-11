const config = {
    db: {
      user: 'postgres',
      password: 'changeme',
      host: '10.7.0.2',
      port: '5432',
      database: 'postgres'
    },
    tables:{
        tree: 'anthologyTree',
        branch: 'branch',
        urllist: 'urlList'
    },
    waittime: 1000
};

module.exports = config;
