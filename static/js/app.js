/**
 * 外部模块引入
 */
import $ from 'jquery'

/* 手机识别 */
export function load() {
    // alert($(window).height())
    var u = navigator.userAgent
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        // 安卓手机
    } else if (u.indexOf('iPhone') > -1) {
        // 苹果手机
        // 屏蔽ios下上下弹性
        $(window)
            .on('scroll.elasticity', function(e) {
                e.preventDefault()
            })
            .on('touchmove.elasticity', function(e) {
                e.preventDefault()
            })
    } else if (u.indexOf('Windows Phone') > -1) {
        // winphone手机
    }
}

/* 电子书初始化 */
export function loadApp(total) {
    var w = $(window).width()
    var h = $(window).height()
    $('.flipboox').width(w).height(h)
    $(window).resize(function() {
        w = $(window).width()
        h = $(window).height()
        $('.flipboox').width(w).height(h)
    })
    $('.flipbook').turn({
        // Width
        width: w,
        // Height
        height: h,
        // Elevation
        elevation: 50,
        display: 'single',
        // Enable gradients
        gradients: true,
        // Auto center this flipbook
        autoCenter: true,
        // 新加 option
        acceleration: true,
        turnCorners: 'tl,tr,b,br,l,r',
        when: {
            turning: function(e, page, view) {
                if (page === 1) {
                    $('.btnImg').css('display', 'none')
                    $('.mark').css('display', 'block')
                } else {
                    $('.btnImg').css('display', 'block')
                    $('.mark').css('display', 'none')
                }
                if (page === total) {
                    $('.nextPage').css('display', 'none')
                } else {
                    $('.nextPage').css('display', 'block')
                }
            },
            turned: function(e, page, view) {
                // console.log(page)
                // var total = $('.flipbook').turn('pages')
                //  总页数
                if (page === 1) {
                    $('.return').css('display', 'none')
                    $('.btnImg').css('display', 'none')
                } else {
                    $('.return').css('display', 'block')
                    $('.btnImg').css('display', 'block')
                }
                if (page === 2) {
                    $('.catalog').css('display', 'block')
                } else {
                    $('.catalog').css('display', 'none')
                }
            }
        }
    })
}

/**
 * 翻页
 */
export function goto() {
    // 上一页
    // touchend
    $('.previousPage').on('touchend', function() {
            // var pageCount = $('.flipbook').turn('pages') // 总页数
            var currentPage = $('.flipbook').turn('page') // 当前页
            if (currentPage >= 2) {
                $('.flipbook').turn('page', currentPage - 1)
            } else {}
        })
        // 下一页
    $('.nextPage').on('touchend', function() {
            var pageCount = $('.flipbook').turn('pages') // 总页数
            var currentPage = $('.flipbook').turn('page') // 当前页
            if (currentPage <= pageCount) {
                $('.flipbook').turn('page', currentPage + 1)
            } else {}
        })
        // 返回到目录页
    $('.return').on('touchend', function() {
        $(document).confirm(
            '您确定要返回首页吗?', {},
            function() {
                $('.flipbook').turn('page', 1) // 跳转页数
            },
            function() {}
        )
    })
}

/**
 * 页数跳转
 */
export function turn(page) {
    $('.flipbook').turn('page', page)
}

/**
 * 提取img标签
 */
export function picture(result) {
    var reg = /<img[^>]*>/gi
    return result.match(reg)
}

/**
 * 判断目录是否需要加0
 */
export function zero(num) {
    if (num >= 9) {
        return num + 1
    } else if (num < 9) {
        return '0' + (num + 1)
    }
}

// 字符长度
function GetLength(str) {
    // <summary>获得字符串实际长度，中文1，英文0.5</summary>
    // <param name="str">要获得长度的字符串</param>
    var realLength = 0
    var len = str.length
    var charCode = -1
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i)
        if (charCode >= 0 && charCode <= 128) {
            realLength += 0.5
        } else {
            realLength += 1
        }
    }
    realLength = Math.ceil(realLength)
    return realLength
}

/**
 * 自适应分页,根据高度
 * 参数： 页面顶层 文字包含层 名字 行数 页码数
 * */
