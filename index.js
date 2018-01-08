const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const url = require('url');

const server = http.createServer();
server.on('request', (req, res) => {
    console.log(req.url);
    const regex = /(\.js|\.css|\/$)|(fonts+)|(.html+)/;
    if (regex.test(req.url)) {
        const urlArr = req.url.split('?')
        const url = urlArr[0];
        // 三幕运算符
        const r = fs.createReadStream('www' + ((req.url) == '/' ? '/index.html' : url))
        r.pipe(res);
    }
    // 提交添加学生的数据
    if (req.url === '/add') {
        addHandle(req, res);
    }
    // 获取所有添加学生的数据  
    if (req.url === '/accretion') {
        accretionHandle(req, res);
    }
    // 获取要删除学生的数据   
    if (req.url === '/removeRow') {
        removeRowHandle(req, res);
    }
    // 获取修改学生的数据
    if (req.url === '/updating') {
        updatingHandle(req, res);
    }
    // 获取学生信息的数据
    if (req.url === '/updata') {
        updataHandle(req, res);
    }
})

server.listen(3000);
console.log('服务器运行于3000端口');

function errorHandle(err, res) {
    res.end(JSON.stringify({ success: 0, message: '系统错误,再次尝试' }));
}

// 设置错误处理
function accretionHandle(req, res) {
    res.setHeader('Content-Type', 'application/json');
    const r = fs.createReadStream('adds.json');
    r.pipe(res);
}

// 添加学生的操作
function addHandle(req, res) {
    res.setHeader('Content-Type', 'application/json');
    // 获取post请求的数据
    let total = '';
    req.on('data', (data) => {
        total += data;
    })
    req.on('end', () => {
        console.log(total);
        // 数据解析
        const totalObj = querystring.parse(total);
        // 保存数据
        const name = totalObj.name;
        const age = totalObj.age;
        const phone = totalObj.phone;
        const email = totalObj.email;

        fs.readFile('adds.json', (err, data) => {
            if (err) return errorHandle(err, res);
            const dataArr = JSON.parse(data);
            dataArr.unshift({ name, age, phone, email });
            fs.writeFile('adds.json', JSON.stringify(dataArr), (err) => {
                if (err) return errorHandle(err, res);
                res.end(JSON.stringify({ success: 1, message: '保存成功' }));
                return;
            })
        })
    })
}

// 点击删除-确定方法
function removeRowHandle(req, res) {
    res.setHeader('Content-Type', 'application/json');
    var total1 = '';
    req.on('data', (data) => {
        total1 += data;
    })
    req.on('end', (err) => {
        console.log(total1);
        if (err) return errorHandle(err, res);
        const dataObj1 = querystring.parse(total1);
        fs.readFile('adds.json', (err, data) => {
            if (err) return errorHandle(err, res);
            const dataJson1 = JSON.parse(data);
            console.log(dataJson1);
            const index = dataObj1.index;
            console.log(index);
            dataJson1.splice(index, 1);
            console.log(dataJson1);
            fs.writeFile("adds.json", JSON.stringify(dataJson1), (err) => {
                console.log("afsdfsd");
                if (err) return errorHandle(err, res);
                res.end(JSON.stringify({ success: 1, message: "删除成功" }));
            })
        })

    })
}

// 
function updatingHandle(req, res) {
    // 响应头
    res.setHeader('content-type', 'application/json');
    var total = '';
    req.on('data', (data) => {
        total += data;
    })
    req.on('end', () => {
        console.log(total);
        const dataObj = querystring.parse(total);
        const num = dataObj.index;
        fs.readFile('adds.json', (err, data) => {
            if (err) return errhandle(err, res);
            const stuArr = JSON.parse(data);
            const updatingObj = stuArr[num];
            res.end(JSON.stringify(updatingObj));
        })
    })
}

// 
function updataHandle(req, res) {
    res.setHeader('content-type', 'application/json');
    var total = '';
    req.on('data', (data) => {
        total += data;
    })
    req.on('end', () => {
        console.log(total);
        // parse:解析
        const dataObj = querystring.parse(total);
        const name = dataObj.name;
        const age = dataObj.age;
        const phone = dataObj.phone;
        const email = dataObj.email;
        const introduce = dataObj.introduce;
        const index = dataObj.index;
        // readFile:读文件
        fs.readFile('adds.json', (err, data) => {
            if (err) return errhandle(err, res);
            const stuArr = JSON.parse(data);
            // splice:拼接
            stuArr.splice(index, 1, { name, age, phone, email, introduce });
            fs.writeFile('adds.json', JSON.stringify(stuArr), (err, data) => {
                if (err) return errhandle(err, res);
                else {
                    const result = { success: 1, message: '提交成功' };
                    // stringify:字符串化
                    res.end(JSON.stringify(result));
                }
            })
        })
    })
}