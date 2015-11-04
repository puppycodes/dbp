$(function () {
  // $(".grid-item").each(function () {
  //   var imageUrl = $(this).css("background-image");
  //   imageUrl = imageUrl.split("url")[1];
  //   imageUrl = imageUrl.substring(1,imageUrl.length-1);
  //   var image = new Image();
  //   image.src = imageUrl;
  //   var width = image.width;
  //   var height = image.height;
  //   if (width >= height) {
  //     $(this).addClass("grid-item--landscape");
  //   } else {
  //     $(this).addClass("grid-item--portrait");
  //   }
  // });

  // var grid = $('')

  // setTimeout(function(){
  //   var $grid = $('.grid').masonry({
  //       itemSelector: '.grid-item',
  //       columnWidth: 0,
  //   });

  //   $grid.imagesLoaded().progress(function () {
  //       $grid.masonry();
  //   });
  // }, 100);


  var $grid = $('.grid').imagesLoaded({
    background: true
  }, function () {
    $grid.masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    });
  });


  var choco = $('.chocolat-parent').Chocolat().data('chocolat');
  var chocoEnabled = true;

  $(window).resize(function (event) {
    if (window.innerWidth <= 480) {
      choco.api().destroy();
      $('.chocolat-image').on('click', function (event) {
        event.preventDefault();
        return false;
      });
      chocoEnabled = false;
    } else if (!chocoEnabled) {
      chocoEnabled = true;
      $('.chocolat-image').off('click');
      choco = $('.chocolat-parent').Chocolat().data('chocolat');
    }
  });

  $(".nav-trigger").click(function () {
    $(".main-nav").fadeToggle(500);
    $(".top-menu").toggleClass("top-animate");
    $(".mid-menu").toggleClass("mid-animate");
    $(".bottom-menu").toggleClass("bottom-animate");
  });

  FastClick.attach(document.body);
}());