export function pagetion(cell, cell2, name, ths, psn) {
    var ww = parseInt($(document).width()) // 页面宽
    var wh = parseInt($(document).height()) // 页面高
        // var fnum1 = strlen($(cell2).text()) // 总字数
    var fnum2 = $(cell2).text().length // .replace(/[^\u4e00-\u9fa5]/g, '**')  // 总字数[^\u4e00-\u9fa5]/g [^\x00-\xff]/g
    var fs = parseInt($(cell2).css('font-size')) // 字号
    var lh = parseInt($(cell2).css('line-height')) // 行高
    var pd = parseInt($(cell2).css('padding-left')) // padding
    var lf = Math.floor((ww - pd * 2) / fs) // 每行字数
    var th = ths
    var pf = lf * th // 每页字数
    var pagetotal = Math.ceil(fnum2 / pf) // 总页数 // var pagetotal = Math.ceil(fnum2 / pf) // 总页数
    if (pagetotal === 0) pagetotal = 1
        /**
         *   if (Math.floor(fnum2 / pf) <= 1) {
            pagetotal = 1
        }
        console.log(pagetotal)
         */
    for (var i = 1; i <= pagetotal; i++) {
        var content = "<section><div class='mains clearfix'>"
        if (i === 1) {
            if (i + psn > 10) {
                content +=
                    "<h4 class='fh'><sapn class='first name'>" +
                    name +
                    "<sapn class='first pagenum'>" +
                    (i + psn) +
                    "</sapn></sapn></h4><div class='cont'>"
            } else {
                content +=
                    "<h4 class='fh'><sapn class='first name'>" +
                    name +
                    "<sapn class='first pagenum'>0" +
                    (i + psn) +
                    "</sapn></sapn></h4><div class='cont'>"
            }
        } else if (i + psn > 1 && i + psn < 10) {
            content +=
                "<h4><span class='name2'>" +
                name +
                "</span><span class='pagenum2'>0" +
                (i + psn) +
                "</span></h4><div class='cont'>"
        } else {
            content +=
                "<h4><span class='name2'>" +
                name +
                "</span><span class='pagenum2'>" +
                (i + psn) +
                "</span></h4><div class='cont'>"
        }
        var fsz = $(cell2).text().substring((i - 1) * pf, pf * i)
        for (var j = 1; j <= th; j++) {
            content += '<tt>' + fsz.substring((j - 1) * lf, lf * j) + '</tt>'
        }
        content += '</div></div></section>'
        content = content.replace(/>010</g, '>10<')
        $(cell).append(content)
    }
    return pagetotal + psn
}

/**
 * 自适应分页,竖直排列,根据宽度
 * 参数： 页面顶层 文字包含层 名字 行数 页码数
 * */
export function pagetionV(cell, cell2, name, ths, psn) {
    var ww = parseInt($(document).width()) // 页面宽
    var wh =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight // window.screen.height // 页面高
        // console.log($(cell2).height())
        // var fnum1 = strlen($(cell2).text()) // 总字数
    var fnum2 = $(cell2).text().length // 总字数[^\u4e00-\u9fa5]/g [^\x00-\xff]/g
    var fs = parseInt($(cell2).css('font-size')) + 24 // 字号 24为单词空格的2倍 letter-spacing
    var lh = parseInt($(cell2).css('line-height')) // 行高
        // var pd = parseInt($(cell2).css('padding-left')) // padding
    var lf = Math.floor(wh * 0.8 / fs) // 每行字数
        /**
         * if (ths === undefined || ths === null || ths === '') {
            var th = Math.floor(ww / lh) // 每页行数
        } else {
            th = ths // 每页行数
        }
         */
    var th = ths
    var pf = lf * th // 每页字数
    var pagetotal = Math.ceil(fnum2 / pf) // 总页数 // var pagetotal = Math.ceil(fnum2 / pf) // 总页数
    if (pagetotal === 0) pagetotal = 1

    /**
     *  if (Math.floor(fnum2 / pf) <= 1) {
         pagetotal = 1
     }
     */

    for (var i = 1; i <= pagetotal; i++) {
        var content = '<section><div class="ver mains clearfix">'
        if (i === 1) {
            if (i + psn > 10) {
                content +=
                    "<h4 class='fh'><sapn class='first name'>" +
                    name +
                    "<sapn class='first pagenum'>" +
                    (i + psn) +
                    "</sapn></sapn></h4><div class='cont'>"
            } else {
                content +=
                    "<h4 class='fh'><sapn class='first name'>" +
                    name +
                    "<sapn class='first pagenum'>0" +
                    (i + psn) +
                    "</sapn></sapn></h4><div class='cont'>"
            }
        } else if (i + psn > 1 && i + psn < 10) {
            content +=
                "<h4><span class='name2'>" +
                name +
                "</span><span class='pagenum2'>0" +
                (i + psn) +
                "</span></h4><div class='cont'>"
        } else {
            content +=
                "<h4><span class='name2'>" +
                name +
                "</span><span class='pagenum2'>" +
                (i + psn) +
                "</span></h4><div class='cont'>"
        }
        var fsz = $(cell2).text().substring((i - 1) * pf, pf * i)
        for (var j = 1; j <= th; j++) {
            content += '<tt>' + fsz.substring((j - 1) * lf, lf * j) + '</tt>'
        }
        content += '</div></div></section>'
        content = content.replace(/>010</g, '>10<')
        $(cell).append(content)
    }
    return pagetotal + psn
}

