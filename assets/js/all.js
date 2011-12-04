function main() {
    var secs = $(".scroller section");
    $(".scroller").width(secs.first().width() * secs.size());
    //...........................................................
    bindBtnDown($("section.entry .btn"), function() {
        gotoSection($(this).parents("section").next());
    });
    //...........................................................
    $("section.ques li").click(function() {
        $(this).toggleClass("checked");
    });
    //...........................................................
    bindBtnDown($("section.ques .btn"), checkAnswer);
    //...........................................................
    bindBtnDown($("section.finished .btn"), function() {
        $("section.ques .checked").removeClass("checked");
        gotoSection($("section.ques").first());
    });
    //...........................................................
    $(document.body).delegate(".next_btn", "click", function() {
        gotoSection($(".current_section").next());
    });
}

function bindBtnDown(btn, func) {
    btn.mousedown(function() {
        $(this).addClass("btn_down");
    });
    btn.mouseup(function() {
        $(this).removeClass("btn_down");
    });
    btn.mouseout(function() {
        $(this).removeClass("btn_down");
    });
    btn.click(func);
}

function showDialog(className, msg) {
    $(document.body).children(".pop").remove();
    var html = '<div class="pop ' + className + '">';
    html += '    <div class="pop_body">';
    html += '        <div class="pop_msg">' + msg + '<a class="next_btn"></a></div>';
    html += '     </div>';
    html += '</div>';
    $(html).appendTo(document.body).show();
}

function checkAnswer() {
    var ids = [];
    var sec = $(this).parents("section");
    sec.find("li").each(function(index, ele) {
        if($(this).hasClass("checked"))
            ids.push(index + 1);
    });
    var ans = sec.attr("answer");
    // 正确
    if(ans == ids.join(",")) {
        showDialog("correct", "恭喜您，答对了");
    }
    // 错误
    else {
        showDialog("wrong", "对不起，您的答案有误。<br>正确答案为: " + sec.attr("msg"));
    }
}

function gotoSection(sec) {
    $(document.body).children(".pop").remove();
    $(".scroller").animate({
        left: sec.prevAll().size() * sec.outerWidth() * -1
    }, 240, function() {
        sec.parent().children("section").removeClass("current_section");
        sec.addClass("current_section");
    });
}

//
(function($) {
$(document.body).ready(main);
})(window.jQuery);
