const dotenv = require('dotenv');
const axios = require('axios');
const dbService = require('./dbService');
class ChapterService {
  async insertAllChapters(filter) {
    let res = [];

    try {
      const mangas = await dbService.getAllMangas(filter);

      if (mangas && mangas.length) {
        const chapterPromises = mangas.map(async (manga) => {
          try {
            const chapters = await this.insertChapters(manga._id, manga.id);
            res.push(...chapters); // Assuming insertChapters returns an array of chapters
          } catch (error) {
            console.error(`Error inserting chapters for manga ID ${manga.id}:`, error);
          }
        });

        // Wait for all insert operations to complete
        await Promise.all(chapterPromises);
      }
    } catch (error) {
      console.error('Error fetching mangas:', error);
    }

    return res; // Return the array of inserted chapters
  }

  async insertChapters(objId, mangaId) {
    let res = [];

    try {
      const resp = await axios({
        method: 'GET',
        url: `${process.env.MANGADEX_URI}/manga/${mangaId}/feed`
      });

      if (resp && resp.data.data) {
        const chapterPromises = resp.data.data.map(async (chapter) => {
          const chapterData = {
            id: chapter.id,
            type: chapter.type,
            title: chapter.attributes.title,
            mangaId: objId,
            createdAt: chapter.attributes.createdAt,
            updatedAt: chapter.attributes.updatedAt
          };

          try {
            const chapterRow = await dbService.getAllChapters({ id: chapterData.id });
            if (!chapterRow.length) {
              const flag = await dbService.insertChapterCollection(chapterData);
              if (flag) {
                res.push(chapterData);
              }
            }
          } catch (dbError) {
            console.error(`Database error for chapter ID ${chapterData.id}:`, dbError);
          }
        });

        // Wait for all promises to complete
        await Promise.all(chapterPromises);
      }
    } catch (apiError) {
      console.error('API call failed:', apiError);
      // Optionally return an empty array or some other fallback
    }

    return res; // This will be returned after all processing is completed
  }
}

module.exports = new ChapterService();