/**
 * 自适应分页,九宫格,根据高度
 * 参数： 页面顶层 数据 名字 行数 页码数
 * */
export function pagetionRE(cell, data, name, ths, psn) {
    var fnum2 = data.length // 总字数[^\u4e00-\u9fa5]/g [^\x00-\xff]/g
    var lf = 5 // 每行字数
    var th = ths // 每页行数
    var pf = lf * th // 每页字数
    var pagetotal = Math.ceil(fnum2 / pf) // 总页数 // var pagetotal = Math.ceil(fnum2 / pf) // 总页数
    if (Math.floor(fnum2 / pf) <= 1) {
        pagetotal = 1
    }
    for (var i = 1; i <= pagetotal; i++) {
        var content = '<section><div class="re mains clearfix">'
        if (i === 1) {
            if (i + psn > 10) {
                content +=
                    "<h4 class='fh'><sapn class='first name'>" +
                    name +
                    "<sapn class='first pagenum'>" +
                    (i + psn) +
                    "</sapn></sapn></h4><div class='contn'>"
            } else {
                content +=
                    "<h4 class='fh'><sapn class='first name'>" +
                    name +
                    "<sapn class='first pagenum'>0" +
                    (i + psn) +
                    "</sapn></sapn></h4><div class='contn'>"
            }
        } else if (i + psn > 1 && i + psn < 10) {
            content +=
                "<h4><span class='name2'>" +
                name +
                "</span><span class='pagenum2'>0" +
                (i + psn) +
                "</span></h4><div class='contn'>"
        } else {
            content +=
                "<h4><span class='name2'>" +
                name +
                "</span><span class='pagenum2'>" +
                (i + psn) +
                "</span></h4><div class='contn'>"
        }
        var fsz = data.substring((i - 1) * pf, pf * i)
        for (var j = 1; j <= th; j++) {
            content += '<tt class="clearfix">'
            var fns = fsz.substring((j - 1) * lf, lf * j)
            for (var k = 1; k <= lf; k++) {
                content += '<span class="grid">' + fns.substring(k - 1, k) + '</span>'
            }
            content += '</tt>'
        }
        content += '</div></div></section>'
        content = content.replace(/>010</g, '>10<')
        $(cell).append(content)
    }
    return pagetotal + psn
}

/**
 * 自适应分页,图文,根据高度
 * 参数： 页面顶层 文字包含层 名字 行数 首页行数 页码数
 * */
