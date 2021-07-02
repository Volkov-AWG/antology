const DB = require('../classes/Db');
const Query = require('../classes/Query');
const axios = require ('axios');
const config = require('../config');

const fs = require('fs');
const db = new DB(config.db);
const query_u = new Query(config.tables.urllist);

class leninka {

    async getLeninka(branches) {
        let ins_url = "", host_url = 'https://cyberleninka.ru';

        for (var i = 0; i < branches.length; i++) {
            let urlList_buffer = "";

            const getUrlList = async () => {
                try {
                    return await axios.post(`https://cyberleninka.ru/api/search`, {
                        mode: "articles",
                        q: branches[i].keys,
                        size: 50,
                        from: 0
                    });
                } catch (error) {
                    console.error(error)
                }
            }
            const getList = async () => {
                let body = "";
                body = await getUrlList();
                for (var j = 0; j < body.data.articles.length; j++) {

                    var name = body.data.articles[j].name.replace(/<b>/gi, "").replace(/<\/b>/gi, "").replace(/'/gi, "''");
                    var ann = body.data.articles[j].annotation.replace(/<b>/gi, "").replace(/<\/b>/gi, "").replace(/'/gi, "''");
                    var link = body.data.articles[j].link;
                    var auth = body.data.articles[j].authors;
                    var jour = body.data.articles[j].journal.replace(/<b>/gi, "").replace(/<\/b>/gi, "").replace(/'/gi, "''");
                    var jour_l = body.data.articles[j].journal_link;

                    urlList_buffer = `('${branches[i].treeid}','${branches[i].id}','${name}','${ann}','${host_url}${link}','${auth}','${jour}','${host_url}${jour_l}')`;
                    ins_url += urlList_buffer + ",";
                }
            }
            await getList();
        }

        ins_url = ins_url.substring(0, ins_url.length - 1);
        const deleted = await db.selectQuery(query_u.DeleteUrl(branches[0].treeid));
        await db.insert(query_u.InsertUrl(ins_url));
    }

}
module.exports = leninka;