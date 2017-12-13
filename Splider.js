
const cheerio = require('cheerio');
const httpHelper = require('./httpHelper');

function getQBJok(htmlStr){
    let $ = cheerio.load(htmlStr);
    let jokList = $('#content-left').children('div');
    let rst = [];
    jokList.each((i, item)=>{
        let node = $(item);
        let titleNode = node.find('h2');
        let title = titleNode ? titleNode.text().trim() : '匿名用户';
        let content = node.find('.content span').text().trim();
        let likeNumber = node.find('i[class=number]').text().trim();
        rst.push({
            title : title,
            content : content,
            likeNumber : likeNumber
        });
    });
    return rst;
}


async function splider(index = 1){
    let url = `https://www.qiushibaike.com/8hr/page/${index}/`;
    let htmlStr = await httpHelper.getHtml(url);
    let rst = getQBJok(htmlStr);
    return rst;
}

// splider();

module.exports.splider = splider;