export function pagetionIMG(cell, cell2, name, ths, fths, psn) {
    var ww = parseInt($(document).width()) // 页面宽
    var wh = parseInt($(document).height()) // 页面高
    var totalpage = []
    var i2 = 0
    $.each($(cell2), function(index, el) {
        // console.log(GetNoZhAll($(el).text()))
        // console.log(GetZh($(el).text()))
        var fnum2 = $(el).text().length // 总字数[^\u4e00-\u9fa5]/g [^\x00-\xff]/g
        var fs = parseInt($(el).css('font-size')) // 字号
        var lh = parseInt($(el).css('line-height')) // 行高
        var pd = parseInt($(el).css('padding-left')) // padding
        var lf = Math.floor((ww - pd * 2) / fs) // 每行字数
            // 图片处理start
        var img = $(el).children('img').attr('src').split(',').reverse() // 图片src
        if (img.length === 1 && ($(el).children('img').attr('src') === null || $(el).children('img').attr('src') === undefined || $(el).children('img').attr('src') === '')) {
            if (cell2 === '.vis5_main') {
                var pic = '<div class="photo"><span class="nameold"></span>' // 图片html <img src="static/default/名人缺省@2x.png" />
            } else if (cell2 === '.vis8_main') {
                pic = '<div class="photo"><span class="citang"></span>' // 图片html <img src="static/default/组-2@2x.png" />
            }
        } else if (img.length === 1) {
            pic = '<div class="photo">' // 图片html
            for (var l = 0; l < img.length; l++) {
                pic += '<img src=' + img[l] + '>'
            }
        } else {
            pic = '<div class="photo photo2"><i>1/' + img.length + '</i>'
            for (l = 0; l < img.length; l++) {
                pic += '<img src=' + img[l] + '>'
            }
        }
        pic += '</div>'
            // 图片end

        if (ths === undefined || ths === null || ths === '') {
            var th = Math.floor(wh / lh) // 每页行数
        } else {
            th = ths // 每页行数
        }
        var firstTh = fths // 首页行数
        var firstPf = lf * firstTh // 首页字数
        var pf = lf * th // 每页字数
            // 总页数 // var pagetotal = Math.ceil(fnum2 / pf) // 总页数
        if (fnum2 - firstPf >= 0) {
            var pagetotal = 1 + Math.ceil((fnum2 - firstPf) / pf)
        } else {
            pagetotal = 1
        }
        var firstTxt = $(el).text().substring(0, firstPf) // 首页文字
        var itText = $(el).text().substr(firstPf) // 剩余文字
        for (var i = 1; i <= pagetotal; i++) {
            totalpage.push(i + i2 + psn)
            var fszn = itText.substring((i - 2) * pf, pf * (i - 1)) // 每页文字
            var content = '<section><div class="mains clearfix pic">'
            if (i === 1) {
                if (index === 0) {
                    if (i + psn > 10) {
                        content +=
                            "<h4 class='fh'><sapn class='first name'>" +
                            name +
                            "<sapn class='first pagenum'>" +
                            (i + i2 + psn) +
                            '</sapn></sapn></h4>' +
                            pic +
                            "<div class='cont'>"
                    } else {
                        content +=
                            "<h4 class='fh'><sapn class='first name'>" +
                            name +
                            "<sapn class='first pagenum'>0" +
                            (i + i2 + psn) +
                            '</sapn></sapn></h4>' +
                            pic +
                            "<div class='cont'>"
                    }
                } else {
                    if (i + psn > 10) {
                        content +=
                            "<h4><span class='name2'>" +
                            name +
                            "</span><span class='pagenum2'>" +
                            (i + i2 + psn) + '</sapn></sapn></h4>' +
                            pic +
                            "<div class='cont'>"
                    } else {
                        content +=
                            "<h4><span class='name2'>" +
                            name +
                            "</span><span class='pagenum2'>0" +
                            (i + i2 + psn) +
                            '</sapn></sapn></h4>' +
                            pic +
                            "<div class='cont'>"
                    }
                }
                for (var j = 1; j <= firstTh; j++) {
                    content += '<tt>' + firstTxt.substring((j - 1) * lf, lf * j) + '</tt>'
                }
            } else if (i + psn > 1 && i + psn < 10) {
                content +=
                    "<h4><span class='name2'>" +
                    name +
                    "</span><span class='pagenum2'>0" +
                    (i + i2 + psn) +
                    "</span></h4><div class='cont'>"
                for (var m = 1; m <= th; m++) {
                    content += '<tt>' + fszn.substring((m - 1) * lf, lf * m) + '</tt>'
                }
            } else {
                content +=
                    "<h4><span class='name2'>" +
                    name +
                    "</span><span class='pagenum2'>" +
                    (i + i2 + psn) +
                    "</span></h4><div class='cont'>"
                for (var n = 1; n <= th; n++) {
                    content += '<tt>' + fszn.substring((n - 1) * lf, lf * n) + '</tt>'
                }
            }
            content += '</div></div></section>'
                // content = content.replace(/>010</g, '>10<')
            for (var ll = 9; ll <= 100; ll++) {
                content = content.replace(new RegExp('>0' + ll + '<', 'g'), '>' + ll + '<')
            }
            $(cell).append(content)
        }
        i2 += pagetotal
    })
    return totalpage
}

/**
 * 自适应分页,列表,根据数量
 * 参数： 页面顶层 数据 名字 行数 页码数
 * */
