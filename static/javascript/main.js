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


// click to forward //
  var instance = $('.chocolat-parent').Chocolat().data('chocolat');
    $('body').on('click', '.chocolat-img', function() { instance.api().next(); });

// images loaded //

  var $grid = $('.grid').imagesLoaded({
    background: true
  }, function () {
    $grid.masonry({
      itemSelector: '.grid-item',
      columnWidth: '.grid-sizer',
      percentPosition: true
    });
  });


  var choco = null;
  var chocoEnabled = null;

  function chocoTime () {
    if (window.innerWidth <= 768) {
      $('.chocolat-image').on('click', function (event) {
        event.preventDefault();
        return false;
      });

      if (chocoEnabled) {
        choco.api().destroy();
        chocoEnabled = false;
      }
    } else if (chocoEnabled === false) {
      $('.chocolat-image').off('click');
      choco = $('.chocolat-parent').Chocolat().data('chocolat');
      chocoEnabled = true;
    }

    if (window.innerWidth > 768 && choco === null) {
      choco = $('.chocolat-parent').Chocolat().data('chocolat');
      chocoEnabled = true;
    }
  }

  chocoTime();

  $(window).resize(function (event) {
    chocoTime();
  });

  $(".nav-trigger").click(function () {
    $(".main-nav").fadeToggle(500);
    $(".top-menu").toggleClass("top-animate");
    $(".mid-menu").toggleClass("mid-animate");
    $(".bottom-menu").toggleClass("bottom-animate");
  });

  FastClick.attach(document.body);
}());
