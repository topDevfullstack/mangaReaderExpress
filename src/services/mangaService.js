const dotenv = require('dotenv');
const axios = require('axios');
const dbService = require('./dbService');

class MangaService {
  async insertMangas(filter) {
    let res = [];

    const order = {
      rating: 'desc',
      followedCount: 'desc'
    };

    const finalOrderQuery = {};

    // { "order[rating]": "desc", "order[followedCount]": "desc" }
    for (const [key, value] of Object.entries(order)) {
      finalOrderQuery[`order[${key}]`] = value;
    };

    const filters = {
      publicationDemographic: ['seinen'],
      status: ['completed'],
      contentRating: ['suggestive'],
      ...filter
    };

    try {
      const resp = await axios({
        method: 'GET',
        url: `${process.env.MANGADEX_URI}/manga`,
        params: {
          ...filters,
          ...finalOrderQuery
        }
      });

      if (resp && resp.data.data) {
        const mangaPromises = resp.data.data.map(async (manga) => {
          const mangaData = {
            id: manga.id,
            type: manga.type,
            title: manga.attributes.title.en,
            createdAt: manga.attributes.createdAt,
            updatedAt: manga.attributes.updatedAt
          };

          try {
            const mangaRow = await dbService.getAllMangas({ id: mangaData.id });
            if (!mangaRow.length) {
              const flag = await dbService.insertMangaCollection(mangaData);
              if (flag) {
                res.push(mangaData);
              }
            }
          } catch (dbError) {
            console.error(`Database error for manga ID ${mangaData.id}:`, dbError);
          }
        });

        // Wait for all promises to complete
        await Promise.all(mangaPromises);
      }
    } catch (apiError) {
      console.error('API call failed:', apiError);
      // Optionally, handle the error (e.g., return an empty array or rethrow)
    }

    return res; // Now, this will only execute after all the manga processing is done
  }
}

module.exports = new MangaService();