// Passive event listeners
jQuery.event.special.touchstart = {
  setup: function (_, ns, handle) {
    this.addEventListener("touchstart", handle, {
      passive: !ns.includes("noPreventDefault"),
    });
  },
};
jQuery.event.special.touchmove = {
  setup: function (_, ns, handle) {
    this.addEventListener("touchmove", handle, {
      passive: !ns.includes("noPreventDefault"),
    });
  },
};

// preloader
$(window).bind("load", function () {
 async function preLoader() {
    $("body").addClass("loaded");
    if ($("#initPreloader").length !== 0) {
      $("#initPreloader").addClass("loaded");
    }
  }
  setTimeout(function () {
    preLoader();
  }, 100);
});

// on ready state
(function ($) {
  "use strict";

  // counterUp
 async function counter() {
    var oTop;
    if ($(".jsCounter").length !== 0) {
      oTop = $(".jsCounter").offset().top - window.innerHeight;
    }
    if ($(window).scrollTop() > oTop) {
      $(".jsCounter").each(function () {
        var $this = $(this),
          countTo = $this.attr("data-count");
        $({
          countNum: $this.text(),
        }).animate(
          {
            countNum: countTo,
          },
          {
            duration: 500,
            easing: "swing",
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
            },
          }
        );
      });
    }
  }

  async function counterTwo() {
    var oTop;
    if ($(".jsCounter-2").length !== 0) {
      oTop = $(".jsCounter-2").offset().top - window.innerHeight;
    }
    if ($(window).scrollTop() > oTop) {
      $(".jsCounter-2").each(function () {
        var $this = $(this),
          countTo = $this.attr("data-count");
        $({
          countNum: $this.text(),
        }).animate(
          {
            countNum: countTo,
          },
          {
            duration: 500,
            easing: "swing",
            step:  function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
            },
          }
        );
      });
    }
  }

  // inCircle element
 async function inCircleInit() {
    if ($(window).width() > 575) {
      var oTop;
      if ($("#inCircle-element").length !== 0) {
        oTop = $("#inCircle-element").offset().top - window.innerHeight;
      }
      if ($(window).scrollTop() > oTop) {
        $("#inCircle-element").incircle({
          radius: "13.5em", //distance from center
          start: -150,
        });
      }
    }
  }

  $(window).on("scroll", function () {
    if ($(".jsCounter").length !== 0) {
      counter();
    }
    if ($(".jsCounter-2").length !== 0) {
      counterTwo();
    }
    inCircleInit();

    if ($(".scroll-to-top-btn").length !== 0) {
      // scroll to top
      var scrollToTop = $(".scroll-to-top-btn"),
        scroll = $(window).scrollTop();
      if (scroll >= 400) {
        scrollToTop.addClass("show");
      } else {
        scrollToTop.removeClass("show");
      }
    }
  });

  // aos scroll-animation Init
  AOS.init({
    duration: 100,
    once: true,
  });

  $(document).ready(function () {
    if ($(window).width() < 1199) {
      $(".navbar .dropdown-toggle").on("click", function (e) {
        $(this).siblings(".dropdown-menu, .dropdown-submenu").animate(
          {
            height: "toggle",
          },
          300
        );
      });
    }

    // disable accordion collapse toogle
    $(".disable-toogle").on("hide.bs.collapse", function (e) {
      e.preventDefault();
    });

    // popupFix init
  async function popupFix() {
      var vScrollWidth = window.innerWidth - $(document).width();
      function noBodyScroll() {
        $("body").css({
          "padding-right": vScrollWidth + "px",
          "overflow-y": "hidden",
        });
      }
      function doBodyScroll() {
        setTimeout(function () {
          $("body").css({
            "padding-right": 0,
            "overflow-y": "auto",
          });
        }, 300);
      }
      var navbarToggler = $(".navbar-toggler");
      $(navbarToggler).on("click", function () {
        if (navbarToggler.attr("aria-expanded") === "false") {
          noBodyScroll();
        }
        if (navbarToggler.attr("aria-expanded") === "true") {
          doBodyScroll();
        }
      });
    }
    popupFix();

    // horizontalAccordion init
   async function horizontalAccordion() {
      $(".horizontal-accordion-item").on("click", function () {
        $(this).addClass("active").siblings().removeClass("active");
      });
    }
    horizontalAccordion();

    // smoothScroll init
  async function smoothScroll() {
      $(".smooth-scroll").click(function (event) {
        if (
          location.pathname.replace(/^\//, "") ===
            this.pathname.replace(/^\//, "") &&
          location.hostname === this.hostname
        ) {
          var target = $(this.hash);
          target = target.length
            ? target
            : $("[name=" + this.hash.slice(1) + "]");
          if (target.length) {
            event.preventDefault();
            $("html, body").animate(
              {
                scrollTop: target.offset().top,
              },
              300,
              function () {
                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) {
                  return false;
                } else {
                  $target.attr("tabindex", "-1");
                  $target.focus();
                }
              }
            );
          }
        }
      });
    }
    smoothScroll();

    if ($(".pricing-check").length !== 0) {
      // pricing init
      function pricingInit() {
        var toggleSwitch = $(".pricing-check");
        var number = $(".data-count");
        $(toggleSwitch).change(function () {
          if ($(toggleSwitch).is(":checked")) {
            $(".data-count").each(function () {
              $(this).html($(this).data("count-annually"));
              $(this)
                .prop("Counter", 0)
                .animate(
                  {
                    Counter: $(this).text(),
                  },
                  {
                    duration: 250,
                    easing: "swing",
                    step: function (now) {
                      $(this).text(Math.ceil(now));
                    },
                  }
                );
            });
            $(".text-monthly").addClass("d-none").removeClass("d-inline");
            $(".text-annually").addClass("d-inline").removeClass("d-none");
          } else if ($(toggleSwitch).is(":not(:checked)")) {
            $(".data-count").each(function () {
              $(this).html($(this).data("count-monthly"));
              $(this)
                .prop("Counter", 0)
                .animate(
                  {
                    Counter: $(this).text(),
                  },
                  {
                    duration: 250,
                    easing: "swing",
                    step: function (now) {
                      $(this).text(Math.ceil(now));
                    },
                  }
                );
            });
            $(".text-monthly").addClass("d-inline").removeClass("d-none");
            $(".text-annually").addClass("d-none").removeClass("d-inline");
          }
        });
      }
      pricingInit();
    }

    // brandCarousel fix
    if ($(".brand-carousel").length !== 0) {
    async function brandCarousel() {
        $(".brand-carousel").slick({
          dots: false,
          arrows: false,
          infinite: true,
          speed: 7000,
          autoplay: true,
          slidesToShow: 5,
          autoplaySpeed: 0,
          cssEase: "linear",
          mobileFirst: true,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 5,
              },
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 5,
              },
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 0,
              settings: {
                slidesToShow: 2,
              },
            },
          ],
        });
      }
      brandCarousel();
    }

    // bannerHeadingSlider fix
    if ($(".banner-heading-slider").length !== 0) {
     async function bannerHeadingCarousel() {
        $(".banner-heading-slider").slick({
          dots: false,
          arrows: false,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          speed: 500,
          fade: true,
          cssEase: "linear",
        });
      }
      bannerHeadingCarousel();
    }

    // bannerGenomicsSlider fix
    if ($(".home-genomics-inner").length !== 0) {
     async function bannerHeadingCarousel() {
        $(".home-genomics-inner>div").slick({
          dots: false,
          arrows: false,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          speed: 300,
        });
      }
      bannerHeadingCarousel();
    }

    // testimonialsCarousel fix
    if ($(".testimonials-carousel").length !== 0) {
    async function testimonialsCarousel() {
        $(".testimonials-carousel").slick({
          dots: true,
          arrows: false,
          infinite: true,
          speed: 400,
          slidesToShow: 3,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 4000,
          responsive: [
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 767,
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        });
      }
      testimonialsCarousel();
    }

    // videoPopupInit
    if ($(".video-play-btn").length !== 0) {
     async function videoPopupInit() {
        var $videoSrc;
        $(".video-play-btn").click(function () {
          $videoSrc = $(this).data("src");
        });
        $("#videoModal").on("shown.bs.modal", function (e) {
          $("#showVideo").attr(
            "src",
            $videoSrc + "?autoplay=1;mute=1&amp;modestbranding=1&amp;showinfo=0"
          );
        });
        $("#videoModal").on("hide.bs.modal", function (e) {
          $("#showVideo").attr("src", $videoSrc);
        });
      }
      videoPopupInit();
    }

    // videoPopupInit
    if ($(".video-play-btn.video-play-btn1").length !== 0) {
     async function videoPopupInit() {
        var $videoSrc;
        $(".video-play-btn1").click(function () {
          $videoSrc = $(this).data("src");
        });
        $("#videoModal1").on("shown.bs.modal", function (e) {
          $("#showVideo1").attr(
            "src",
            $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0"
          );
        });
        $("#videoModal1").on("hide.bs.modal", function (e) {
          $("#showVideo1").attr("src", $videoSrc);
        });
      }
      videoPopupInit();
    }

    // masonryFilter init
    setTimeout(function () {
      var containerEl = document.querySelector("#masonry");
      if (containerEl) {
        var Shuffle = window.Shuffle;
        var myShuffle = new Shuffle(document.querySelector("#masonry"), {
          itemSelector: ".masonry-item",
          buffer: 1,
        });
        jQuery('input[name="shuffle-filter"]').on("change", function (evt) {
          var input = evt.currentTarget;
          if (input.checked) {
            myShuffle.filter(input.value);
          }
        });
      }
    }, 1000);
  });

  // Form validation Init
  if ($(".needs-validation").length !== 0) {
    (async function () {
      window.addEventListener(
        "load",
        function () {
          var forms = document.getElementsByClassName("needs-validation");
          var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener(
              "submit",
             async function (event) {
                if (form.checkValidity() === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
                form.classList.add("was-validated");
              },
              false
            );
          });
        },
        false
      );
    })();
  }
})(jQuery);

