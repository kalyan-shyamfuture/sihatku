
   jQuery(function($) {
   // Click Scroll Function
    $(".scroll").on('click', function(event) {
        event.preventDefault();
        $("html,body").animate({
            scrollTop: $(this.hash).offset().top
        }, 1000);
    });


    $("body").append("<a href='#' class='back-top'><i class='fa fa-angle-up'></i></a>");
    var amountScrolled = 700;
    var backBtn = $("a.back-top");
    $(window).on("scroll", function() {
        if ($(window).scrollTop() > amountScrolled) {
            backBtn.addClass("back-top-visible");
        } else {
            backBtn.removeClass("back-top-visible");
        }
    });
    backBtn.on("click", function() {
        $("html, body").animate({
            scrollTop: 0
        }, 700);
        return false;
    });
});