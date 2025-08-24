`use strict`;
const isLocal = true;

// drawSVG https://gsap.com/community/forums/topic/39835-trim-paths-offset-clone-in-gsap/
// https://css-tricks.com/svg-line-animation-works/

console.log("hello from localsslider");

// ---------------------------------
//TABS ANIMATION
// create timeline with steps for each tab, then play each step on click

// Tabs
let tabContainer = $("[tabs='tabs-v']");

// Activate on scroll
$(tabContainer).each(function () {
    let items = $(this).find("[tabs='tabs-items'] > div");
    let content = $(this).find(".tab_text-overlay");
    let image = $(this).find(".tab_image");
    let heading = $(this).find(".tab_title");
    let headingVert = $(this).find(".tab_title-vertical");

    let prevIndex = -1;

    //RESETS
    gsap.defaults({ duration: 1.25, ease: "power2.out" });
    gsap.set(items, { width: "92px" });
    content.hide();
    gsap.set(content, { opacity: 0, yPercent: 5 });
    gsap.set(image, { opacity: 0 });
    gsap.set(heading, { opacity: 0 });

    function triggerTabs(index) {
        // CLOSE STATE
        if (prevIndex > -1) {
            content.eq(prevIndex).hide();

            let tl = gsap.timeline({ paused: true });

            tl.to(items.eq(prevIndex), { width: "92px" });
            tl.to(content.eq(prevIndex), { opacity: 0, yPercent: 5 }, 0);
            tl.to(heading.eq(prevIndex), { opacity: 0 }, 0);
            tl.to(image.eq(prevIndex), { opacity: 0 }, "0.1");
            tl.to(headingVert.eq(prevIndex), { opacity: 1 }, 0);

            tl.play();
        }
        // OPEN STATE
        content.eq(index).show();

        let tlMain = gsap.timeline({ paused: true });
        tlMain.to(items.eq(index), { width: "100%" });
        tlMain.to(heading.eq(index), { opacity: 1 }, "0.35");
        tlMain.to(image.eq(index), { opacity: 1 }, "0.45");
        tlMain.to(
            content.eq(index),
            { opacity: 1, yPercent: 0, duration: 0.5 },
            "<0.8"
        );
        tlMain.to(headingVert.eq(index), { opacity: 0 }, 0);

        tlMain.play();

        // track previous
        prevIndex = index;
    }

    //On scroll here? scroll trigger function onEnter
    //make a new timeline
    // function scrollToTabs() {
    //     let tlTabs = gsap.timeline({
    //         scrollTrigger: {
    //             // trigger: ".section_steps",
    //             trigger: tabContainer,
    //             start: "top center",
    //             ease: "none",
    //             onEnter: () => triggerTabs(0),
    //         },
    //     });
    // }
    // scrollToTabs();

    //SHOW FIRST TAB
    triggerTabs(0);

    items.each(function (index) {
        let itemIndex = index;
        $(this).on("click", function () {
            if (itemIndex !== prevIndex) triggerTabs(itemIndex);

            // items.removeClass("is-open");
            // $(this).addClass("is-open");
        });
    });
});

///-----------------------------------
//Sliders
jQuery(document).ready(function ($) {
    if ($(".section_quote").length) {
        $(".quote_img-wrap").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            // prevArrow: ".arrow_right.is-left",
            // nextArrow: ".arrow_right.is-right",
        });
        $(".quote_content-wrap").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            fade: true,
            // arrows: true,

            asNavFor: ".quote_img-wrap",
            prevArrow: $(".slider_arrow-left"),
            nextArrow: $(".slider_arrow-right"),
        });

        $(".quote_content-wrap").on(
            "afterChange",
            function (event, slick, currentSlide) {
                // $(".slick-slide").removeClass("fade-in");
                // $(".slick-current").addClass("fade-in");
            }
        );
    }
});
