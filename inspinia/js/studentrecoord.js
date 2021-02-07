var $button = $('#submitBtn'),
    //选择文件按钮
    $file = $("#choose-file"),
    //回显的列表
    $list = $('.file-list'),
    $updateBtn = $('#updateBtn'),
    $textareaid = $('#textareaid'),
    $phoneid = $('#phoneid'),

    $errorMessageTextarea = $('.errorMessageTextarea'),
    $errorMessageInput = $('.errorMessageInput');


//选择要上传的所有文件
let fileList = [];

//当前选择上传的文件
var curFile;
$file.on('change', function () {
    $("#fileName").html("");
    //原生的文件对象，相当于$file.get(0).files[0];
    curFile = this.files;
    fileList=[];
    //将FileList对象变成数组
    fileList = fileList.concat(Array.from(curFile));
    var file = $("#choose-file").val();
    var fileName = getFileName(file);

    $("#fileName").html(fileName);
});



function getFileName(o){
    var pos=o.lastIndexOf("\\");
    return o.substring(pos+1);
}

function getFormData(form) {
    // 传入的是表单对象 var obj_form = document.getElementById("form")
    // console.log('form', form)
    if (!form) {
        return {};
    }
    var params = {};
    var elems = form.elements;
    for (var i in elems) {
        var elem = elems[i];
        if (elem.nodeName != "INPUT" && elem.nodeName != "TEXTAREA") {
            continue;
        }
        var nodeAttrs = elem.attributes;

        if (nodeAttrs.name) {
            params[nodeAttrs.name.nodeValue] = elem.value;
        }
    }
    return params;
}

// 提交
$button.on('click', function () {
    var regForm = document.getElementById("regForm")
    var parmas = getFormData(regForm);

    // console.log('parmas', parmas)
    // console.log('fileList', fileList)
    // if (parmas.suggestion.length === 0 && parmas.phone.length === 0) {
    //     $errorMessageTextarea.css({display: 'block'})
    //     $errorMessageInput.css({display: 'block'})
    // } else if (parmas.suggestion.length === 0) {
    //     $errorMessageTextarea.css({display: 'block'})
    //     return false
    // } else if (parmas.phone.length === 0) {
    //     $errorMessageInput.css({display: 'block'})
    //     return false
    // } else
    if (fileList.length > 0) {
        let formData = new FormData();
        for (var i = 0, len = fileList.length; i < len; i++) {
            formData.append('file', fileList[i]);//将图片加入FormData
        }

        //添加其他属性
        // formData.append("suggestion", parmas.suggestion);
        // formData.append("phone", parmas.phone);

        // console.log('formData', formData.get("suggestion"))
        $.ajax({
            //要将静态html发布到站点才能访问API
            //url: 'http://localhost:8010/Api/FeedBack/Add',
            //用nginx代理localhost会有问题，用ip代替
            url: 'http://localhost:8970/record/api/studentrecord/importData',
            type: 'post',
            processData: false,
            contentType: false,//发送到服务器的数据类型
            //datatype:json  //服务器返回的数据类型
            data: formData,
            success: function (data, statusText, headers) {
                debugger;
                if (data.code==0) {
                    alert("上传成功！")
                } else {
                    alert("上传失败！")
                }
            }
        })

    } else {
        alert("请选择文件！")
    }
    return false;

})