$('.btn-success').click(function () {
    location.href = 'add.html';
})

// 展示数据
$.get('/accretion', function (res) {
    console.log(res);
    const html = template('accretion', { data: res });
    $('.container>.table>tbody').append(html);
    hide(0);
    page();

    // 修改实现
    $('table tr').find('td:eq(4)').click(function () {
        var index = $(this).parents().index();
        var value = 'index=' + (index - 1) + '';
        console.log(value);
        location.href = 'edit.html?' + value;
    })

    // 删除实现
    var index;
    var td;
    $('table tr').find('td:eq(5)').click(function () {
        console.log('点击删除了');
        // parent:父母;父标签
        index = $(this).parent().index();
        td = this;
        // modal:模态框
        $('#myModal').modal('show');
        var value = 'index=' + (index - 1) + '';
    })
    $('#myModal .modal-footer button:eq(0)').click(function () {
        console.log('点击删确定了');
        $.post('/removeRow', value, function (res) {
            console.log(res);
            if (res.success == 1) {
                // location.href = 'index.html';代价太大了
                // 从table中删除一行
                $(td).parent().remove();
            }
            // alert:警告框  message:成功或者错误的信息
            alert(res.message);
            return;
        })
    })

    // 搜索实现
    var value;
    $('.btn-warning').click(function () {
        console.log('点击搜索按钮');
        $('#searchModal').modal('show');
        value = $('#search').serialize();
    })
    $('#searchModal .btn-primary').click(function () {
        console.log('点击确定了');
        var name = $('#name').val();
        var phone = $('#phone').val();
        var filterArray = res.filter((item, index, arr) => {
            return item.name
            // includes:包含; 
            .includes(name) && item.phone.includes(phone)
        })
        var newhtml = template('accretion', { data: filterArray });
        $('.container>table .insert').empty();
        $(newhtml).insertAfter('.container>table .active');
    })
})

// 每页展示5条记录
function hide(insert) {
    $('.insert').hide();
    $('.insert:eq(' + (insert * 5 + 0) + ')').show();
    $('.insert:eq(' + (insert * 5 + 1) + ')').show();
    $('.insert:eq(' + (insert * 5 + 2) + ')').show();
    $('.insert:eq(' + (insert * 5 + 3) + ')').show();
    $('.insert:eq(' + (insert * 5 + 4) + ')').show();
}

// 分页实现
function page() {
    var counts = $('.insert').length;
    var yushu = counts % 5;
    if (yushu == 0) {
        var yeshu = counts / 5;
    } else {
        var yeshu = (counts - yushu) / 5 + 1;
    }
    var a = 1
    for (let i = 0; i < yeshu; i++) {
        $('.pagination').append(' <li class="lii"><a href="#">' + a + '</a></li>');
        a++;
    }
    $('.pagination').append(' <li class="next"><a href="#" aria-label="Next"><span aria-hidden="true">下一页</span></a></li>');

    var place = 0;
    $('.before').click(function () {
        if (place > 0) {
            $('.lii:eq(' + place + ')').removeClass('active');
            place--;
            hide(place);
            $('.lii:eq(' + place + ')').addClass('active');
        }
    })
    $('.next').click(function () {
        if (place < yeshu - 1) {
            $('.lii:eq(' + place + ')').removeClass('active');
            place++;
            hide(place);
            $('.lii:eq(' + place + ')').addClass('active');
        }
    })
    $('.lii:first').addClass('active');
    $('.lii').click(function () {
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        place = $(this).text() - 1;
        hide(place);
    })
}