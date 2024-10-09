const dotenv = require('dotenv');
const axios = require('axios');
const dbService = require('./dbService');
class MangaService {
  async insertMangas(filter) {
    let res = [];
    const resp = await axios({
        method: 'GET',
        url: `${process.env.MANGADEX_URI}/manga`,
        params: filter
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

            const mangaRow = await dbService.getAllMangas({ id: mangaData.id });
            if (!mangaRow.length) {
                const flag = await dbService.insertMangaCollection(mangaData);
                if (flag) {
                    res.push(mangaData);
                }
            }
        });

        // Wait for all promises to complete
        await Promise.all(mangaPromises);
    }

    return res; // Now, this will only execute after all the manga processing is done
  }
}

module.exports = new MangaService();