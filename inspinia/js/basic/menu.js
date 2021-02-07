// (function () {
//     "use strict";
//     //FileUpLoad
//     ///DW/gateway.html
//     //var path = document.location.pathname;
//     //let currentMenu = document.location.pathname.replace("/","");
//     //debugger;
//
//     let menusFuncation = function () {
//         $.ajax({
//             type: "GET",
//             url: '/getMenus',
//             data: {userName: 'fancky'},
//             dataType: "JSON",
//             async: false,//设置同步请求
//             success: function (result) {
//                 let currentMenu = document.location.pathname.replace("/", "");
//                 var parentMenus = new Array()
//                 //获取一级节点
//                 result.forEach(menu => {
//                     if (menu.parentID == 0) {
//                         parentMenus.push(menu);
//                     }
//                 });
//
//                 //遍历所有一级节点
//                 parentMenus.forEach(p => {
//
//                     //获取该节点的子节点
//                     var children = new Array()
//                     result.forEach(c => {
//                         if (c.parentID == p.id) {
//                             children.push(c);
//                         }
//                     });
//
//
//                     if (children.length == 0) {
//                         let parentNodeHtml = '  <li id="' + p.menuName + '">\n' +
//                             '                    <a href="' + p.url + '"><i class="fa fa-diamond"></i> <span class="nav-label">' + p.displayName + '</span></a>\n' +
//                             '                </li>';
//                         $("#side-menu").append(parentNodeHtml);
//                     } else {
//                         let html = ' <li id="' + p.menuName + '">\n' +
//                             '                    <a href="#"><i class="fa fa-bar-chart-o"></i> <span class="nav-label">' + p.displayName + '</span><span\n' +
//                             '                            class="fa arrow"></span></a>\n' +
//                             '                    <ul class="nav nav-second-level collapse">';
//
//                         children.forEach(child => {
//
//                             let childrenHtml = ' <li id="' + child.menuName + '"><a href="' + child.url + '">' + child.displayName + '</a></li>';
//                             html += childrenHtml;
//                         });
//                         html += '     </ul></li >';
//                         $("#side-menu").append(html);
//                     }
//                 });
//
//
//                 ////ajax 默认异步，生成html之后再绑定事件，否则找不到html元素进而无法绑定事件。
//
//             }
//         });
//
//     };
//
// //判断字符是否为空的方法
//     function isEmpty(obj) {
//         if (typeof obj == "undefined" || obj == null || obj == "") {
//             return true;
//         } else {
//             return false;
//         }
//     }
//
//     function activeNav() {
//         let id = document.location.pathname.replace("/", "");
//
//
//         if (isEmpty(id)) {
// //首页
//         } else {
//
//             // let parentID = $("#" + id).closest('li').attr("id");
//             let parentID = $("#" + id).parent('ul').parent('li').attr("id");
//             let parentStr="";
//             if(!isEmpty(parentID))
//             {
//                 parentStr=parentID+" / ";
//                 console.log(parentID);
//
//                 $("#" + parentID).addClass('active');
//             }
//
//             $("#menuDirectory").html(parentStr+id);
//             // $("#" + id).closest('ul').removeClass('collapse');
//             // $("#" + parentID).addClass('active');
//             $("#" + id).addClass('active');
//             // debugger;
//         }
//
//
//     }
//
//     menusFuncation();
//
//     activeNav();
//
// })();
//
// // $(function () {});
// // (function () {})();


$(function () {
    "use strict";
    // menusFuncation();
    // activeNav();

});
let menusFuncation = function () {
    $.ajax({
        type: "GET",
        url: '/getMenus',
        data: {userName: 'fancky'},
        dataType: "JSON",
        async: false,//设置同步请求
        success: function (result) {
            let currentMenu = document.location.pathname.replace("/", "");
            var parentMenus = new Array()
            //获取一级节点
            result.forEach(menu => {
                if (menu.parentID == 0) {
                    parentMenus.push(menu);
                }
            });

            //遍历所有一级节点
            parentMenus.forEach(p => {

                //获取该节点的子节点
                var children = new Array()
                result.forEach(c => {
                    if (c.parentID == p.id) {
                        children.push(c);
                    }
                });


                if (children.length == 0) {
                    let parentNodeHtml = '  <li id="' + p.menuName + '">\n' +
                        '                    <a href="' + p.url + '"><i class="fa fa-diamond"></i> <span class="nav-label">' + p.displayName + '</span></a>\n' +
                        '                </li>';
                    $("#side-menu").append(parentNodeHtml);
                } else {
                    let html = ' <li id="' + p.menuName + '">\n' +
                        '                    <a href="#"><i class="fa fa-bar-chart-o"></i> <span class="nav-label">' + p.displayName + '</span><span\n' +
                        '                            class="fa arrow"></span></a>\n' +
                        '                    <ul class="nav nav-second-level collapse">';

                    children.forEach(child => {

                        let childrenHtml = ' <li id="' + child.menuName + '"><a href="' + child.url + '">' + child.displayName + '</a></li>';
                        html += childrenHtml;
                    });
                    html += '     </ul></li >';
                    $("#side-menu").append(html);
                }
            });


            ////ajax 默认异步，生成html之后再绑定事件，否则找不到html元素进而无法绑定事件。

        }
    });

};

//判断字符是否为空的方法
function isEmpty(obj) {
    if (typeof obj == "undefined" || obj == null || obj == "") {
        return true;
    } else {
        return false;
    }
}

function activeNav() {
    let id = document.location.pathname.replace("/", "");


    if (isEmpty(id)) {
//首页
    } else {
        //是当前id 所在的元素
        // console.log($("#" + id).closest('li').attr("id"));
        // let parentID = $("#" + id).closest('li').attr("id");
        let parentID = $("#" + id).parent('ul').parent('li').attr("id");
        let parentStr = "";
        if (!isEmpty(parentID)) {
            parentStr = parentID + " / ";
            console.log(parentID);
            $("#" + parentID).addClass('active');
        }

        $("#menuDirectory").html(parentStr + id);
        // $("#" + id).closest('ul').removeClass('collapse');
        // $("#" + parentID).addClass('active');
        $("#" + id).addClass('active');
        // debugger;
    }


}