// integrated tools
(async function ($) {
  "use strict";
  $.fn.incircle = function (options) {
    var settings = $.extend(
      {
        color: "#556b2f",
        backgroundColor: "white",
        type: 1, //circle type - 1 whole, 0.5 half, 0.25 quarter
        radius: "14em", //distance from center
        start: 0, //shift start from 0
        top: "0",
        left: "0",
      },
      options
    );
    this.css({
      position: "relative",
      top: settings.top,
      left: settings.left,
      "list-style-type": "none",
      margin: 0,
    });
    var elements = this.children(":not(:first-child)");
    var numberOfElements =
      settings.type === 1 ? elements.length : elements.length - 1;
    var slice = (360 * settings.type) / numberOfElements;
    elements.each(function (i) {
      var $self = $(this),
        rotate = slice * i + settings.start,
        rotateReverse = rotate * -1;
      $self.css({
        position: "absolute",
        "-webkit-transition": "all 1s linear",
        "-moz-transition": "all 1s linear",
        transition: "all 1s linear",
      });
      $self.css({
        transform:
          "rotate(" +
          rotate +
          "deg) translate(" +
          settings.radius +
          ") rotate(" +
          rotateReverse +
          "deg)",
      });
    });
    return this;
  };

  // Prevent closing from click inside dropdown
  $(document).on("click", ".dropdown-menu", function (event) {
    event.stopPropagation();
  });

  // make it as accordion for smaller screens
  if ($(window).width() < 992) {
    $("a.dropdown-item").click(function (e) {
      e.preventDefault();
      e.stopPropagation();
      $(".submenu-item ul").css({ display: "none" });
      var i = $(this);
      setTimeout(function (i) {
        i.parent().find("ul").css({ display: "block" });
      }, 3000);
    });
  }

  $(".history-timeline .timeline-list-wrap ul li a").click(function () {
    $(".history-timeline .timeline-list-wrap ul li a").removeClass("active");
    $(this).addClass("active");
    var target = $(this).attr("data-id");
    $([document.documentElement, document.body]).animate(
      {
        scrollTop: $(target).offset().top - 140,
      },
      1000
    );
  });

  $("a[href='#scroll-top']").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500);
    return false;
  });

  var param = window.location.hash;
  if (param != "") {
    $("html, body").animate(
      {
        scrollTop: $(param).offset().top - 95,
      },
      2000
    );
    return false;
  }
})(jQuery);

