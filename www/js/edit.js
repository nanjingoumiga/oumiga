console.log(location.href);
var hrefArr=location.href.split('?');
var value=hrefArr[1];
$.post('/updating',value, function (res) {
    console.log(res);
    $('#name').val(res.name);
    $('#age').val(res.age);
    $('#phone').val(res.phone);
    $('#email').val(res.email);
    $('#introduce').val(res.introduce);
    console.log(res.name);
    console.log(res.age);
    console.log(res.phone);
})

$('form').submit(function (event) {
    event.preventDefault();
    const value = $(this).serialize()+'&'+hrefArr[1];
    console.log(value);
    $.post('/updata', value, function (res) {
        if (res.success == 1) {
            location.href = 'index.html';
        }
        else {
            alert(res.message);
        }
    })
})

// 点学生管理跳转到学生管理页面
$('.active').click(function(){
    location.href = 'index.html';
})
