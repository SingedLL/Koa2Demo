const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db/seq');

// 创建模型
const Story = sequelize.define('Story', {
  // id 会被sequelize自动创建
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false, // 是否唯一
    comment: '故事的title'
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '描述'
  },
  filename: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '文件名'
  },
  // status: {}
})
// 强制同步数据库（创建数据表）
// Story.sync({force: true})

// sequelize.define 会返回模型
console.log(Story === sequelize.model.Story);

module.exports = Story