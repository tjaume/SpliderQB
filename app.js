
const koa = require('koa');
const route = require('koa-route');
const serve = require('koa-static');
const koabody = require('koa-body');
const path = require('path');
const fs = require('fs');
const spliderClass = require('./Splider');

const app = new koa();

const main = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream('./index.html');
}

const getJokeList = async ctx => {
    if(ctx.request.accepts('json')){
        let index = ctx.request.body.index || 1;
        ctx.response.type = 'json';
        let rst = await spliderClass.splider(index);
        ctx.response.body = JSON.stringify(rst);
    }else{
        ctx.response.body = {error : 'data type error'}
    }
}

app.use(serve(path.join(__dirname, 'static'))); // 添加静态资源目录
app.use(koabody()); // 添加post参数解析
app.use(route.get('/', main));
app.use(route.post('/getJokeList', getJokeList));

//开始监听
var server = app.listen(3000, ()=>{
    console.log("start listen...")
});

app.on('error', err => {
    console.log(err.message);
    console.log(err);
});

server.setTimeout(0);  // 解决ECONNRESET错误，原因在readme中有说明