export function pagetionLs(cell, data, name, ths, psn) {
    var len = data.length // 总行数
    var th = ths // 每页行数
    var pagetotal = Math.ceil(len / th) // 总页数 // var pagetotal = Math.ceil(fnum2 / pf) // 总页数
    if (pagetotal <= 1) {
        pagetotal = 1
    }
    for (var i = 1; i <= pagetotal; i++) {
        var content = '<section><div class="mains clearfix">'
        if (i === 1) {
            if (i + psn > 10) {
                content +=
                    "<h4 class='fh'><sapn class='first name'>" +
                    name +
                    "<sapn class='first pagenum'>" +
                    (i + psn) +
                    '</sapn></sapn></h4><div class="contl">'
            } else {
                content +=
                    "<h4 class='fh'><sapn class='first name'>" +
                    name +
                    "<sapn class='first pagenum'>0" +
                    (i + psn) +
                    '</sapn></sapn></h4><div class="contl">'
            }
        } else if (i + psn > 1 && i + psn < 10) {
            content +=
                "<h4><span class='name2'>" +
                name +
                "</span><span class='pagenum2'>0" +
                (i + psn) +
                '</span></h4><div class="contl">'
        } else {
            content +=
                "<h4><span class='name2'>" +
                name +
                "</span><span class='pagenum2'>" +
                (i + psn) +
                '</span></h4><div class="contl">'
        }
        content += '<ul>'
        for (var j = 0; j < th; j++) {
            var k = (i - 1) * th + j
            if (k < len) {
                content +=
                    '<li><span><img src=' + data[k].member.avatar + ' alt="picture" /></span>'
                content += '<span>' + data[k].member.name + '</span>'
                content += '<span>功德值: ' + data[k].contribution + '</span>'
                content += '</li>'
            }
        }
        content += '</ul></div></div></section>'
        content = content.replace(/>010</g, '>10<')
        $(cell).append(content)
    }
    return pagetotal + psn
}

/**
 * 自适应分页,田字格,根据数量
 * 参数： 页面顶层 数据 名字 行数 页码数
 * */
export function pagetionFR(cell, data, name, ths, psn) {
    var len = data.length // 总行数
    var th = ths // 每页行数
    var pagetotal = Math.ceil(len / th) // 总页数 // var pagetotal = Math.ceil(fnum2 / pf) // 总页数
    if (pagetotal <= 1) {
        pagetotal = 1
    }
    for (var i = 1; i <= pagetotal; i++) {
        var content = '<section><div class="mains clearfix">'
        if (i === 1) {
            if (i + psn > 10) {
                content +=
                    "<h4 class='fh'><sapn class='first name'>" +
                    name +
                    "<sapn class='first pagenum'>" +
                    (i + psn) +
                    '</sapn></sapn></h4><div class="contz clearfix">'
            } else {
                content +=
                    "<h4 class='fh'><sapn class='first name'>" +
                    name +
                    "<sapn class='first pagenum'>0" +
                    (i + psn) +
                    '</sapn></sapn></h4><div class="contz clearfix">'
            }
        } else if (i + psn > 1 && i + psn < 10) {
            content +=
                "<h4><span class='name2'>" +
                name +
                "</span><span class='pagenum2'>0" +
                (i + psn) +
                '</span></h4><div class="contz clearfix">'
        } else {
            content +=
                "<h4><span class='name2'>" +
                name +
                "</span><span class='pagenum2'>" +
                (i + psn) +
                '</span></h4><div class="contz clearfix">'
        }
        content += '<ol>'
        for (var j = 0; j < th; j++) {
            var k = (i - 1) * th + j
            if (k < len) {
                content +=
                    '<li><span class="s_pic"><img src="' +
                    data[k].avatar +
                    '" alt="picture" /></span>'
                content += '<span class="s_name_l">' + data[k].name + '</span>'
                content += '<span class="s_name_r">' + data[k].age + '岁</span>'
                content += '</li>'
            }
        }
        content += '</ol></div></div></section>'
        content = content.replace(/>010</g, '>10<')
        $(cell).append(content)
    }
    return pagetotal + psn
}

/**
 * 自适应分页,单纯图片,根据数量
 * 参数：页面顶层 数据 名字 页码数
 */
