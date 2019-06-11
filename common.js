"use strict";
function Menu (object) {
    this.params = {
        menuClass: object.menuClass,
        menu: $(object.menuClass + " .menu"),
        menuCustomize: object.menuCustomize,
        menuCustomStyle: object.menuCustomStyle,
        background: $(object.menuClass + " .bg"),
        menuItems: $("" + object.menuClass + " " + object.menuItemClass + ""),
        menuItemsA: $("" + object.menuClass + " " + object.menuItemClass + " a"),
        menuItemsCustomize: object.menuItemsCustomize,
        menuItemsCustomStyle: object.menuItemsCustomStyle,
        hamburgerButtonClass: object.hamburgerButtonClass,
        hamburgerButton: $(object.hamburgerButtonClass),
        animatedMenuItems: object.animatedMenuItems,
        menuItemsDuration: object.menuItemsDuration,
        closeIcon: object.closeIcon,
        type: object.type,
    };

    this.init = () => {
        $("body").append("<style>@keyframes backgroundShow {0%{opacity: 0}100% {opacity: 1}}</style>");
        $(this.params.menuClass).css({
            width: this.params.type === "slide" ? "100%" : "0",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            overflowY: "auto",
            display: "none",
            zIndex: 9990,
            overflowX: "hidden",
            transaction: ".5s"
        });
        $(this.params.menuClass + " ul").append(
            "<button uk-close type='button' class='menu-close' style='position: absolute;right: 0;top: 0; padding: 20px;cursor: pointer;font-size: 18px;color: #333;'></button>"
        );
        this.params.menuCloser = $(this.params.menuClass + " .menu-close");
        $(this.params.menuClass + " ul").css({
            padding: 0,
            margin: 0,
            width: "100%",
            height: "auto",
        });
        if (this.params.menuCustomize){
            this.params.menuCustomStyle.zIndex = 9999;
            this.params.menuCustomStyle.overflowY = "auto";
            this.params.menuCustomStyle.left = "-600px";
            this.params.menuCustomStyle.top = 0;
            this.params.menuCustomStyle.position = "absolute";
            this.params.menuCustomStyle.height = "100vh";
            $(this.params.menu).css(this.params.menuCustomStyle);
        }else{
            $(this.params.menu).css({
                width: screen.width > 650 ? "350px" : "270px",
                height: "100vh",
                padding: screen.width > 650 ? "40px" : "30px",
                position: "absolute",
                left: this.params.type === "slide" ? "-600px": "0",
                top: 0,
                overflowY: "auto",
                background: "#fff",
                zIndex: 9999
            });
        }
        $(this.params.background).css({
            width: "100%",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            minHeight: "100vh",
            background: "rgba(0,0,0,.4)",
            zIndex: 9998,
            display: "block"
        });
        if (this.params.menuItemsCustomize){
            $(this.menuItems).css(this.params.menuItemsCustomStyle);
        }else {
            $(this.params.menuItems).css({
                width: "auto",
                display: "block",
                cursor: "pointer",
            });
            $(this.params.menuItemsA).css({
                textDecoration: "none",
            });
        }
        if (this.params.animatedMenuItems){
            $(this.params.menuItems).css({
                display: "none",
            });
        }
    };this.init();

    this.toggleSlide = () => {

        // Slide
        if (this.params.type === "slide"){
            if ($(this.params.menuClass).is(":visible")){
                $(this.params.menu).animate({
                    left: "-600px"
                },100);
                setTimeout(() => {
                    $(this.params.background).css({
                        animation: "backgroundShow .2s 0s 1 reverse",
                    });
                    setTimeout(() => {
                        $(this.params.menuClass).css({
                            display: "none",
                        });
                        $("body").css({
                            overflowY: "auto"
                        });
                    }, 195);
                    if (this.params.animatedMenuItems){
                        this.hideMenuItems();
                    }
                }, 500);
                $(this.params.background).css({
                    animation: "",
                });
                return;
            }

            $(this.params.menuClass).css({
                display: "block",
            });
            $(this.params.background).css({
                animation: "backgroundShow .5s",
            });
            $(this.params.menu).animate({
                left: "0"
            }, 50, () => {
                if (this.params.animatedMenuItems) {
                    setTimeout(() => {
                        this.showMenuItems();
                    }, 500);
                }
            });
            $("body").css({
                overflowY: "hidden"
            });
        }

        // Push
        if (this.params.type === "push") {

            if ($(this.params.menuClass).css("width") === "0px") {
                $(this.params.background).css({
                    animation: "backgroundShow .5s",
                });
                setTimeout(()=>{
                    $(this.params.background).css({
                        display: "block",
                    });
                }, 500);
                $(this.params.menuClass).css({
                    display: "block",
                }, 200);
                $(this.params.menuClass).animate({
                    width: screen.width > 650 ? "350px" : "270px",
                }, 200);
                $("body, header, .progress").animate({
                    marginLeft: screen.width > 650 ? "350px" : "270px",
                }, 200);
                $("body").css({
                    overflowY: "hidden"
                });
                return;
            }

            $(this.params.background).css({
                animation: "backgroundShow .2s ease 0s 1 reverse",
            });
            setTimeout(()=>{
                $(this.params.background).css({
                    display: "none",
                });
            }, 250);
            $(this.params.menuClass).animate({
                width: "0px",
            }, 200);
            $("body, header, .progress").animate({
                marginLeft: 0,
            }, 200);
            $("body").css({
                overflowY: "auto"
            });
        }
    };

    this.showMenuItems = () => {
        var t = 20;
        $.each(this.params.menuItems, (k,v) => {
            setTimeout(() => {
                $(v).css({
                    display: "block",
                    animation: "backgroundShow .2s",
                });
            }, t);
            t+=this.params.menuItemsDuration/10;
        });
    };

    this.hideMenuItems = () => {
        $(this.params.menuItems).css({
            display: "none",
            animation: "",
        });
    };

    this.eventsInit = () => {
        $(this.params.hamburgerButton).on("click", () => {
            this.toggleSlide();
        });
        $(this.params.background).on("click", () => {
            this.toggleSlide();
        });
        $(this.params.menuCloser).on("click", () => {
            this.toggleSlide();
        });
    };this.eventsInit();
}

