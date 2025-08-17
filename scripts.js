`use strict`;
const isLocal = true;

// drawSVG https://gsap.com/community/forums/topic/39835-trim-paths-offset-clone-in-gsap/
// https://css-tricks.com/svg-line-animation-works/

console.log("hello from localse");

// ---------------------------------
//TABS ANIMATION
// create timeline with steps for each tab, then play each step on click

// Tabs
let tabContainer = $("[tabs='tabs-container']");

// Activate on scroll
$(tabContainer).each(function () {
    let items = $(this).find("[tabs='tabs-items'] > div");
    let videos = $(this).find(".steps-link_video").hide();
    let content = $(this).find(".steps-link_details-hidden");
    let arrow = $(this).find(".steps-link_item-arrow");
    let heading = $(this).find(".steps-link_item-heading");
    let number = $(this).find(".steps_row-number");
    let border = $(this).find(".steps-link_item-border");

    let prevIndex = -1;

    gsap.defaults({ duration: 0.5, ease: "power2.out" });
    gsap.set(content, { height: 0 });

    function triggerTabs(index) {
        // close state
        if (prevIndex > -1) {
            videos.eq(prevIndex).hide();
            gsap.to(content.eq(prevIndex), { height: 0 });
            gsap.to(arrow.eq(prevIndex), { rotationZ: 0 }, 0);
            gsap.to(heading.eq(prevIndex), { color: "#fff" }, 0);
            gsap.to(
                number.eq(prevIndex),
                { color: "#88939f", borderColor: "#2d3a47" },
                0
            );
            gsap.to(border.eq(prevIndex), { width: 0 }, 0);
        }
        // open state
        videos.eq(index).show();
        gsap.to(content.eq(index), { height: "auto" });
        gsap.to(arrow.eq(index), { rotationZ: 90 }, 0);
        gsap.to(heading.eq(index), { color: "#54b6b1" }, 0);
        gsap.to(number.eq(index), { color: "#fff", borderColor: "#54b6b1" }, 0);
        gsap.to(border.eq(index), { width: "100%" }, "<0.1");
        videos.eq(index).find("video")[0].play();

        // console.log(videos.eq(index));

        // videos.eq(index).click();
        // track previous
        prevIndex = index;
    }

    //On scroll here? scroll trigger function onEnter
    //make a new timeline
    function scrollToTabs() {
        let tlTabs = gsap.timeline({
            scrollTrigger: {
                trigger: ".section_steps",
                start: "top 20%",
                // end: "bottom 50%",
                // markers: "true",
                ease: "none",
                onEnter: () => triggerTabs(0),
            },
        });
    }
    scrollToTabs();

    // triggerTabs(0);

    items.each(function (index) {
        let itemIndex = index;
        // let link = $(this).find(".tab_trigger");
        $(this).on("click", function () {
            if (itemIndex !== prevIndex) triggerTabs(itemIndex);
        });
    });
});

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
