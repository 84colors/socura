`use strict`;
// const isLocal = true;

// drawSVG https://gsap.com/community/forums/topic/39835-trim-paths-offset-clone-in-gsap/
// https://css-tricks.com/svg-line-animation-works/

console.log("hello from localsecoraxx");

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

    headerImgs.attr("src", "http://127.0.0.1:5500/Renders/header01.png");
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
//PAGE LOAD ANIMATION
// bg moves left as eagle mask zooms in
// text appears from opacity, then button same

function pageLoad() {
    const loadTL = gsap.timeline({ paused: true, ease: "power1.out" });

    const grad = $(".gradient_img");
    const heading = $(".header-home_header");
    const btnHeading = $(".header-inner_button-group");
    const eagleVid = $(".header_video-wrapper");

    eagleVid.css({
        mask: "url(https://cdn.prod.website-files.com/6746fd833eeceb77c17d0c5d/67653aedcd2dd6bb843d036e_birdie.svg)",
        maskPosition: "center -900px",
        maskSize: "2000px 2000px",
        maskRepeat: "no-repeat",
    });

    // console.log("hellooo");

    // loadTL.from(grad, { x: "-50%", duration: 1 });
    loadTL.from(
        eagleVid,
        {
            maskSize: "1000px 1000px",
            maskPosition: "center -300px",
            duration: 3,
        },
        "<0.5"
    );
    loadTL.from(heading, { y: 10, opacity: 0, duration: 1 }, "<0.5");
    loadTL.from(btnHeading, { y: 10, opacity: 0, duration: 1 }, "<0.75");

    loadTL.play();
}

pageLoad();

// ---------------------------------
// LINE ANIMATIONS
// when ScrollTrigger, animate clipPath on .is-top element

function maskLine() {
    let lines = $(".grad_line");
    lines.each(function (line) {
        let lineTop = $(this).find(".is-top");
        // console.log(lineTop);
        let clip_polygonTL = gsap.timeline({
            scrollTrigger: {
                trigger: lines,
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
//TABS ANIMATION
// create timeline with steps for each tab, then play each step on click

// Tabs
let tabContainer = $("[tabs='tabs-container']");
tabContainer.each(function () {
    let tabItem = $(this).find($("[tabs='tabs-items'] > div"));
    let tabImg = $(this).find($("[tabs='tabs-images'] > img"));

    //Activate first item
    tabItem.eq(0).addClass("is-active");
    tabItem.eq(0).find($("[tabs='tabs-item-content']")).addClass("is-active");
    tabImg.eq(0).addClass("is-active");
});

$(tabContainer).each(function () {
    let items = $(this).find("[tabs='tabs-items'] > div");
    let lotties = $(this).find(".steps-link_image").hide();
    let content = $(this).find(".steps-link_details-hidden");
    let arrow = $(this).find(".steps-link_item-arrow");
    let heading = $(this).find(".steps-link_item-heading");
    let number = $(this).find(".steps_row-number");
    let border = $(this).find(".steps-link_item-border");

    let prevIndex = -1;
    gsap.defaults({ duration: 0.5, ease: "power2.out" });
    gsap.set(content, { height: 0 });

    function triggerLottie(index) {
        // close state
        if (prevIndex > -1) {
            lotties.eq(prevIndex).hide();
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
        lotties.eq(index).show();
        gsap.to(content.eq(index), { height: "auto" });
        gsap.to(arrow.eq(index), { rotationZ: 90 }, 0);
        gsap.to(heading.eq(index), { color: "#54b6b1" }, 0);
        gsap.to(number.eq(index), { color: "#fff", borderColor: "#54b6b1" }, 0);
        gsap.to(border.eq(index), { width: "100%" }, "<0.1");

        lotties.eq(index).click();
        // track previous
        prevIndex = index;
    }
    triggerLottie(0);

    items.each(function (index) {
        let itemIndex = index;
        let link = $(this).find(".tab_trigger");
        $(this).on("click", function () {
            if (itemIndex !== prevIndex) triggerLottie(itemIndex);
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
// $(".section_cases").hide();
let casesSliders = $(".section_cases");

const sliderDiv = $(casesSliders).find(".usecases_slides-wrap")[0];

// console.log(sliderDiv);

const swiper = new Swiper(".usecases_slides-wrap", {
    // Optional parameters
    direction: "vertical",
    loop: true,

    // If we need pagination
    pagination: {
        el: ".swiper-pagination",
    },

    // Navigation arrows
    navigation: {
        nextEl: "[arrow-next]",
        prevEl: "[arrow-prev]",
    },

    // And if we need scrollbar
    scrollbar: {
        el: ".swiper-scrollbar",
    },
});

// $(".section_cases").each(function () {
//     // console.log("foundx");
//     const sliderDiv = $(this).find(".usecases_slides-wrap")[0];
//     const swiper = new Swiper(sliderDiv, {
//         slidesPerView: 1,
//         speed: 700,
//         // centeredSlides: true,
//         initialSlide: 1,
//         loop: true,
//         // spaceBetween: 40,
//         pagination: {
//             el: $(this).find("[slider-num]")[0],
//             type: "fraction",
//         },
//         navigation: {
//             nextEl: $(this).find("[arrow-next]")[0],
//             prevEl: $(this).find("[arrow-prev]")[0],
//             disabledClass: "is-disabled",
//         },
//         slideActiveClass: "is-active",
//         slideDuplicateActiveClass: "is-active",
//     });
// });
