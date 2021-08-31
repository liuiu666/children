'use strict';
const mysql_import = require('mysql-import');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2');
const appName = require('../package.json').name;
const moment = require('moment');
class DatabaseInit {
  constructor() {
    // 从环境变理中读取mysql连接信息
    const { MYSQL_PORT, MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE } = process.env;
    this.connectConfig = {
      port: MYSQL_PORT || 3306,
      host: MYSQL_HOST || '8.136.234.245',
      user: MYSQL_USER || 'lsl',
      password: MYSQL_PASSWORD || 'sl123321',
      database: MYSQL_DATABASE || 'test',
    };
  }
  async init() {
    await this.initDatabase();
    await this.initRecordTable();
    await this.runSql();
  }
  // 初始化db，如果db不存在新创建db,如果db存在，则不做处理
  async initDatabase() {
    const { host, port, user, password, database } = this.connectConfig;
    const connection = mysql.createConnection({
      host,
      port,
      user,
      password,
    });
    const info = await connection.promise().query('show databases;');
    if (
      !info[0].some((row) => {
        return row.Database === database;
      })
    ) {
      // 如果数据库不存在，创建数据库
      await connection.promise().query(`create database ${database};`);
      console.log(`数据库${database}不存在，${database}数据库创建成功`);
    }
    connection.close();
  }
  // 初始化版本记录表
  async initRecordTable() {
    const { host, port, user, password, database } = this.connectConfig;
    const connection = mysql.createConnection({
      host,
      port,
      user,
      password,
    });
    await connection.promise().query(`
      CREATE TABLE IF NOT EXISTS \`${database}\`.\`db_init_version_record\` (
        \`id\` int(20) unsigned NOT NULL AUTO_INCREMENT,
        \`app_name\` varchar(50) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '应用名称',
        \`version\` varchar(225) CHARACTER SET utf8mb4 NOT NULL DEFAULT '' COMMENT '版本',
        \`created_at\` varchar(225) NOT NULL COMMENT '创建时间',
        \`updated_at\` varchar(225) NOT NULL COMMENT '修改时间',
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='db init版本记录表'
    `);
    connection.close();
  }
  // 获取已初始化版本
  async getVersion() {
    const { host, port, user, password, database } = this.connectConfig;
    const connection = mysql.createConnection({
      host,
      port,
      user,
      password,
    });
    try {
      const list = await connection.promise().query(`
        select version from \`${database}\`.\`db_init_version_record\` where app_name='${appName}';
      `);
      connection.close();
      return list[0].map((item) => {
        return item.version;
      });
    } catch (e) {
      console.error('获取已初始化版本失败:', e.message);
    }
    return [];
  }
  // 已初始化版本插入记录表
  async insertVersion(version) {
    const { host, port, user, password, database } = this.connectConfig;
    const connection = mysql.createConnection({
      host,
      port,
      user,
      password,
    });
    const currentTime = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
    try {
      await connection.promise().query(`
        insert into \`${database}\`.\`db_init_version_record\`(\`app_name\`,\`version\`,\`created_at\`,\`updated_at\`) values('${appName}','${version}','${currentTime}','${currentTime}')
      `);
      connection.close();
    } catch (e) {
      console.error('已初始化版本插入记录表失败:', e.message);
    }
  }
  // 遍历init下所所有的文件夹，按顺序由小到大版本执行，每个版本中的文件按ddl、ddl-alter、dml执行对应sql文件
  async runSql() {
    const importer = new mysql_import(this.connectConfig);
    const initDirPath = path.join(__dirname, './init');
    mysql_import.prototype.setEncoding('utf8');
    const versionList = await this.getVersion();
    // 支持多个产品初始化db,中间用,分隔

    const dirs = fs.readdirSync(initDirPath).filter((filename) => {
      return (
        !versionList.some((version) => {
          return version === filename;
        }) && fs.statSync(path.resolve(initDirPath, filename)).isDirectory()
      );
    });
    for (let i = 0; i < dirs.length; i++) {
      const subDir = path.resolve(initDirPath, dirs[i]);
      const sqls = ['ddl.sql', 'ddl-alter.sql', 'dml.sql'];
      const sqlfiles = sqls
        .map((filename) => {
          return path.resolve(subDir, filename);
        })
        .filter((filename) => {
          return fs.existsSync(filename);
        });
      if (sqlfiles.length) {
        try {
          await importer.import(sqlfiles);
          console.log(`执行sql文件:\n${sqlfiles.join('\n')}`);
          await this.insertVersion(dirs[i]);
          console.log(`插入版本:${dirs[i]}`);
        } catch (err) {
          throw err;
        }
      }
    }
  }
}
new DatabaseInit().init();
