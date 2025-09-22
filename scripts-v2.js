`use strict`;
// const isLocal = true;

// drawSVG https://gsap.com/community/forums/topic/39835-trim-paths-offset-clone-in-gsap/
// https://css-tricks.com/svg-line-animation-works/

console.log("hello from stack");

//-----
// CHECK IF MOBILE VIEW
const mm = gsap.matchMedia();
// let mm = gsap.matchMedia();

// mm.add("(max-width: 1100px)", () => {
//     console.log("mobile");
// });
// mm.add("(min-width: 1101px)", () => {
//     console.log("desktop");
// });

// ---------------------------------
//TABS ANIMATION
// create timeline with steps for each tab, then play each step on click

// Tabs
let tabContainer = $("[tabs='tabs-v']");
let tabContainerImg = $("[tabs='tabs-img']");
let tabContainerStack = $("[tabs='tabs-stack']");
let tabToggle = $("[tabs='tabs-toggle']");
let tabContact = $("[tabs='tabs-contact']");

// Tabs horizontal
$(tabContainer).each(function () {
    let items = $(this).find("[tabs='tabs-items'] > div");
    let content = $(this).find(".tab_text-overlay");
    let image = $(this).find(".tab_image");
    let heading = $(this).find(".tab_title");
    let headingVert = $(this).find(".tab_title-vertical");

    let prevIndex = -1;

    //RESETS
    gsap.defaults({ duration: 1.25, ease: "power2.out" });
    //Mobile if/else
    // gsap.set(items, { width: "92px" });
    mm.add("(max-width: 1100px)", () => {
        gsap.set(items, { height: "92px" });
        gsap.set(items, { width: "100%" });
        gsap.to(headingVert, { opacity: 0 }, 0);
        gsap.to(heading, { opacity: 1 }, 0);
    });
    mm.add("(min-width: 1101px)", () => {
        gsap.set(items, { height: "600px" });
        gsap.set(items, { width: "92px" });
    });

    content.hide();
    gsap.set(content, { opacity: 0, yPercent: 5 });
    gsap.set(image, { opacity: 0 });
    // gsap.set(heading, { opacity: 0 });

    function triggerTabs(index) {
        // let mm = gsap.matchMedia();

        // CLOSE STATE
        if (prevIndex > -1) {
            content.eq(prevIndex).hide();

            let tl = gsap.timeline({ paused: true });

            //mobile if/else

            mm.add("(max-width: 1100px)", () => {
                tl.to(items.eq(prevIndex), { height: "72px" });
                tl.to(items.eq(prevIndex), { width: "100%" });
            });
            mm.add("(min-width: 1101px)", () => {
                tl.to(items.eq(prevIndex), { width: "92px" });
                tl.to(heading.eq(prevIndex), { opacity: 0 }, 0);
                tl.to(headingVert.eq(prevIndex), { opacity: 1 }, 0);
            });
            // tl.to(items.eq(prevIndex), { width: "92px" });

            tl.to(content.eq(prevIndex), { opacity: 0, yPercent: 5 }, 0);
            tl.to(image.eq(prevIndex), { opacity: 0 }, "0.1");
            tl.play();
        }
        // OPEN STATE
        content.eq(index).show();

        let tlMain = gsap.timeline({ paused: true });
        mm.add("(max-width: 1100px)", () => {
            // tlMain.to(items.eq(index), { height: "540px" });
            tlMain.to(items.eq(index), { height: "auto" });
            // tlMain.to(content.eq(index), { height: "520px" }, 0);
            tlMain.to(content.eq(index), { height: "auto" }, 0);
            tlMain.to(headingVert.eq(index), { opacity: 0 }, 0);
            tlMain.to(heading.eq(index), { opacity: 1 }, 0);
        });
        mm.add("(min-width: 1101px)", () => {
            tlMain.to(items.eq(index), { width: "100%" });
            tlMain.to(content.eq(index), { height: "580px" }, 0);
            tlMain.to(headingVert.eq(index), { opacity: 0 }, 0);
            tlMain.to(heading.eq(index), { opacity: 1 }, "0.35");
        });
        tlMain.to(items.eq(index), { width: "100%" });
        tlMain.to(image.eq(index), { opacity: 1 }, "0.45");
        tlMain.to(
            content.eq(index),
            { opacity: 1, yPercent: 0, duration: 0.5 },
            "<0.8"
        );

        tlMain.play();

        // track previous
        prevIndex = index;
    }

    //On scroll here? scroll trigger function onEnter
    //SHOW FIRST TAB
    triggerTabs(0);

    items.each(function (index) {
        let itemIndex = index;
        $(this).on("click", function () {
            if (itemIndex !== prevIndex) triggerTabs(itemIndex);
        });
    });
});

