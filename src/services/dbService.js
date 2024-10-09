const Manga = require('../models/mangaModel');
const Chapter = require('../models/chapterModel');
const Down = require('../models/downModel');

class ReadDbService {
  async getFindDownsList(data) {
    const downs = await Down.find(data).populate({ path: 'Chapter', populate: { path: 'Manga' } });
    return downs;
  }

  async insertMangaCollection(data) {
    const manga = new Manga(data);
    return manga.save();
  }

  async getAllMangas(filter) {
    return Manga.find(filter);
  }

  async getMangaById(mangaId) {
    return Manga.find({ id: mangaId });
  }

  async updateManga(mangaId, mangaData) {
    return Manga.findByIdAndUpdate(mangaId, mangaData, { new: true });
  }

  async deleteManga(mangaId) {
    return Manga.findByIdAndDelete(mangaId);
  }

  async insertChapterCollection(data) {
    const chapter = new Chapter(data);
    return chapter.save();
  }

  async getAllChapters(filter) {
    return Chapter.find(filter);
  }

  async getChapterById(chapterId) {
    return Chapter.find({ id: chapterId });
  }

  async updateChapter(chapterId, chapterData) {
    return Chapter.findByIdAndUpdate(chapterId, chapterData, { new: true });
  }

  async deleteChapter(chapterId) {
    return Chapter.findByIdAndDelete(chapterId);
  }

  async insertDownCollection(data) {
    const down = new Down(data);
    return down.save();
  }

  async getAllDowns(filter) {
    return Down.find(filter);
  }

  async getDownByChapterId(chapterId) {
    return Down.find({ chapterId: chapterId });
  }

  async updateDown(chapterId, chapterData) {
    return Chapter.findByIdAndUpdate(chapterId, chapterData, { new: true });
  }

  async deleteDown(chapterId) {
    return Chapter.findByIdAndDelete(chapterId);
  }
}

module.exports = new ReadDbService();