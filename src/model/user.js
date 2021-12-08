const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/seq');

// 创建模型
const User = sequelize.define('User', {
  // id 会被sequelize自动创建
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false, // 是否唯一
    comment: '用户名 不唯一'
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '密码'
  },
})
// 强制同步数据库（创建数据表）
// User.sync({force: true})

// sequelize.define 会返回模型
console.log(User === sequelize.model.User);

module.exports = User