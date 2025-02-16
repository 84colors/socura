`use strict`;
// const isLocal = true;

// drawSVG https://gsap.com/community/forums/topic/39835-trim-paths-offset-clone-in-gsap/
// https://css-tricks.com/svg-line-animation-works/

console.log("hello from localse");

// $("body").style();

// -------------------
// NAV HOVER EFFECTS
// -------------------

// TABS WITH IMAGES
// -------------------
// [tabs='tabs-container'] on main section to separate from other instances
// [tabs='tabs-images'] on images container, with imgs as direct child. Img gets opacity 0 by default and opacity 100% on 'is-active' class
// [tabs='tabs-items'] on container of all items, usually a flex, with item as direct child
// [tabs='tabs-item-content'] on container of text to be hidden, gets 0 height by default and height auto on 'is-active' class
// -------------------

//Change source to local to test renders
// ---- REMOVE FROM PROD ----
const useLocalImgs = function () {
    let headerImgs = $(".header5_background-media");
    let tabContainer = $("[tabs='tabs-container']");

    headerImgs.attr("src", "http://127.0.0.1:5500/0001.webm");
    headerImgs.attr("srcset", "");

    tabContainer.each(function () {
        let tabImg = $(this).find($("[tabs='tabs-images'] > img"));
        tabImg.eq(0).attr("src", "http://127.0.0.1:5500/Renders/test01.png");
        tabImg.eq(0).attr("srcset", "");
    });
};

// useLocalImgs();

// FAQ TOGGLES
// -------------------
// [faq='faq-container'] on container of all items, usually a flex, with item as direct child
// [faq='faq-item-content'] on container of text to be hidden, gets 0 height by default and height auto on 'is-active' class
// [faq='faq-item-img'] on icon that spins
// -------------------
let faqContainer = $("[faq='faq-container']");

faqContainer.each(function () {
    let faqItem = $(this).find($("[faq='faq-container'] > div"));

    // add a timeline for each tab item and pass index
    faqItem.each(function () {
        let faqContent = $(this).find("[faq='faq-item-content']");
        let faqContentImg = $(this).find("[faq='faq-item-img']");
        //on click active class to clicked tab and play timeline
        $(this).on("click", function () {
            faqItem.removeClass("is-active");
            faqItem
                .find($("[faq='faq-item-content']"))
                .removeClass("is-active");
            faqItem.find($("[faq='faq-item-img']")).removeClass("is-active");
            $(this).toggleClass("is-active");
            faqContentImg.toggleClass("is-active");
            faqContent.toggleClass("is-active");
        });
    });
});

// ---------------------------------
// GSAP
// ---------------------------------
gsap.registerPlugin(ScrollTrigger);

// ---------------------------------
//PAGE LOAD ANIMATIONS
// bg moves left as eagle mask zooms in
// text appears from opacity, then button same
// ---------------------------------

// $(`.cases-base_header-image`).css({
//     mask: "url(https://cdn.prod.website-files.com/6746fd833eeceb77c17d0c5d/67653aedcd2dd6bb843d036e_birdie.svg)",
//     maskPosition: "center -900px",
//     maskSize: "2000px 2000px",
//     maskRepeat: "no-repeat",
// });

// ---------------------------------
//Home page

function pageLoad() {
    const loadTL = gsap.timeline({ paused: true, ease: "power1.out" });

    const heading = $(".header-home_header");
    const btnHeading = $(".header-inner_button-group");
    const eagleVid = $(".header_video-wrapper");

    // eagleVid.css({
    //     mask: "url(https://cdn.prod.website-files.com/6746fd833eeceb77c17d0c5d/67653aedcd2dd6bb843d036e_birdie.svg)",
    //     maskPosition: "center -900px",
    //     maskSize: "2000px 2000px",
    //     maskRepeat: "no-repeat",
    // });

    loadTL.fromTo(
        eagleVid,
        {
            maskSize: "1000px 1000px",
            maskPosition: "center -285px",
            duration: 3,
        },
        {
            maskSize: "2300px 2300px",
            maskPosition: "center -1055px",
            duration: 3,
        },
        "<0.5"
    );
    loadTL.to(heading, { y: 0, opacity: 1, duration: 1 }, "<0.5");
    loadTL.to(btnHeading, { y: 0, opacity: 1, duration: 1 }, "<0.75");

    loadTL.play();
}

