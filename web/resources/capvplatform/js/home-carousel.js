$.fn.slider = function () {
    var timeout = 5000;
    var minPcSize = 992 - 10;
    var deviceIsPc = true;

    var timer = new Timer(menuRotator, timeout);
    var thisElt = $(this);
    var mainInnerElt = $("div.inner", thisElt);
    var carouselContainerElt = $("div.items-container", thisElt);
    var menuItems = $(".menu .item", $(this));

    var currentMenuItem = null;
    var rotatorCpt = 0;
    var lastCarouselElt = null;
    var lastMenuElt = null;

    var rotatorIsStarted = false;


    initMenus();

    initEvents();

    function menuRotator() {
//        console.log("---------menuRotator");
        if (rotatorCpt === menuItems.length) {
            rotatorCpt = 0;
        }

        currentMenuItem = $(".menu .item:nth(" + rotatorCpt + ")", thisElt);
        selectMenu(currentMenuItem);

        rotatorCpt++;

        timer.start();
    }

    function startRotator(index) {
//        console.log("start rotator");

        rotatorIsStarted = true;
        var firstMenu = $(".menu .item:nth(0)", thisElt);
        rotatorCpt = 1;


        if (index !== null && index !== undefined) {
            rotatorCpt = index + 1;
            firstMenu = $(".menu .item:nth(" + index + ")", thisElt);
        }

        selectMenu(firstMenu);

        timer.start();
    }

//    function restartRotator() {
//        stopRotator();
//        startRotator();
//    }

    function stopRotator() {
//        console.log("stop rotator");
        rotatorIsStarted = false;

//        timer.pause();
        timer.stop();
        $(".menu .item.active", thisElt).removeClass("active");
        if (lastMenuElt !== null) {
            lastMenuElt.unbind("mouseenter");
            lastMenuElt.unbind("mouseleave");
            lastMenuElt = null;
        }
        if (currentMenuItem !== null) {
            currentMenuItem.unbind("mouseenter");
            currentMenuItem.unbind("mouseleave");
            currentMenuItem = null;
        }
        if (lastCarouselElt !== null) {
            lastCarouselElt.hide();
            lastCarouselElt = null;
        }
        rotatorCpt = 0;
    }

    function selectMenu(currentMenuElt, context) {
        if (context === null || context === undefined) {
            context = "activeRotatorEvents";
        }

        console.log("context = " + context);

        var headerTitleElt = $("div.inner>header.title", thisElt);

//        console.log("bg-image");
//        console.log(currentMenuElt.data("bg-image"));
        headerTitleElt.css({
            "background-image": 'url("' + currentMenuElt.data("bg-image") + '")'
        });
        $("span.icon", headerTitleElt).css("background-color", currentMenuElt.data("bg-color"));
        $("span.icon img", headerTitleElt).attr("src", currentMenuElt.data("logo"));
        $("span.text", headerTitleElt).text(currentMenuElt.find("label").text());


        $(".menu .item.active", thisElt).removeClass("active");
        if (lastMenuElt !== null) {
            lastMenuElt.unbind("mouseenter");
            lastMenuElt.unbind("mouseleave");
        }
        currentMenuElt.addClass("active");
//        currentMenuElt.bind("hover", onCarouselHover);
        if (context === "activeRotatorEvents") {

            if (!carouselContainerElt.data("hover-inited")) {
                carouselContainerElt.hover(function (evt) {
                    onCarouselHover(evt);
                });
                carouselContainerElt.data("hover-inited", "true");
            }

            currentMenuElt.bind("mouseenter", function () {
//                console.log("mouseenter");
                timer.pause();
            });
            currentMenuElt.bind("mouseleave", function () {
//                console.log("mouseleave");
                if (timer.isPaused()) {
                    timer.resume();
                }
            });
        } else {
            carouselContainerElt.unbind();
             carouselContainerElt.data("hover-inited", "false");
        }

        lastMenuElt = currentMenuElt;

        showMenuCarousel(currentMenuElt);
    }

    function showMenuCarousel(menuElt) {
        if (lastCarouselElt !== null) {
            lastCarouselElt.hide();
        }
        lastCarouselElt = $("div.items-container #" + menuElt.data("carousel-id"), thisElt);
        lastCarouselElt.show();
    }

    function initMenus() {
//        console.log("initMenus");

        menuItems.each(function (index) {
            var elt = $(this);
            elt.data("index", index);

            var bgColor = elt.data("bg-color");
            var color = elt.data("text-color");
            var logo = elt.data("logo");

            elt.css({
                "background-image": 'url("' + logo + '")',
                "background-color": bgColor,
                "color": color
            });
            var carouselElt = $("div.items-container #" + elt.data("carousel-id"), thisElt);
            initCarousel(carouselElt, bgColor, color);
        });
    }

    function initCarousel(carouselElt, bgColor, color) {
        $(".carousel-control>span", carouselElt).css({
            "color": bgColor
        });
        $(".carousel-indicators li", carouselElt).css({
            "background-color": color
        });
        $(".carousel-indicators li", carouselElt).css({
            "border-color": bgColor
        });

        carouselElt.carousel({
            interval: 2000,
            hover: "pause",
            wrap: true
        });
    }

    function sizeVariationControl() {
        var windowSize = parseInt($(window).innerWidth());

        if (windowSize <= minPcSize - 1) {
            deviceIsPc = false;
//            console.log("width = " + windowSize + " <= minPcSize -1 " + (minPcSize - 1));
            if (thisElt.hasClass("pc")) {
                thisElt.removeClass("pc").addClass("tablet-phone");
            }
            if (rotatorIsStarted) {
//                console.log("rotator is started stop it");
                stopRotator();
            }
        } else {
            deviceIsPc = true;

            if (thisElt.hasClass("tablet-phone")) {
                thisElt.removeClass("tablet-phone").addClass("pc");
            }
//            console.log("width > 991");
            if (!rotatorIsStarted) {
//                console.log("rotator is not started start it");
                startRotator();
            }
        }
    }

    function initEvents() {
        sizeVariationControl();
        $(window).resize(function () {
//            console.log("onresize ");
//            console.log($(window).innerWidth());
            sizeVariationControl();
        });

//        div.main-carousel.tablet-phone div.inner.show-carousel>header.title>span.back-button

        //init hover-events on items-container
        carouselContainerElt.data("hover-inited", "false");

        $("header.title>span.back-button", mainInnerElt).click(function () {
            mainInnerElt.removeClass("show-carousel").addClass("show-menu");
        });

//        $("div.items-container", thisElt).hover(function (evt) {
//            onCarouselHover(evt);
//        });
        $("div.menu>.page>span.item", thisElt).click(function (evt) {
//            console.log("click on item");
            var menuElt = $(this);

            if (deviceIsPc) {
                stopRotator();
                startRotator(menuElt.data("index"));
            } else {
                mainInnerElt.removeClass("show-menu").addClass("show-carousel");
                selectMenu(menuElt, "without-rotator");
            }
        });

    }

    function onCarouselHover(evt) {
        console.log("hover");
        if (evt.type === "mouseenter") {
            timer.pause();
        } else if (evt.type === "mouseleave") {
            if (timer.isPaused()) {
                timer.resume();
            }
        }
    }

//    startRotator();

};
