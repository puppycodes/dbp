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


  // Loading Images, Masonry
  var masonry_container = $(".grid");
  var masonry_items = masonry_container.find('.grid-item');
  var index = 0;
  var increment = 15;
  var max = masonry_items.length;

  // swap out src on all but first 15 images
  load_images();
  function load_images() {

    var end = (index + increment > max) ? max : index + increment;
    var new_slice = masonry_items.slice(index, index + increment);
    new_slice.each(function() {
      $(this).addClass('loading');
      var img = $(this).find('.image-item');
      var src = img.attr('lazy-src');
      img.attr('src', src).attr('lazy-src', '');
    });

    var loaded = masonry_container.imagesLoaded({
      background: true
    }, function() {
      masonry_container.masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        transitionDuration: 0,
      })
      new_slice.addClass('visible');
      masonry_container.removeClass('init');
      console.log('loaded', index, 'through', end, 'of', max, 'moving on..');
      index = index + increment;
      if (end < max) {
        load_images();
      } else {
        masonry_container.addClass('loaded');
      }
    })
  }




  // var $grid = $('.grid').imagesLoaded({
  //   background: true
  // }, function () {
  //   $grid.masonry({
  //     itemSelector: '.grid-item',
  //     columnWidth: '.grid-sizer',
  //     percentPosition: true
  //   });
  // });


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


// Menu stuff

$(document).ready(function() {
  // calculate immediately
  ul_heights();
})

$(window).load(function() {
  // recalculate again after fonts have loaded
  ul_heights();
  $(".menu").addClass('loaded');
})

$(window).resize(function() {
  ul_heights();
})

function ul_heights() {
  $('.menu').addClass('init');
  $(".expand").each(function(){
    var submenu = $(this).find('.submenu');
    submenu.attr('data-open-height', submenu.outerHeight());
  })
  $('.menu').removeClass('init');

  $('.expand .submenu-title').unbind('click');
  $('.expand .submenu-title').click(function() {
    var menu = $(this).parent();
    var submenu = menu.find('.submenu');
    console.log(submenu);
    var sub_height = submenu.attr('data-open-height') + "px";
    console.log(submenu, sub_height);
    if (menu.hasClass('open') || menu.hasClass('hard-open')) {
      menu.removeClass('open hard-open');
      submenu.css('height', 0);
    } else {
      menu.siblings('.expand').removeClass('open').find('.submenu').css('height', 0);
      menu.addClass('open');
      submenu.addClass('test').css('height', sub_height);
    }
  })
}
