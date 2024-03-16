const axios = require('axios');

const searchMusic = async (req, res, next) => {
    try {
        const query = req.query.q;
        const querysearchEngine = req.query.searchEngine;
        const response = await axios.get(`https://musicapi.x007.workers.dev/search?q=${query}&searchEngine=${querysearchEngine}`);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
};

const fetchMusic = async (req, res, next) => {
    try {
        const id = req.query.id;
        const response = await axios.get(`https://musicapi.x007.workers.dev/fetch?id=${id}`);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    searchMusic,
    fetchMusic
};