export function pagetionPS(cell, data, name, psn) {
    var imgs = data
    var pagetotal = imgs.length // 总页数 // var pagetotal = Math.ceil(fnum2 / pf) // 总页数
    if (pagetotal < 1) {
        var content = '<section><div class="mains clearfix old">'
        content +=
            "<h4 class='fh'><sapn class='first name'>" +
            name +
            "<sapn class='first pagenum'>" +
            (1 + psn) +
            '</sapn></sapn></h4><div class="contp">'
        content += '<span class="psimg"></span>' // <img src="static/default/laojiapu-@2x.png">
        content += '</div></div></section>'
        content = content.replace(/>010</g, '>10<')
        $(cell).append(content)
        pagetotal = 1
    } else if (pagetotal >= 1) {
        for (var i = 1; i <= pagetotal; i++) {
            content = '<section><div class="mains clearfix old">'
            if (i === 1) {
                if (i + psn > 10) {
                    content +=
                        "<h4 class='fh'><sapn class='first name'>" +
                        name +
                        "<sapn class='first pagenum'>" +
                        (i + psn) +
                        '</sapn></sapn></h4><div class="contp">'
                } else {
                    content +=
                        "<h4 class='fh'><sapn class='first name'>" +
                        name +
                        "<sapn class='first pagenum'>0" +
                        (i + psn) +
                        '</sapn></sapn></h4><div class="contp">'
                }
            } else if (i + psn > 1 && i + psn < 10) {
                content +=
                    "<h4><span class='name2'>" +
                    name +
                    "</span><span class='pagenum2'>0" +
                    (i + psn) +
                    "</span></h4><div class='contp'>"
            } else {
                content +=
                    "<h4><span class='name2'>" +
                    name +
                    "</span><span class='pagenum2'>" +
                    (i + psn) +
                    "</span></h4><div class='contp'>"
            }
            content += '<img src=' + imgs[i - 1] + '>'
            content += '</div></div></section>'
            content = content.replace(/>010</g, '>10<')
            $(cell).append(content)
        }
    }
    return pagetotal + psn
}

/**
 * jquery
 */
// 图片控制
// bg('.bg', '.photo2', '.bg_main', '.li2', '.li1', '.li3')
export function bg(cell1, cell2, cell3, btn1, btn2, btn3) {
    var ic = 0
    var pic = []
        // touchend -> touchstart
    $('body').on('touchstart', cell2, function() {
        $(cell1).show()
        $.each($(cell2).children('img'), function(index, el) {
            pic.unshift($(el).attr('src'))
        })
        $(cell3).css({
            background: 'url(' + pic[0] + ') no-repeat center',
            backgroundSize: 'contain'
        })
    })
    $(cell1).on('touchstart', btn1, function() {
        $(cell1).hide()
    })
    $(cell1).on('touchstart', btn2, function() {
        ic--
        if (ic < 0) {
            ic = pic.length - 1
        }
        $(cell3).css({
            background: 'url(' + pic[ic] + ') no-repeat center',
            backgroundSize: 'contain'
        })
    })
    $(cell1).on('touchstart', btn3, function() {
        ic++
        if (ic > pic.length - 1) {
            ic = 0
        }
        $(cell3).css({
            background: 'url(' + pic[ic] + ') no-repeat center',
            backgroundSize: 'contain'
        })
    })
}

// 插入
export function appIn(cell, data) {
    $(cell).append(data)
}

/**
 * 判断iphone几代
 */
export function getPhoneType() {
    // 正则,忽略大小写
    var patternphone = new RegExp('iphone', 'i')
    var patternandroid = new RegExp('Android', 'i')
    var userAgent = navigator.userAgent.toLowerCase()
    var isAndroid = patternandroid.test(userAgent)
    var isIphone = patternphone.test(userAgent)
    var phoneType = 'phoneType'
    if (isAndroid) {
        // var zhcnIndex = userAgent.indexOf('-')
        // var spaceIndex = userAgent.indexOf('build', zhcnIndex + 4)
        // var fullResult = userAgent.substring(zhcnIndex, spaceIndex)
        phoneType = 0 // fullResult.split('')[1]
    } else if (isIphone) {
        // 6   w=375    6plus w=414   5s w=320     5 w=320
        var wigth = window.screen.width
            // window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        if (wigth > 400) {
            phoneType = 6.5 // 'iphone6 plus'
        } else if (wigth > 370) {
            phoneType = 6 // 'iphone6'
        } else if (wigth > 315) {
            phoneType = 5 // 'iphone5 or iphone5s'
        } else {
            phoneType = 4 // 'iphone 4s'
        }
    } else {
        phoneType = 10 // '您的设备太先进了'
    }
    return phoneType
}

/**
 * 正则
 */
// 匹配img
export function matchAll(str) {
    //	匹配图片（g表示匹配所有结果i表示区分大小写）
    var imgReg = /<img.*?(?:>|\/>)/g
        //	匹配src属性
    var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/g
        // 匹配所有中文字符
        // 数字和字母 \w\u9FA5\uf900-\ufa2d\u301e\ufe10-\ufe19\ufe30-\ufe44\ufe50-\ufe6b\uff01-\uffee
    var textReg = /[\u2E80-\u2EFF\u2F00-\u2FDF\u3000-\u303F\u31C0-\u31EF\u3200-\u32FF\u3300-\u33FF\u3400-\u4DBF\u4DC0-\u4DFF\u4E00-\u9FBF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF]+/g

    var notReg = /\"*\+*\"*/g

    var obj = {}

    var img = str.match(imgReg)
    var src = str.match(srcReg)
    var txt = str.replace(imgReg, '').replace(srcReg, '')

    obj.imgs = img
    obj.src = src
    obj.txt = txt

    return obj
}

