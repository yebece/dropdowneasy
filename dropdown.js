document.addEventListener("mousedown", menumove);
document.addEventListener("contextmenu", secondaryClick);
document.addEventListener("mousemove", log);

document.body.innerHTML = '<div id="dropdownContainer"></div>' + document.body.innerHTML;

var dropdownsInPage = document.getElementsByClassName("dropdown").length;

var all0 = document.getElementsByClassName('dropdown-menu');
for (var i = 0; i < all0.length; i++) {
    all0[i].style.transform = "scale(0)";
    all0[i].style.filter = "blur(30px)";
    all0[i].style.opacity = "0%";
    all0[i].style.position = "absolute";
    all0[i].style.top = "0";
    all0[i].style.left = "0";
}

function DropdownEasyConfiguration() {
    this.isDropdownEnabled = false; // old name: dropdownEnabled
    this.shouldNotDismissAtTap = false; // old name: dontDismissAtTapEnabled, TODO: invert this variable!
    this.shouldDismissWhileScrolling = false; // old name: dismissWhileScrolling
    this.isSecondaryClickEnabled = false; // old name: secondaryClickEnabled
    this.isFixedPositioningEnabled = false; // old name: fixedPosEnabled
    this.isScalingEnabled = false; // old name: scalingEnabled
    this.isScalingBounceEnabled = false; // old name: scalingBouncyEnabled
    this.isScalingBlurEnabled = false; // old name: scalingBlurEnabled
    this.isScalingFadeEnabled = false; // old name: scalingFadeEnabled
    this.isFadingEnabled = false; // old name: fadeEnabled
    this.isFadingBlurEnabled = false; // old name: fadeBlurEnabled
    this.scalingDurationSeconds = 0.2;
    this.scalingBounceDurationSeconds = 0.2;
    this.scalingBlurDurationSeconds = 0.2;
    this.scalingFadeDurationSeconds = 0.2;
    this.fadingDurationSeconds = 0.2;
    this.fadingBlurDurationSeconds = 0.2;
    this.scalingCurveType = "";
    this.scalingBouncyCurveType = "";
    this.scalingBlurCurveType = "";
    this.scalingFadeCurveType = "";
    this.fadeCurveType = "";
    this.fadeBlurCurveType = "";
}

DropdownEasyConfiguration.prototype.resetState = function() {
    this.shouldNotDismissAtTap = false;
    this.isScalingEnabled = false;
    this.isScalingBounceEnabled = false;
    this.isScalingBlurEnabled = false;
    this.isScalingFadeEnabled = false;
    this.isFadingEnabled = false;
    this.isFadingBlurEnabled = false;
    this.isSecondaryClickEnabled = false;
    this.isFixedPositioningEnabled = false;
    this.shouldDismissWhileScrolling = false;
};

var ddeConfig = new DropdownEasyConfiguration();

var ddeAnimations = {
    none: {
        dismissDurationSeconds: 0,

        dismissMenu: function(dropDownMenu) {
            dropDownMenu.style.transition = "none";
            dropDownMenu.style.filter = "blur(30px)";
            dropDownMenu.style.opacity = "0%";
            dropDownMenu.style.transform = "scale(0)";
        }
    },

    scalingBlur: { 
        dismissDurationSeconds: 0.2,

        dismissMenu: function(dropDownMenu) {
            dropDownMenu.style.transform = "scale(0)";
            dropDownMenu.style.filter = "blur(30px)";
            setTimeout(() => {
                dropDownMenu.style.opacity = "0%";
            }, this.dismissDurationSeconds * 1000);
        }
    },

    scalingBounce: { 
        dismissDurationSeconds: 0.2,

        dismissMenu: function(dropDownMenu) {
            dropDownMenu.style.transform = "scale(0)";
        }
    },

    fadingBlur: { 
        dismissDurationSeconds: 0.2,

        dismissMenu: function(dropDownMenu) {
            dropDownMenu.style.opacity = "0%";
            dropDownMenu.style.filter = "blur(30px)";
            setTimeout(() => {
                dropDownMenu.style.transform = "scale(0)";
            }, this.dismissDurationSeconds * 1000);
        }
    },

    scalingFade: { 
        dismissDurationSeconds: 0.2, 

        dismissMenu: function(dropDownMenu) {
            dropDownMenu.style.opacity = "0%";
            dropDownMenu.style.transform = "scale(0)";
            setTimeout(() => {
                dropDownMenu.style.filter = "blur(30px)";
            }, this.dismissDurationSeconds * 1000);
        }
    },

    scaling: { 
        dismissDurationSeconds: 0.2,

        dismissMenu: function(dropDownMenu) {
            dropDownMenu.style.transform = "scale(0)";
        }
    },

    fading: { 
        dismissDurationSeconds: 0.2,

        dismissMenu: function(dropDownMenu) {
            dropDownMenu.style.opacity = "0%";
            setTimeout(() => {
                dropDownMenu.style.transform = "scale(0)";
            }, this.dismissDurationSeconds * 1000);
        }
    },
};