function Slider (object) {
    this.params = {
        sliderClass: object.sliderClass,
        sliderItemsContainerClass: object.sliderItemsContainerClass,
        sliderItems: $(object.sliderItemsContainerClass + " .item"),
        sliderControlsClass: object.sliderControlsClass,
        sliderAlign: object.sliderAlign,
        itemsAlign: object.itemsAlign,
        displayItemsCount: screen.width > 650 ? object.displayItemsCount : 1,
        slideSpeed: object.slideSpeed ? object.slideSpeed : 300,
        index: null,
        currentItem: null,
        nextIndex: null,
        nextItem: null,
        removed: null,
    };

    this.currentSlide = () => {
        this.params.currentItem =  $(this.params.sliderItemsContainerClass + " .item.active:first");
        this.params.index = $($(this.params.sliderItemsContainerClass + " .item.active")[this.params.currentItem.length-1]).index();
    };

    this.nextSlide = () => {
        var arr = new Array();
        this.params.nextIndex = this.params.index;
        for (var i = 0;i < this.params.displayItemsCount; i++) {
            this.params.nextIndex += 1;
            arr[i] = $(this.params.sliderItemsContainerClass + " .item").eq(this.params.nextIndex);
        }
        this.params.nextItem = arr;

        console.log("next: ");
        console.log(arr);
        console.log("current: ");
        console.log(this.params.currentItem);
    };

    this.init = () => {
        $(this.params.sliderClass).css({
            position: "relative",
            display: "flex",
            justifyContent: this.params.sliderAlign === "center" ? "center" : this.params.sliderAlign === "left" ? "flex-start" : this.params.sliderAlign === "right" ? "flex-end" : null,
            width: "auto",
            height: "auto",
            zIndex: 800
        });
        $(this.params.sliderItemsContainerClass).css({
            display: "flex",
            justifyContent: this.params.itemsAlign === "center" ? "center" : this.params.itemsAlign === "between" ? "space-between" : this.params.itemsAlign === "around" ? "space-around" : null,
            width: "auto",
            height: "auto",
            zIndex: 801,
            position: "relative"
        });
        $(this.params.sliderItems).css({
            position: "relative",
            transition: ".5s ease",
            right: "-2400px",
            display: "none",
            zIndex: 799,
            opacity: 1,
        });
        $(this.params.sliderControlsClass + " .next").css({
            position: "absolute",
            left: "0",
            top: "50%",
            width: "40px",
            height: "40px",
            color: "rgba(255,255,255,.8)",
            zIndex: 802,
        });
        $(this.params.sliderControlsClass + " .prev").css({
            position: "absolute",
            right: "-30px",
            top: "50%",
            width: "40px",
            height: "40px",
            color: "rgba(255,255,255,.8)",
            zIndex: 802,
        });

        for (var i = 0; i < this.params.displayItemsCount; i++) {
            $($(this.params.sliderItems)[i]).addClass("active");
        }

        $(this.params.sliderItemsContainerClass + " .item.active").css({
            right: "0",
            display: "inline-block",
        });

        this.currentSlide();
        this.nextSlide();
    };this.init();

    this.eventsInit = () => {
        $(this.params.sliderControlsClass + " .next").on("click", () => {
            if (this.params.displayItemsCount !== this.params.sliderItems.length) {
                $(this.params.currentItem).animate({
                    left: "-2400px",
                }, this.params.slideSpeed).css({
                    right: "",
                    opacity: 0,
                });
                setTimeout(()=>{
                    this.params.removed = $(this.params.currentItem);
                    $(this.params.removed).removeClass("active");

                    $.each(this.params.nextItem, (k, v) => {
                        $(v).addClass("active");
                        $(v).css({
                            right: "-2400px",
                            left: "",
                            opacity: 1,
                            display: "inline-block",
                        });
                        $(v).animate({
                            right: "",
                        }, this.params.slideSpeed);
                        if (k === this.params.displayItemsCount-1) {
                            $(v).css({
                                opacity: 0,
                            });
                            setTimeout(()=>{
                                $(v).css({
                                    opacity: 1,
                                });
                            }, this.params.slideSpeed + 300);
                        }
                    });

                    $(this.params.sliderItemsContainerClass).append("<div class='item'>" + $(this.params.removed).html() + "</div>");
                    $(this.params.sliderItemsContainerClass + " .item:last").css({
                        position: "relative",
                        transition: ".5s ease",
                        right: "-2400px",
                        display: "none",
                        zIndex: 799,
                        opacity: 1,
                    });
                    $(this.params.removed).remove();
                    this.currentSlide();
                    this.nextSlide();
                }, 500);
            }
        });

        $(this.params.sliderControlsClass + " .prev").on("click", () => {
            if (this.params.displayItemsCount !== this.params.sliderItems.length) {
                $(this.params.currentItem).animate({
                    right: "-2400px",
                }, this.params.slideSpeed).css({
                    left: "",
                    opacity: 0,
                });
                setTimeout(()=>{
                    this.params.removed = $(this.params.currentItem);
                    $(this.params.removed).removeClass("active");

                    $.each(this.params.nextItem, (k, v) => {
                        $(v).addClass("active");
                        $(v).css({
                            left: "-2400px",
                            right: "",
                            opacity: 1,
                            display: "inline-block",
                        });
                        $(v).animate({
                            left: "",
                        }, this.params.slideSpeed);
                        if (k === this.params.displayItemsCount-1) {
                            $(v).css({
                                opacity: 0,
                            });
                            setTimeout(()=>{
                                $(v).css({
                                    opacity: 1,
                                });
                            }, this.params.slideSpeed + 300);
                        }
                    });

                    $(this.params.sliderItemsContainerClass).append("<div class='item'>" + $(this.params.removed).html() + "</div>");
                    $(this.params.sliderItemsContainerClass + " .item:last").css({
                        position: "relative",
                        transition: ".5s ease",
                        left: "-2400px",
                        display: "none",
                        zIndex: 799,
                        opacity: 1,
                    });
                    $(this.params.removed).remove();
                    this.currentSlide();
                    this.nextSlide();
                }, 500);
            }
        });
    };this.eventsInit();

}