//Check if on home page
if ($(".header-home_header").length) {
    pageLoad();
}

// ---------------------------------
//Page load video play for inner with video

function videoLoad() {
    const loadVideoTL = gsap.timeline({ paused: true, ease: "power1.out" });

    const heading = $(".header3d_heading");
    const subheading = $(".header3d_text");
    const btnHeading = $(".header3d_button-group");
    const headerVideo = $(".section_header-3d").find("video")[0];

    headerVideo.pause();

    loadVideoTL.to(heading, { y: 0, opacity: 1, duration: 1 }, "<0.5");
    loadVideoTL.to(subheading, { y: 0, opacity: 1, duration: 1 }, "<0.25");
    loadVideoTL.to(btnHeading, { y: 0, opacity: 1, duration: 1 }, "<0.25");

    headerVideo.play();
    loadVideoTL.play();
}
//Check if on video page and local is not set
if ($(".header1_video-wrapper").length) {
    const videoInnerSrc = $(".video_code-embed").attr("data-src");
    // const videoInnerSrc = $(".steps-link_video").attr("data-src");
    $(".video_code-embed video").attr("src", videoInnerSrc);
    videoLoad();
}

// ---------------------
//Page load eagle for inner with full video

function pageInnerLoad() {
    const loadInnerTL = gsap.timeline({ paused: true, ease: "power1.out" });

    const heading = $(".header-inner_header");
    const btnHeading = $(".header-inner_button-group");
    const eagleInner = $(".header-inner_video-wrapper");

    // eagleInner.css({
    //     mask: "url(https://cdn.prod.website-files.com/6746fd833eeceb77c17d0c5d/67653aedcd2dd6bb843d036e_birdie.svg)",
    //     maskPosition: "center -1380px",
    //     maskSize: "3000px 3000px",
    //     maskRepeat: "no-repeat",
    // });

    loadInnerTL.fromTo(
        eagleInner,
        {
            maskSize: "1000px 1000px",
            maskPosition: "center -293px",
        },
        {
            maskSize: "3000px 3000px",
            maskPosition: "center -1380px",
            duration: 3,
        },
        "<0.5"
    );
    loadInnerTL.to(heading, { y: 0, opacity: 1, duration: 1 }, "<0.5");
    loadInnerTL.to(btnHeading, { y: 0, opacity: 1, duration: 1 }, "<0.75");

    loadInnerTL.play();
}

//Check if on video page and local is not set
if ($(".header-inner_header").length) {
    // const videoInnerSrc = $(".video_code-embed").attr("data-src");
    // $(".video_code-embed video").attr("src", videoInnerSrc);
    pageInnerLoad();
}

// ---------------------------------
// LINE ANIMATIONS
// when ScrollTrigger, animate clipPath on .is-top element
// ---------------------------------

function maskLine() {
    let lines = $(".grad_line");
    lines.each(function (line) {
        let lineTop = $(this).find(".is-top");
        // console.log(lineTop);
        let clip_polygonTL = gsap.timeline({
            scrollTrigger: {
                trigger: lineTop,
                // start: "top center",
                start: "top center+=225px",
                end: "top center-=225px",
                // markers: true,
                // ease: "none",
                // scrub: true,
                scrub: 0.5,
            },
        });

        clip_polygonTL.fromTo(
            lineTop,
            {
                clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            },
            {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
            }
        );
    });
} //line
maskLine();

// ---------------------------------
//STATS Animation
// when in view roll numbers from 0 and animate the bar up height percentage, stagger

const statsAnimate = function () {
    let stats = $(".stats_list");
    let statItem = $(".stats_item");
    let statNumbers = $(".stats_number");
    let statBar = $(".stats_bar");

    let statsTL = gsap.timeline({
        scrollTrigger: {
            trigger: stats,
            start: "top bottom-=200px",
            // markers: true,
        },
    });

    statsTL.from(statNumbers, {
        textContent: 0,
        duration: 2,
        ease: "power1.in",
        snap: { textContent: 1 },
    });
    statsTL.from(
        statBar,
        {
            height: 0,
            duration: 2,
            stagger: {
                each: 0.2,
            },
        },
        0
    );
};