// Dropdown Menus

function dismissMenu() {
    ddeConfig.isDropdownEnabled = false;

    var dismissDuration = 0;
    var dropDownMenu = document.getElementById("dropdownContainer").childNodes[0];

    if (ddeConfig.isScalingBlurEnabled) {
        dismissDuration = ddeConfig.scalingBlurDurationSeconds;
        dismissMenuScalingBlur();
    } else if (ddeConfig.isScalingBounceEnabled) {
        dismissDuration = ddeConfig.scalingBounceDurationSeconds;
        dismissMenuScalingBounce();
    } else if (ddeConfig.isFadingBlurEnabled) {
        dismissDuration = ddeConfig.fadingBlurDurationSeconds;
        dismissMenuFadingBlur();
    } else if (ddeConfig.isScalingFadeEnabled) {
        dismissDuration = ddeConfig.scalingFadeDurationSeconds;
        dismissMenuScalingFade();
    } else if (ddeConfig.isScalingEnabled) {
        dismissDuration = ddeConfig.scalingDurationSeconds;
        dismissMenuScaling();
    } else if (ddeConfig.isFadingEnabled) {
        dismissDuration = ddeConfig.fadingDurationSeconds;
        dismissMenuFading();
    } else {
        dismissDuration = 0;
        dismissMenuNone();
    }

    setTimeout(() => {
        ddeConfig.resetState();

        document.getElementById("dropdownn").innerHTML += dropDownMenu.outerHTML;
        dropDownMenu.outerHTML = "";
        document.getElementById("dropdownn").setAttribute("id", "");
    }, dismissDuration * 1000 + 50);

    function dismissMenuNone() {
        ddeAnimations.none.dismissMenu(dropDownMenu);
    }

    function dismissMenuFading() {
        ddeAnimations.fading.dismissMenu(dropDownMenu);
    }

    function dismissMenuScaling() {
        ddeAnimations.scaling.dismissMenu(dropDownMenu);
    }

    function dismissMenuScalingFade() {
        ddeAnimations.scalingFade.dismissMenu(dropDownMenu);
    }

    function dismissMenuFadingBlur() {
        ddeAnimations.fadingBlur.dismissMenu(dropDownMenu);
    }

    function dismissMenuScalingBounce() {
        ddeAnimations.scalingBounce.dismissMenu(dropDownMenu);
    }

    function dismissMenuScalingBlur() {
        ddeAnimations.scalingBlur.dismissMenu(dropDownMenu);
    }
}

