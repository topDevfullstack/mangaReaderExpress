const Manga = require('../models/mangaModel');
const Chapter = require('../models/chapterModel');
const Down = require('../models/downModel');

class ReadDbService {
  async getFindDownsList(data) {
    const { limit, offset } = data;
    const downsCounts = await Down.countDocuments();
    const downs = await Down.find()
      .populate({ path: 'chapter', populate: { path: 'manga' } })
      .skip(offset)
      .limit(limit);
    return { downs: downs, downsCounts: downsCounts };
  }

  async insertMangaCollection(mangaData) {
    try {
      return await Manga.insertMany(mangaData); // Ensure Manga is correctly imported
    } catch (error) {
      console.error(`Database error for manga ID: ${mangaData.id}`, error);
      throw error; // Rethrow or handle the error as needed
    }
  }

  async getAllMangas(filter) {
    return Manga.find(filter);
  }

  async getMangaById(_id) {
    return Manga.findById(_id);
  }

  async updateManga(_id, mangaData) {
    return Manga.findByIdAndUpdate(_id, mangaData, { new: true });
  }

  async deleteManga(_id) {
    return Manga.findByIdAndDelete(_id);
  }

  async insertChapterCollection(data) {
    const chapter = new Chapter(data);
    return chapter.save();
  }

  async getAllChapters(filter) {
    return Chapter.find(filter);
  }

  async getChapterById(_id) {
    return Chapter.findById(_id);
  }

  async updateChapter(_id, chapterData) {
    return Chapter.findByIdAndUpdate(_id, chapterData, { new: true });
  }

  async deleteChapter(_id) {
    return Chapter.findByIdAndDelete(_id);
  }

  async insertDownCollection(data) {
    const down = new Down(data);
    return down.save();
  }

  async getAllDowns(filter) {
    return Down.find(filter);
  }

  async getDownById(_id) {
    return Down.findById(_id);
  }

  async updateDown(_id, chapterData) {
    return Chapter.findByIdAndUpdate(_id, chapterData, { new: true });
  }

  async deleteDown(_id) {
    return Chapter.findByIdAndDelete(_id);
  }
}

module.exports = new ReadDbService();