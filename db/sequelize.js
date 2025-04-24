const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(
	process.env.MYSQL_DATABASE || 'db_name',  // ✅ Database name from env
	process.env.MYSQL_USERNAME || 'db_username',  // ✅ MySQL username from env
	process.env.MYSQL_ROOT_PASSWORD || 'db_password',  // ✅ MySQL password from env
	{
		dialect: 'mysql',
		host: process.env.MYSQL_HOST || 'db_hostendpoint',  // ✅ MySQL hostname
		port: process.env.MYSQL_LOCAL_PORT || 3306,  // ✅ MySQL port
		logging: console.log,
	}
);

sequelize
	.authenticate()
	.then(() => {
		console.log('✅ Database connection successful!');
	})
	.catch((err) => {
		console.error('❌ Database connection error:', err);
	});

module.exports = sequelize;