function menumove(event) {
    if (event.target.classList.contains("dont-dismiss-at-tap")) {
        ddeConfig.shouldNotDismissAtTap = true;
    }

    if (event.target.classList.contains("dismiss-while-scrolling")) {
        ddeConfig.shouldDismissWhileScrolling = true;
    }

    if (event.target.classList.contains("secondary-click")) {
        ddeConfig.isSecondaryClickEnabled = true;
    }

    if (event.target.classList.contains("fixed-pos")) {
        ddeConfig.isFixedPositioningEnabled = true;
    }

    var classString = event.target.classList.toString();
    // Animations

    if (classString.indexOf("scaling") > -1) {
        ddeConfig.isScalingEnabled = true;

        if (classString.indexOf("@") > -1) {
            var x = classString.substring(classString.indexOf("@"), classString.length) + " ";
            var durationAndType = x.substring(0, x.indexOf(" ")) + "-";

            // TODO: eval()?! are you serious
            ddeConfig.scalingDurationSeconds = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
            ddeConfig.scalingCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }

    if (classString.indexOf("scaling-bouncy") > -1) {
        ddeConfig.isScalingBounceEnabled = true;

        if (classString.indexOf("@") > -1) {
            var x = classString.substring(classString.indexOf("@"), classString.length) + " ";
            var durationAndType = x.substring(0, x.indexOf(" ")) + "-";

            // TODO: Get rid of evals, use safer alternatives
            ddeConfig.scalingBounceDurationSeconds = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
            ddeConfig.scalingBouncyCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }

    if (classString.indexOf("scaling-blur") > -1) {
        ddeConfig.isScalingBlurEnabled = true;

        if (classString.indexOf("@") > -1) {
            var x = classString.substring(classString.indexOf("@"), classString.length) + " ";
            var durationAndType = x.substring(0, x.indexOf(" ")) + "-";

            // TODO: Eval must be gone
            ddeConfig.scalingBlurDurationSeconds = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
            ddeConfig.scalingBlurCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }

    if (classString.indexOf("scaling-fade") > -1) {
        ddeConfig.isScalingFadeEnabled = true;

        if (classString.indexOf("@") > -1) {
            var x = classString.substring(classString.indexOf("@"), classString.length) + " ";
            var durationAndType = x.substring(0, x.indexOf(" ")) + "-";

            // TODO: You know what to do.
            ddeConfig.scalingFadeDurationSeconds = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
            ddeConfig.scalingFadeCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }

    if (classString.indexOf("fade") > -1) {
        ddeConfig.isFadingEnabled = true;

        if (classString.indexOf("@") > -1) {
            var x = classString.substring(classString.indexOf("@"), classString.length) + " ";
            var durationAndType = x.substring(0, x.indexOf(" ")) + "-";

            ddeConfig.fadingDurationSeconds = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
            ddeConfig.fadeCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }

    if (classString.indexOf("fade-blur") > -1) {
        ddeConfig.isFadingBlurEnabled = true;

        if (classString.indexOf("@") > -1) {
            var x = classString.substring(classString.indexOf("@"), classString.length) + " ";
            var durationAndType = x.substring(0, x.indexOf(" ")) + "-";

            ddeConfig.fadingBlurDurationSeconds = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
            ddeConfig.fadeBlurCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }


    function openMenu() {
        function dropDownOpen(dropDownMenuBefore) {

            document.getElementById("dropdownContainer").innerHTML += dropDownMenuBefore.outerHTML;
            dropDownMenuBefore.parentElement.setAttribute("id", "dropdownn")
            dropDownMenuBefore.outerHTML = "";

            var dropDownMenu = document.getElementById("dropdownContainer").childNodes[0];

            if (ddeConfig.isSecondaryClickEnabled) {
                dropDownMenu.classList.add("secondary-click");
            }

            if (ddeConfig.isFixedPositioningEnabled) {
                dropDownMenu.style.position = "fixed";
            }

            function menuPositionCalculation() {
                var posX = event.pageX;
                var posY = event.pageY;

                if (ddeConfig.isFixedPositioningEnabled) {
                    posX = event.clientX;
                    posY = event.clientY;
                }

                if (posX >= (document.documentElement.scrollWidth - dropDownMenu.clientWidth)) {

                    if (event.clientY >= (window.innerHeight - dropDownMenu.clientHeight)) {
                        dropDownMenu.style.transformOrigin = "bottom right";
                        dropDownMenu.style.top = (posY - dropDownMenu.clientHeight) + "px";
                        dropDownMenu.style.left = (posX - dropDownMenu.clientWidth) + "px";
                    } else {
                        dropDownMenu.style.transformOrigin = "top right";
                        dropDownMenu.style.top = posY + "px";
                        dropDownMenu.style.left = (posX - dropDownMenu.clientWidth) + "px";
                    }

                } else {

                    if (event.clientY >= (window.innerHeight - dropDownMenu.clientHeight)) {
                        dropDownMenu.style.transformOrigin = "bottom left";
                        dropDownMenu.style.top = (posY - dropDownMenu.clientHeight) + "px";
                        dropDownMenu.style.left = posX + "px";
                    } else {
                        dropDownMenu.style.transformOrigin = "top left";
                        dropDownMenu.style.top = posY + "px";
                        dropDownMenu.style.left = posX + "px";
                    }


                }
            }

            if (ddeConfig.isScalingBounceEnabled) {
                dropDownOpenScalingBounce();
            } else if (ddeConfig.isScalingBlurEnabled) {
                dropDownOpenScalingBlur();
            } else if (ddeConfig.isScalingFadeEnabled) {
                dropDownOpenScalingFade();
            } else if (ddeConfig.isScalingEnabled) {
                dropDownOpenScaling();
            } else if (ddeConfig.isFadingBlurEnabled) {
                dropDownOpenFadingBlur();
            } else if (ddeConfig.isFadingEnabled) {
                dropDownOpenFading();
            } else {
                dropDownOpenDefault();
            }


            function dropDownOpenDefault() {
                dropDownMenu.style.transition = "none";
                dropDownMenu.style.filter = "blur(0px)";
                dropDownMenu.style.opacity = "100%";
                dropDownMenu.style.transform = "scale(1)";
                menuPositionCalculation();
            }

            function dropDownOpenFading() {
                dropDownMenu.style.filter = "blur(0px)";
                dropDownMenu.style.transform = "scale(1)";
                dropDownMenu.style.transition = "opacity " + ddeConfig.fadingDurationSeconds + "s " + ddeConfig.fadeCurveType;

                menuPositionCalculation();
                setTimeout(() => {
                    dropDownMenu.style.opacity = "100%";
                }, 0.1);
            }

            function dropDownOpenFadingBlur() {
                dropDownMenu.style.transform = "scale(1)";
                dropDownMenu.style.transition = "filter " + ddeConfig.fadingBlurDurationSeconds + "s " + ddeConfig.fadeBlurCurveType + ", opacity " + ddeConfig.fadingBlurDurationSeconds + "s " + ddeConfig.fadeBlurCurveType;

                menuPositionCalculation();
                setTimeout(() => {
                    dropDownMenu.style.opacity = "100%";
                    dropDownMenu.style.filter = "blur(0px)";
                }, 0.1);
            }

            function dropDownOpenScaling() {
                dropDownMenu.style.filter = "blur(0px)";
                dropDownMenu.style.opacity = "100%";
                dropDownMenu.style.transition = "transform " + ddeConfig.scalingDurationSeconds + "s " + ddeConfig.scalingCurveType;

                menuPositionCalculation();
                setTimeout(() => {
                    dropDownMenu.style.transform = "scale(1)";
                }, 0.1);
            }

            function dropDownOpenScalingFade() {
                dropDownMenu.style.filter = "blur(0px)";
                dropDownMenu.style.transition = "opacity " + ddeConfig.scalingFadeDurationSeconds + "s " + ddeConfig.scalingFadeCurveType + ", transform " + ddeConfig.scalingFadeDurationSeconds + "s " + ddeConfig.scalingFadeCurveType;

                menuPositionCalculation();
                setTimeout(() => {
                    dropDownMenu.style.opacity = "100%";
                    dropDownMenu.style.transform = "scale(1)";
                }, 0.1);
            }

            function dropDownOpenScalingBlur() {
                dropDownMenu.style.opacity = "100%";
                dropDownMenu.style.transition = "filter " + ddeConfig.scalingBlurDurationSeconds + "s " + ddeConfig.scalingBlurCurveType + ", transform " + ddeConfig.scalingBlurDurationSeconds + "s " + ddeConfig.scalingBlurCurveType;

                menuPositionCalculation();
                setTimeout(() => {
                    dropDownMenu.style.transform = "scale(1)";
                    dropDownMenu.style.filter = "blur(0px)";
                }, 0.1);
            }

            function dropDownOpenScalingBounce() {
                dropDownMenu.style.transition = "transform " + ddeConfig.scalingBounceDurationSeconds + "s " + ddeConfig.scalingBouncyCurveType;
                dropDownMenu.style.filter = "blur(0px)";
                dropDownMenu.style.opacity = "100%";

                menuPositionCalculation();
                setTimeout(() => {
                    dropDownMenu.style.transform = "scale(1.01)";
                    setTimeout(() => {
                        dropDownMenu.style.transform = "scale(1)";
                    }, ddeConfig.scalingBounceDurationSeconds * 1000 + 50);
                }, 0.1);
            }
        }
        dropDownOpen(event.target.childNodes[1]);
    }


    var nodes = [];
    var element = event.target;
    nodes.push(element);
    while (element.parentNode) {
        nodes.unshift(element.parentNode.classList);
        element = element.parentNode;
    }
    console.log(nodes.join());

    if (event.target.classList.contains("dropdown")
        || event.target.classList.contains("dropdown-menu")
        || nodes.join().includes("dropdown-menu") && !event.target.classList.contains("dismiss-button")) {
        if (!ddeConfig.isDropdownEnabled) {
            ddeConfig.isDropdownEnabled = true;

            if (!ddeConfig.isSecondaryClickEnabled && event.button == 0) {
                openMenu();
            } else if (ddeConfig.isSecondaryClickEnabled && event.button == 2) {
                openMenu();
            } else if (ddeConfig.isSecondaryClickEnabled && event.button == 0) {
                dismissMenu();
            } else if (!ddeConfig.isSecondaryClickEnabled && event.button == 2) {
                dismissMenu();
            }

        } else if (!ddeConfig.shouldNotDismissAtTap) {
            dismissMenu();
        } else if (ddeConfig.isSecondaryClickEnabled && event.button == 0 && !nodes.join().includes("dropdown-menu")) {
            dismissMenu();
        }

    } else {
        dismissMenu();
    }
}

window.onscroll = function (e) {
    if (ddeConfig.shouldDismissWhileScrolling) {
        dismissMenu();
    }
}

function secondaryClick(event) {
    if (event.target.parentElement.classList.contains("secondary-click") || event.target.classList.contains("secondary-click")) {
        ddeConfig.isSecondaryClickEnabled = true;
        event.preventDefault();
    }

}

function log(event) {
    var shouldDismissWhileScrolling = ddeConfig.shouldDismissWhileScrolling;

    if (!event.target.classList.contains("dropdown") && !ddeConfig.isDropdownEnabled) {
        ddeConfig.resetState();
        ddeConfig.shouldDismissWhileScrolling = shouldDismissWhileScrolling;
    }

    console.log(event.target.classList.toString());
    console.table(ddeConfig);
}