statsAnimate();

// ---------------------------------
//TIMELINE Animation
// when in view roll numbers from 0 and animate the bar up height percentage, stagger

$(".timeline1_row").each(function (index) {
    let triggerEl = $(this).find(".timeline1_heading-wrap");
    let timelineItemText = $(this).find(".timeline01_rich-text");
    let timelineItemNumber = $(this).find(".steps_row-number");

    let timelineTL = gsap.timeline({
        scrollTrigger: {
            trigger: triggerEl,
            start: "top 50%",
            end: "bottom 30%",
            // markers: "true",
            toggleActions: "restart none none reverse",
            // onStart: ScrollTrigger.refresh(),
            onEnter: function () {
                console.log("play");
                ScrollTrigger.refresh();
            },
            onLeave: function () {
                console.log("finish");
                // timelineTL.reverse();
            },
        },
    });
    timelineTL.from(timelineItemText, { opacity: 0 });
    timelineTL.from(timelineItemText, { height: 0 }, 0);
});

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

// ---------------------------------
//VIDEO CTA animation
// play video on scroll trigger, then fade in text
if ($(".section_cta-sm").length) {
    const videoCTA = $(".section_cta-sm").find("video")[0];
    videoCTA.pause();

    //Intro Video play
    function ctaVideo() {
        let tlVideo = gsap.timeline({
            scrollTrigger: {
                trigger: ".section_cta-sm",
                start: "top 80%",
                // markers: "true",
                ease: "none",
                onEnter: () => videoCTA.play(),
                onEnterBack: () => videoCTA.play(),
                onLeave: () => videoCTA.pause(),
                onLeaveBack: () => videoCTA.pause(),
            },
        });
    }
    ctaVideo();
}

//Eagle video play
if ($(".eagle_background-video-wrapper").length) {
    const videoEagleAbout = $(".eagle_background-video-wrapper").find(
        "video"
    )[0];
    videoEagleAbout.pause();
    //Intro Video play
    function videoEaglePlay() {
        let tlVideo = gsap.timeline({
            scrollTrigger: {
                trigger: ".section_eagle",
                start: "top 80%",
                // markers: "true",
                ease: "none",
                onEnter: () => videoEagleAbout.play(),
                onEnterBack: () => videoEagleAbout.play(),
                onLeave: () => videoEagleAbout.pause(),
                onLeaveBack: () => videoEagleAbout.pause(),
            },
        });
    }
    videoEaglePlay();
}

//Sliders

jQuery(document).ready(function ($) {
    if ($(".usecases_slides-wrap").length) {
        var usesSlick = $(".usecases_slides-wrap");
        var usesStatus = $(".slider_numbers");
        //Cases sliders
        usesSlick.slick({
            infinite: true,
            slidesToShow: 1,
            fade: true,
            dots: false,
            prevArrow: "[cases-arrow-prev]",
            nextArrow: "[cases-arrow-next]",
            // nextArrow: false,
            slidesToScroll: 1,
        });

        usesSlick.on(
            "init reInit afterChange",
            function (event, slick, currentSlide, nextSlide) {
                //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
                var i = (currentSlide ? currentSlide : 0) + 1;
                usesStatus.text("0" + i + "/" + "0" + slick.slideCount);
            }
        );
    }

    if ($(".blog-cards_component").length) {
        var blogSlick = $(".blog-cards_group");
        var blogStatus = $(".blog-cards_line-fill");
        //Blog sliders
        blogSlick.slick({
            // infinite: true,
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: false,
            prevArrow: "[blog-arrow-prev]",
            nextArrow: "[blog-arrow-next]",
        });

        blogStatus.css("width", (1 / slick.slideCount) * 100 + "%");

        blogSlick.on(
            "init reInit afterChange",
            function (event, slick, currentSlide, nextSlide) {
                //currentSlide is undefined on init -- set it to 0 in this case (currentSlide is 0 based)
                var i = (currentSlide ? currentSlide : 0) + 1;
                console.log(slick.slideCount - i);
                blogStatus.css("width", (i / slick.slideCount) * 100 + "%");
            }
        );
    }
});