// Tabs IMG
$(tabContainerImg).each(function () {
    let items = $(this).find("[tabs='tabs-items'] > div");
    let content = $(this).find(".tab_text-overlay-grid");
    let image = $(this).find(".tab_image-sq");
    let heading = $(this).find(".tab_title");
    let headingVert = $(this).find(".tab_title-vertical");

    let prevIndex = -1;

    //RESETS
    gsap.defaults({ duration: 1.25, ease: "power2.out" });
    // gsap.set(items, { width: "92px" });
    content.hide();
    gsap.set(content, { opacity: 0, yPercent: 5 });
    gsap.set(image, { opacity: 0 });
    gsap.set(heading, { opacity: 0 });

    mm.add("(max-width: 1100px)", () => {
        gsap.set(items, { height: "72px" });
        gsap.set(items, { width: "100%" });
        gsap.to(headingVert, { opacity: 0 }, 0);
        gsap.to(heading, { opacity: 1 }, 0);
    });
    mm.add("(min-width: 1101px)", () => {
        gsap.set(items, { height: "600px" });
        gsap.set(items, { width: "92px" });
        gsap.set(heading, { opacity: 0 });
    });

    function triggerTabs(index) {
        let headerEl = items.get(index);
        let headerTop = headerEl.getBoundingClientRect().top + window.scrollY;

        // CLOSE STATE
        if (prevIndex > -1) {
            content.eq(prevIndex).hide();

            let tl = gsap.timeline({ paused: true });
            mm.add("(max-width: 1100px)", () => {
                tl.to(items.eq(prevIndex), { height: "72px" });
                tl.to(items.eq(prevIndex), { width: "100%" });
                tl.to(heading.eq(prevIndex), { opacity: 1 }, 0);
            });
            mm.add("(min-width: 1101px)", () => {
                tl.to(items.eq(prevIndex), { width: "92px" });
                tl.to(heading.eq(prevIndex), { opacity: 0 }, 0);
                tl.to(headingVert.eq(prevIndex), { opacity: 1 }, 0);
            });
            // tl.to(items.eq(prevIndex), { width: "92px" });
            tl.to(content.eq(prevIndex), { opacity: 0, yPercent: 5 }, 0);
            // tl.to(heading.eq(prevIndex), { opacity: 0 }, 0);
            tl.to(image.eq(prevIndex), { opacity: 0 }, "0.1");
            tl.to(headingVert.eq(prevIndex), { opacity: 1, duration: 0.1 }, 0);

            tl.play();
        }
        // OPEN STATE
        content.eq(index).show();

        let tlMain = gsap.timeline({ paused: true });

        mm.add("(max-width: 1100px)", () => {
            tlMain.to(items.eq(index), {
                height: "auto",
                onUpdate: () => {
                    // Keep header anchored at same spot during expansion
                    // window.scrollTo({
                    //     top: headerTop,
                    //     behavior: "instant",
                    // });
                },
            });
            tlMain.to(content.eq(index), { height: "auto" }, 0);
            // tlMain.to(items.eq(index), { height: "540px" });
            // tlMain.to(content.eq(index), { height: "520px" }, 0);
            tlMain.to(headingVert.eq(index), { opacity: 0 }, 0);
            tlMain.to(heading.eq(index), { opacity: 1 }, 0);
            tlMain.to(image.eq(index), { opacity: 1, height: "260px" }, "0.45");
        });
        mm.add("(min-width: 1101px)", () => {
            tlMain.to(items.eq(index), { width: "100%" });
            tlMain.to(content.eq(index), { height: "580px" }, 0);
            tlMain.to(headingVert.eq(index), { opacity: 0 }, 0);
            tlMain.to(heading.eq(index), { opacity: 1 }, "0.35");
            tlMain.to(image.eq(index), { opacity: 1, height: "580px" }, "0.45");
        });

        // tlMain.to(items.eq(index), { width: "100%" });
        tlMain.to(heading.eq(index), { opacity: 1 }, "0.35");
        tlMain.to(
            content.eq(index),
            { opacity: 1, yPercent: 0, duration: 0.5 },
            "<0.5"
        );
        tlMain.to(headingVert.eq(index), { opacity: 0 }, 0);

        tlMain.play();

        // track previous
        prevIndex = index;
    }

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

// -------
// Tabs STACKED
$(tabContainerStack).each(function () {
    let items = $(this).find("[tabs='tabs-items'] > div");
    let heading = $(this).find(".stat_box-cream-title");
    let tabBg = "rgba(3, 189, 196, 1)";
    let scale = "1.2";
    let padding = "24px";

    if ($(items[0]).hasClass("stats_box-cream")) {
        // heading = $(this).find(".stat_box-cream-title");
        tabBg = "#f1ead8";
        scale = "2";

        padding = "48px";

        console.log("cream!");
        console.log(items[0]);
    } else {
        console.log("blue!");
    }

    // let heading = $(this).find(".stat_box-title");

    let prevIndex = -1;

    //RESETS
    gsap.defaults({ duration: 0.75, ease: "power2.out" });
    gsap.set(items, {
        height: "70px",
        backgroundColor: "rgba(3, 189, 196, 0)",
        borderRightColor: "#016672",
        color: "#ffffff",
        paddingTop: "24px",
        paddingLeft: "24px",
        paddingRight: "24px",
    });
    gsap.set(heading, { scale: 1 });

    function triggerTabs(index) {
        // CLOSE STATE
        if (prevIndex > -1) {
            let tl = gsap.timeline({ paused: true });

            tl.to(items.eq(prevIndex), {
                height: "70px",
                backgroundColor: "rgba(3, 189, 196, 0)",
                borderRightColor: "#016672",
                paddingTop: "24px",
                paddingLeft: "24px",
                paddingRight: "24px",
            });
            tl.to(heading.eq(prevIndex), { scale: 1, duration: 0.3 }, 0);
            tl.to(items.eq(prevIndex), { color: "#ffffff", duration: 0.3 }, 0);

            tl.play();
        }
        // OPEN STATE
        let tlMain = gsap.timeline({ paused: true });

        mm.add("(max-width: 1100px)", () => {
            tlMain.to(items.eq(index), {
                height: "400px",
                backgroundColor: tabBg,
                borderRightColor: "#00414f",
                paddingTop: "32px",
                paddingLeft: "24px",
                paddingRight: "24px",
            });
            tlMain.to(heading.eq(index), { scale: 1.3, duration: 0.3 }, 0);
        });
        mm.add("(min-width: 1101px)", () => {
            tlMain.to(items.eq(index), {
                height: "400px",
                backgroundColor: tabBg,
                borderRightColor: "#00414f",
                paddingTop: padding,
                paddingLeft: padding,
                paddingRight: padding,
            });
            tlMain.to(
                heading.eq(index),
                { scale: scale, paddingBottom: "32px", duration: 0.3 },
                0
            );
        });
        tlMain.to(items.eq(index), { color: "#00414f", duration: 0.2 }, 0);

        tlMain.play();

        // track previous
        prevIndex = index;
    }

    //SHOW FIRST TAB
    triggerTabs(0);

    items.each(function (index) {
        let itemIndex = index;
        $(this).on("click", function () {
            if (itemIndex !== prevIndex) triggerTabs(itemIndex);
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

///------------
// Tabs tabToggle FAQ
let toggleTab = $(".row_toggle");
let toggleContent = $(".row_toggle").find(".row_text-hidden");
gsap.set(toggleContent, { height: 0, opacity: 0, yPercent: -10 });

$(".row_toggle").on("click", function () {
    let toggleContentClicked = $(this).find(".row_text-hidden");
    let toggleArrow = $(this).find(".row_icon-arrow");
    $(this).toggleClass("is-active");
    if ($(this).hasClass("is-active")) {
        let tlOpen = gsap.timeline({ paused: true });
        tlOpen.to(toggleContentClicked, {
            height: "auto",
            duration: 0.3,
        });
        tlOpen.to(toggleContentClicked, {
            opacity: 1,
            yPercent: 0,
            duration: 1,
        });
        tlOpen.to(
            toggleArrow,
            {
                rotate: "45deg",
            },
            0
        );
        tlOpen.play();
    } else {
        // second click
        let tlOpen = gsap.timeline({ paused: true });
        tlOpen.to(toggleContentClicked, {
            height: "0",
            duration: 0.3,
        });
        tlOpen.to(toggleContentClicked, {
            opacity: 0,
            yPercent: -10,
            duration: 0.5,
        });
        tlOpen.to(
            toggleArrow,
            {
                rotate: "0deg",
            },
            0
        );
        tlOpen.play();
        console.log("closed");
    }
});

///-------------
// Add numbers
$(".rows > div").each(function (index) {
    let num = index + 1;
    let formatted = (num < 10 ? "0" : "") + num;
    $(this).find(".row_number").text(formatted);
});

///------------
// Reading times
const wordsPerMinute = 250;
const secondsPerImage = 10;

const cards = document.querySelectorAll(".news_card");

for (const card of cards) {
    const blogPostHome = card.querySelector(".blog-post_content");
    const words = blogPostHome.textContent.split(" ").length;
    const images = blogPostHome.getElementsByTagName("img").length;

    const totalMinutes = Math.floor(
        words / wordsPerMinute + (images * secondsPerImage) / 60
    );
    const totalSeconds =
        (words / wordsPerMinute) * 60 + images * secondsPerImage;

    const readTimeDiv = card.querySelector(".is-read-time");

    if (totalSeconds < 60) {
        readTimeDiv.textContent = `Read time: Less than 1 minute`;
    } else if (totalMinutes === 1) {
        readTimeDiv.textContent = `Read time: 1 minute`;
    } else {
        readTimeDiv.textContent = `Read time: ${totalMinutes} minutes`;
    }
}

const blogContent = document.querySelectorAll(".blog-body_component");
const blogHeader = document.querySelectorAll(".header-w-img");

if (blogContent.length) {
    const words = blogContent.textContent.split(" ").length;
    const images = blogContent.getElementsByTagName("img").length;

    const totalMinutes = Math.floor(
        words / wordsPerMinute + (images * secondsPerImage) / 60
    );
    const totalSeconds =
        (words / wordsPerMinute) * 60 + images * secondsPerImage;

    const readTimeDiv = blogHeader.querySelector(".is-read-time");

    if (totalSeconds < 60) {
        readTimeDiv.textContent = `Read time: Less than 1 minute`;
    } else if (totalMinutes === 1) {
        readTimeDiv.textContent = `Read time: 1 minute`;
    } else {
        readTimeDiv.textContent = `Read time: ${totalMinutes} minutes`;
    }
}

////------------
// FORM STEPS
// let formSubject = "Not set";

// $(".cta_form-option.is-radio").on("click", function () {
//     $(".cta_form-option.is-radio").removeClass("is-active");
//     $(this).toggleClass("is-active");
// });
// $(".cta_form-option.is-check").on("click", function () {
//     $(this).toggleClass("is-active");
// });
