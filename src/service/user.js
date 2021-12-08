const User = require("../model/user")
class UserService {
  async createUser(name, password) {
    // 插入数据到User表中
    const res = await User.create({name, password})
    console.log(res)

    return res;
  }

  async getUserInfo({id, name}) {
    let whereOpt = {}
    id && Object.assign(whereOpt, {id})
    name && Object.assign(whereOpt, {name})

    const res = await User.findOne({
      // attributes: ['id', 'name'],
      where: whereOpt
    })

    return res ? res.dataValues : null
  }

  async updateById({id, name, password}) {
    const whereOpt = {id};
    const newUser = {}

    id && Object.assign(newUser, {id})
    name && Object.assign(newUser, {name})
    password && Object.assign(newUser, {password})

    const res = await User.update(newUser, {where: whereOpt})
    return res[0] > 0 ? true : false;
  }
}

module.exports = new UserService()