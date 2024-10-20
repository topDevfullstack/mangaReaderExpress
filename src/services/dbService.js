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

  async gettagList(data) {
    let limit = 12, offset = 0;
    switch (data) {
      case 'today': break;
      case 'week': limit = 60; offset = 0; break;
      case 'monthly': limit = 200; offset = 0; break;
      default: break;
    }
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

  async insertChapterCollection(chapterData) {
    try {
      return await Chapter.insertMany(chapterData); // Ensure Manga is correctly imported
    } catch (error) {
      console.error(`Database error for manga ID: ${chapterData.id}`, error);
      throw error; // Rethrow or handle the error as needed
    }
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

  async insertDownCollection(downData) {
    try {
      const down = new Down(downData);
      return await down.save();
    } catch (error) {
      console.error(`Database error for manga ID: ${downData.chapter}`, error);
      throw error; // Rethrow or handle the error as needed
    }
  }

  async getAllDowns(filter) {
    return Down.find(filter);
  }

  async getDownById(_id) {
    return Down.findById(_id);
  }

  async updateDown(_id, downData) {
    return Down.findByIdAndUpdate(_id, downData, { new: true });
  }

  async deleteDown(_id) {
    return Down.findByIdAndDelete(_id);
  }
}

module.exports = new ReadDbService();