var animation;

gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

gsap.set("#motionSVG", { scale: 0.7, autoAlpha: 1 });
gsap.set("#rocket", {transformOrigin: "50% 50%"});

animation = gsap.to("#motionSVG", {
  scrollTrigger: {
    trigger: "#motionPath",
    start: "top 0%",

    scrub: 1,
    markers:false,
    onUpdate: self => {
      gsap.to("#rocket", {rotation: () => self.direction === 1 ? 0 : -180, overwrite: 'auto'});
    }
  },
  duration: 20,
  ease: "none",
  immediateRender: true,
  motionPath: {
    path: "#motionPath",
    align: "#motionPath",
    alignOrigin: [0.5, 0.5],
    autoRotate: 90,
  }
});






(function(){var b=document.getElementsByClassName(".rocketClip"),h=document.querySelector(".rocketManSVG");document.querySelector(".shakeGroup");var e=document.querySelector(".star"),a=document.querySelector(".satellite"),c=document.querySelector(".astronaut"),k=document.querySelector(".starContainer");document.querySelector("#badgeLink");TweenMax.to(c,.05,{y:"+=4",repeat:-1,yoyo:!0});var d=new TimelineMax({repeat:-1});c=new TimelineMax({repeat:-1,paused:!1});d.timeScale(6).seek(100);(new TimelineMax({repeat:-1})).to(a,
  46,{rotation:360,transformOrigin:"50% 50%",ease:Linear.easeNone});TweenMax.staggerTo(".pulse",.8,{alpha:0,repeat:-1,ease:Power2.easeInOut,yoyo:!1},.1);TweenMax.staggerTo(".satellitePulse",.8,{alpha:0,repeat:-1,ease:Power2.easeInOut,yoyo:!1},.1);MorphSVGPlugin.convertToPath("#bubbble");TweenMax.set(b,{attr:{r:"-=5"}});for(a=0;a<b.length;a++){var f=b[a],g=new TimelineMax({repeat:-1});g.to(f,1,{attr:{r:"+=15"},ease:Linear.easeNone}).to(f,1,{attr:{r:"-=15"},ease:Linear.easeNone});d.add(g,a/4)}for(a=0;7>
  a;a++)b=document.querySelector("#speedLine"+a),d=new TimelineMax({repeat:-1,repeatDelay:Math.random()}),d.set(b,{drawSVG:!1}).to(b,.05,{drawSVG:"0% 30%",ease:Linear.easeNone}).to(b,.2,{drawSVG:"70% 100%",ease:Linear.easeNone}).to(b,.05,{drawSVG:"100% 100%",ease:Linear.easeNone}).set(b,{drawSVG:"-1% -1%"}),c.add(d,a/23);for(a=0;7>a;a++)c=e.cloneNode(!0),k.appendChild(c),b=(a+1)/2,TweenMax.fromTo(c,b,{x:600*Math.random(),y:-30,scale:3-b},{y:100*Math.random()+600,repeat:-1,repeatDelay:1,ease:Linear.easeNone});
  h.removeChild(e)})();

  gsap.timeline({
    scrollTrigger: {
      trigger: ".grid-container",
      start: "top top",
      end: () => innerHeight * 4,
      scrub: true,
      pin: ".grid",
      anticipatePin: 1
    }
  })
  .set(".gridBlock:not(.centerBlock)", {autoAlpha: 0})
  .to(".gridBlock:not(.centerBlock)", {duration: 0.1, autoAlpha: 1}, 0.001)
  .from(".gridLayer", {
    scale: 3.3333,
    ease: "none",
  });
  
  
  // Images to make it look better, not related to the effect
  const size = Math.max(innerWidth, innerHeight);
  gsap.set('.gridBlock', {backgroundImage: i => `url(https://picsum.photos/${size}/${size}?random=${i})`});
  
  const bigImg = new Image;    
  bigImg.addEventListener("load", function () {
    gsap.to(".centerPiece .gridBlock", {autoAlpha: 1, duration: 0.5});
  });
  
  bigImg.src = `https://picsum.photos/${size}/${size}?random=50`;








  gsap.defaults({ ease: "power4.out" });
  gsap.from(".image", { scale: 1.5, duration: 2, stagger: 0.25 });
  gsap.to(".image-overlay", { xPercent: 100, duration: 2, stagger: 0.25 });



  $(document).ready(function() {
    var s = skrollr.init();
  })
  






