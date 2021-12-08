const Story = require("../model/story")
class StoryService {
  async createStory({title, desc, filename}) {
    const res = await Story.create({title, desc, filename})
    return res.dataValues || null;
  }

  async updateStory(id, story) {
    const res = await Story.update(story, {
      where: id
    })
    return res[0] > 0 ? true : false;
  }

  async removeStory(id) {
    const res = await Story.destroy({where: id})
    return res[0] > 0 ? true : false;
  }
}

module.exports = new StoryService()