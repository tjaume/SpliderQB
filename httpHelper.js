/**/

//爬虫
const req = require('request');

function getHtml(url){
    return new Promise((resolve, reject) => {
        req.get({
            url : url,
            headers: {
                "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36",
                "Referer" : "https://www.qiushibaike.com/"
            },
            encoding : 'utf-8'
        }, (err, res, body)=>{
            if(err) reject(err);
            else resolve(body);
        })
    });
}

exports.getHtml = getHtml;