// 验证邮箱
export function checkEmail(str) {
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if (re.test(str)) {
        alert('正确')
    } else {
        alert('错误')
    }
}

// 验证手机号
export function checkMobile(str) {
    // /^1\d{10}$/
    var re = /^(0|86|17951)?(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$/
    var m = true
    if (re.test(str)) {
        m = true
    } else {
        m = false
    }
    return m
}

// 验证账户
export function checkUser(str) {
    var re = /^[a-zA-z]\w{3,15}$/
    if (re.test(str)) {
        alert('正确')
    } else {
        alert('错误')
    }
}

// 验证姓名 2-4 位
export function checkName(str) {
    var re = /^[\u4E00-\u9FA5]{2,4}$/
    var m = true
    if (re.test(str)) {
        m = true
    } else {
        m = false
    }
    return m
}

// 验证验证码 必须为数字和字母
export function checkCode(str) {
    var re = /^[a-z0-9A-Z]+$/
    var m = true
    if (re.test(str)) {
        m = true
    } else {
        m = false
    }
    return m
}

// 获得所有数字字母符号中文字符
export function GetNoZhAll(str) {
    // var reg = /[0-9A-Za-z^%&',;=?$<>《》。.，；-_"“”【】{}!！]/ig
    // /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/
    var reg = /[a-z0-9A-Z',;=?$<>.-_"{}\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/ig
    var font = str.match(reg)
    return font.length
}

export function GetZh(str) {
    var reg = /[\u4e00-\u9fa5]/ig
    var s = str.match(reg)
    return s.length
}

// 获取url参数 获得地址栏某个字段的值
export function GetQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
}

// 获得手机号
export function Getphone(cell) {
    var str = $(cell).text()
    var phoneReg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/g
    var phone = str.match(phoneReg)
    return phone
}

// 去除空格
export function Trim(str) {
    str = str.replace(/\s+/g, '')
    return str
}

// 去除换行
export function ClearBr(key) {
    key = key.replace(/<\/?.+?>/g, '')
    key = key.replace(/[\r\n]/g, '')
    return key
}

// 去除空格和换行
export function TrimBr(str) {
    str = str.replace(/\s+/g, '')
    str = str.replace(/<\/?.+?>/g, '')
    str = str.replace(/[\r\n]/g, '')
    return str
}

// 可以将变量传入正则进行替换
// string.replace(new RegExp(key,'g'),"b")

/**
 * 屏幕滚动
 */
export function ScollLoad() {
    var myScroll
    var pullDown = $('#pullDown')
    var pullUp = $('#pullUp')
    var pullDownLabel = $('.pullDownLabel')
    var pullUpLabel = $('.pullUpLabel')
    var container = $('#list')
    var loadingStep = 0 // 加载状态0默认，1显示加载状态，2执行加载数据，只有当为0时才能再次加载，这是防止过快拉动刷新

    pullDown.hide()
    pullUp.hide()

    myScroll = new IScroll('#wrapper', {
        scrollbars: true,
        mouseWheel: false,
        interactiveScrollbars: true,
        shrinkScrollbars: 'scale',
        fadeScrollbars: true,
        scrollY: true,
        probeType: 2,
        bindToWrapper: true
    })

    myScroll.on('scroll', function() {
        if (
            loadingStep === 0 &&
            !pullDown.attr('class').match('refresh|loading') &&
            !pullUp.attr('class').match('refresh')
        ) {
            if (this.y > 40) {
                // 下拉刷新操作
                $('.pulldown-tips').hide()
                pullDown.addClass('refresh').show()
                pullDownLabel.text('松手刷新数据')
                loadingStep = 1
                myScroll.refresh()
            } else if (this.y < this.maxScrollY - 14) {
                // 上拉加载更多
                pullUp.addClass('refresh').show()
                pullUpLabel.text('正在载入')
                loadingStep = 1
                pullUpAction()
            }
        }
    })
    myScroll.on('scrollEnd', function() {
        if (loadingStep === 1) {
            if (pullDown.attr('class').match('refresh')) {
                // 下拉刷新操作
                pullDown.removeClass('refresh').addClass('loading')
                pullDownLabel.text('正在刷新')
                loadingStep = 2
                pullDownAction()
            }
        }
    })

    function pullDownAction() {
        setTimeout(function() {
            var li, i
            for ((i = 0), (li = ''); i < 3; i++) {
                li +=
                    '<li>' + 'new Add ' + new Date().toLocaleString() + ' ！' + '</li>'
            }
            container.prepend(li)
            pullDown.attr('class', '').hide()
            myScroll.refresh()
            loadingStep = 0
            $('.pulldown-tips').show()
        }, 1000)
    }

    function pullUpAction() {
        setTimeout(function() {
            var li, i
            for ((i = 0), (li = ''); i < 3; i++) {
                li +=
                    '<li>' + 'new Add ' + new Date().toLocaleString() + ' ！' + '</li>'
            }
            container.append(li)
            pullUp.attr('class', '').hide()
            myScroll.refresh()
            loadingStep = 0
        }, 1000)
    }

    document.addEventListener(
        'touchmove',
        function(e) {
            e.preventDefault()
        },
        false
    )
}

/**
 * loading
 */
export function compvareLoading(data) {
    if (document.readyState === 'compvare') {
        data = false
    }
}

// show
function show() {
    $('.modal.index').show().animate({ left: 0 }, 400, 'swing')
    $('.modal.index .button').show().animate({ left: '100%' }, 400, 'swing')
}

/**
 * 区分拖曳和点击
 */

// pc端
export function trag(cell) {
    var a = $(cell)
    var flag = 0 // 标记是拖曳还是点击

    a.on({
        mousedown: function(e) {
            flag = 0

            // code...
        },
        mousemove: function(e) {
            flag = 1

            // code...
        },
        mouseup: function(e) {
            if (flag === 0) {
                // 点击
                a.off()
            } else if (flag === 1) {
                // 拖曳
                a.on('click', function() {
                    return false // 阻止默认行为
                })
            }

            // code...
        }
    })
}

import './jQuery.drag'

// 移动端
export function tragtouch(cell) {
    var isClick = true
    $(cell).on('touchstart', function(e) {
        isClick = true
    })
    $(cell).on('touchmove', function(e) {
        isClick = false
    })
    $(cell).on('touchend', function(e) {
        if (isClick === true) {
            // 触发点击事件
            $(this).css('opacity', '1')
            show()
        } else if (isClick === false) {
            // 触发拖曳事件
            $(cell).drag({
                before: function(e) {
                    // 拖动前
                    $(this).css('opacity', '1')
                },
                process: function(e) {
                    // 拖动中
                },
                end: function(e) {
                    // 拖动完
                    $(this).css('opacity', '.2')
                }
            })
        }
    })
}

// 判断是安卓还是ios
export function getModileType() {
    var u = navigator.userAgent
        // var app = navigator.appVersion
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1 // g
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
    if (isAndroid) {
        return 1
    }
    if (isIOS) {
        return 2
    }
}

/**
 * 设置title的方法
 * 避免了安卓和iOS的不兼容写法
 */
export function setTitle(title) {
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    if (isAndroid) {
        document.title = title
    } else if (isiOS) {
        var $body = $('body')
        document.title = title
        var $iframe = $('<iframe src="/favicon.ico"></iframe>')
        $iframe.on('load', function() {
            window.setTimeout(function() {
                $iframe.off('load').remove()
            }, 0)
        }).appendTo($body)
    }
}
/* 使用setTitle('123') */

/**
 * 字体转换
 */
/*eslint-disable */
///全角空格为12288，半角空格为32   
///其他字符半角(33-126)与全角(65281-65374)的对应关系是：均相差65248   
//半角转换为全角函数   
function ToDBC(txtstring) {
    var tmp = "";
    for (var i = 0; i < txtstring.length; i++) {
        if (txtstring.charCodeAt(i) == 32) {
            tmp = tmp + String.fromCharCode(12288);
        }
        if (txtstring.charCodeAt(i) < 127) {
            tmp = tmp + String.fromCharCode(txtstring.charCodeAt(i) + 65248);
        }
    }
    return tmp;
}
//全角转换为半角函数   
function ToCDB(str) {
    var tmp = "";
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 65248 && str.charCodeAt(i) < 65375) {
            tmp += String.fromCharCode(str.charCodeAt(i) - 65248);
        } else {
            tmp += String.fromCharCode(str.charCodeAt(i));
        }
    }
    return tmp
}
/*eslint-enable */