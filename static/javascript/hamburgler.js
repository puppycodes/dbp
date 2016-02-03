// HAMBURGLERv2

function togglescroll () {
  $('html').on('touchstart', function(e){
    if ($('html').hasClass('noscroll')) {
      e.preventDefault();
    }
  });
}

$(document).ready(function () {
    togglescroll()
    $(".icon").click(function () {
        // $(".mobilenav").fadeToggle(300);
        $(".menu").toggleClass('mobile-open');
        $(".top-menu").toggleClass("top-animate");
        $("html").toggleClass("noscroll");
        $(".mid-menu").toggleClass("mid-animate");
        $(".bottom-menu").toggleClass("bottom-animate");
    });
});

// PUSH ESC KEY TO EXIT

$(document).keydown(function(e) {
    if (e.keyCode == 27) {
        $(".mobilenav").fadeOut(300);
        $(".top-menu").removeClass("top-animate");
        $("html").removeClass("noscroll");
        $(".mid-menu").removeClass("mid-animate");
        $(".bottom-menu").removeClass("bottom-animate");
    }
});
