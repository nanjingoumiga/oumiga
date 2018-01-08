$('form').submit(function(event){
    event.preventDefault();
    const value = $(this).serialize();
    $.post('/add',value,function(res){
        console.log(res);
        if(res.success == 0){
            alert(res.message);
        }else{
            location.href = 'index.html';
        }
    })  
})

// 点学生管理跳转到学生管理页面
$('.active').click(function(){
    location.href = 'index.html';
})