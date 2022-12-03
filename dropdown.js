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

function DropdownEasyConfig() {
    this.isDropdownEnabled = false;
    this.shouldNotDismissAtTap = false; // TODO: invert this variable!
    this.shouldDismissWhileScrolling = false;
    this.isSecondaryClickEnabled = false;
    this.isFixedPositioningEnabled = false;

    this.isScalingEnabled = false;
    this.isScalingBounceEnabled = false;
    this.isScalingBlurEnabled = false;
    this.isScalingFadeEnabled = false;
    this.isFadingEnabled = false;
    this.isFadingBlurEnabled = false;

    this.scalingDurationSeconds = 0.2;
    this.scalingBounceDurationSeconds = 0.2;
    this.scalingBlurDurationSeconds = 0.2;
    this.scalingFadeDurationSeconds = 0.2;
    this.fadingDurationSeconds = 0.2;
    this.fadingBlurDurationSeconds = 0.2;

    this.scalingCurveType = "";
    this.scalingBounceCurveType = "";
    this.scalingBlurCurveType = "";
    this.scalingFadeCurveType = "";
    this.fadeCurveType = "";
    this.fadeBlurCurveType = "";

    this.flags = 0;
}

DropdownEasyConfig.FLAG_IS_DROPDOWN_ENABLED             = 0x00000001;
DropdownEasyConfig.FLAG_SHOULD_NOT_DISMISS_AT_TAP       = 0x00000002;
DropdownEasyConfig.FLAG_SHOULD_DISMISS_WHILE_SCROLLING  = 0x00000004;
DropdownEasyConfig.FLAG_IS_SECONDARY_CLICK_ENABLED      = 0x00000008;
DropdownEasyConfig.FLAG_IS_FIXED_POSITIONING_ENABLED    = 0x00000010;
DropdownEasyConfig.FLAG_IS_SCALING_ENABLED              = 0x00000020;
DropdownEasyConfig.FLAG_IS_SCALING_BOUNCE_ENABLED       = 0x00000040;
DropdownEasyConfig.FLAG_IS_SCALING_BLUR_ENABLED         = 0x00000080;
DropdownEasyConfig.FLAG_IS_SCALING_FADE_ENABLED         = 0x00000100;
DropdownEasyConfig.FLAG_IS_FADING_ENABLED               = 0x00000200;
DropdownEasyConfig.FLAG_IS_FADING_BLUR_ENABLED          = 0x00000400;

/**
 * Gets whether the specified flag is set or not.
 * @param {number} flag One of DropdownEasyConfig.FLAG_* values.
 */
DropdownEasyConfig.prototype.getFlag = function(flag) {
    return (this.flags & flag) == flag;
};

/**
 * Sets the specified flag in the flags field.
 * @param {number} flag One of DropdownEasyConfig.FLAG_* values.
 * @param {boolean} value The value to set the flag to.
 */
DropdownEasyConfig.prototype.setFlag = function(flag, value) {
    this.flags = (this.flags ^ flag) | (value ? flag : 0);
};

var dropdownConfig = new DropdownEasyConfig();

// Dropdown Menus

function dismissMenu() {
    dropdownConfig.isDropdownEnabled = false;

    var dismissDuration = 0;
    var dropDownMenu = document.getElementById("dropdownContainer").childNodes[0];

    if (dropdownConfig.isScalingBlurEnabled) {
        dismissDuration = dropdownConfig.scalingBlurDurationSeconds;
        dropDownMenu.style.transform = "scale(0)";
        dropDownMenu.style.filter = "blur(30px)";
        setTimeout(() => {
            dropDownMenu.style.opacity = "0%";
        }, dropdownConfig.scalingBlurDurationSeconds * 1000);

    } else if (dropdownConfig.isScalingBounceEnabled) {
        dismissDuration = dropdownConfig.scalingBounceDurationSeconds;
        dropDownMenu.style.transform = "scale(0)";

    } else if (dropdownConfig.isFadingBlurEnabled) {
        dismissDuration = dropdownConfig.fadingBlurDurationSeconds;
        dropDownMenu.style.opacity = "0%";
        dropDownMenu.style.filter = "blur(30px)";
        setTimeout(() => {
            dropDownMenu.style.transform = "scale(0)";
        }, dropdownConfig.fadingBlurDurationSeconds * 1000);

    } else if (dropdownConfig.isScalingFadeEnabled) {
        dismissDuration = dropdownConfig.scalingFadeDurationSeconds;
        dropDownMenu.style.opacity = "0%";
        dropDownMenu.style.transform = "scale(0)";
        setTimeout(() => {
            dropDownMenu.style.filter = "blur(30px)";
        }, dropdownConfig.scalingFadeDurationSeconds * 1000);

    } else if (dropdownConfig.isScalingEnabled) {
        dismissDuration = dropdownConfig.scalingDurationSeconds;
        dropDownMenu.style.transform = "scale(0)";

    } else if (dropdownConfig.isFadingEnabled) {
        dismissDuration = dropdownConfig.fadingDurationSeconds;
        dropDownMenu.style.opacity = "0%";
        setTimeout(() => {
            dropDownMenu.style.transform = "scale(0)";
        }, dropdownConfig.fadingDurationSeconds * 1000);

    } else {
        dropDownMenu.style.transition = "none";
        dropDownMenu.style.filter = "blur(30px)";
        dropDownMenu.style.opacity = "0%";
        dropDownMenu.style.transform = "scale(0)";
    }

    setTimeout(() => {
        dropdownConfig.shouldNotDismissAtTap = false;
        dropdownConfig.isScalingEnabled = false;
        dropdownConfig.isScalingBounceEnabled = false;
        dropdownConfig.isScalingBlurEnabled = false;
        dropdownConfig.isScalingFadeEnabled = false;
        dropdownConfig.isFadingEnabled = false;
        dropdownConfig.isFadingBlurEnabled = false;
        dropdownConfig.isSecondaryClickEnabled = false;
        dropdownConfig.isFixedPositioningEnabled = false;
        dropdownConfig.shouldDismissWhileScrolling = false;

        document.getElementById("dropdownn").innerHTML += dropDownMenu.outerHTML;
        dropDownMenu.outerHTML = "";
        document.getElementById("dropdownn").setAttribute("id", "");
    }, dismissDuration * 1000 + 50);
}

function menumove(event) {
    if (event.target.classList.contains("dont-dismiss-at-tap")) {
        dropdownConfig.shouldNotDismissAtTap = true;
    }

    if (event.target.classList.contains("dismiss-while-scrolling")) {
        dropdownConfig.shouldDismissWhileScrolling = true;
    }

    if (event.target.classList.contains("secondary-click")) {
        dropdownConfig.isSecondaryClickEnabled = true;
    }

    if (event.target.classList.contains("fixed-pos")) {
        dropdownConfig.isFixedPositioningEnabled = true;
    }

    // Animations

    if (event.target.classList.toString().indexOf("scaling") > -1) {
        dropdownConfig.isScalingEnabled = true;
        
        if(event.target.classList.toString().indexOf("@") > -1){
        var x = event.target.classList.toString().substring(event.target.classList.toString().indexOf("@"), event.target.classList.toString().length) + " ";
        

        var durationAndType = x.substring(0, x.indexOf(" ")) + "-";

        dropdownConfig.scalingDurationSeconds = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
        dropdownConfig.scalingCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }

    if (event.target.classList.toString().indexOf("scaling-bouncy") > -1) {
        dropdownConfig.isScalingBounceEnabled = true;

        if(event.target.classList.toString().indexOf("@") > -1){
        var x = event.target.classList.toString().substring(event.target.classList.toString().indexOf("@"), event.target.classList.toString().length) + " ";

        var durationAndType = x.substring(0, x.indexOf(" ")) + "-";

        dropdownConfig.scalingBounceDurationSeconds = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
        dropdownConfig.scalingBouncyCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }

    if (event.target.classList.toString().indexOf("scaling-blur") > -1) {
        dropdownConfig.isScalingBlurEnabled = true;

        if(event.target.classList.toString().indexOf("@") > -1){
            var x = event.target.classList.toString().substring(event.target.classList.toString().indexOf("@"), event.target.classList.toString().length) + " ";

        var durationAndType = x.substring(0, x.indexOf(" ")) + "-";
        
        dropdownConfig.scalingBlurDurationSeconds = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
        dropdownConfig.scalingBlurCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }

    if (event.target.classList.toString().indexOf("scaling-fade") > -1) {
        dropdownConfig.isScalingFadeEnabled = true;

        if(event.target.classList.toString().indexOf("@") > -1){
            var x = event.target.classList.toString().substring(event.target.classList.toString().indexOf("@"), event.target.classList.toString().length) + " ";

        var durationAndType = x.substring(0, x.indexOf(" ")) + "-";
        
        dropdownConfig.scalingFadeDurationSeconds = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
        dropdownConfig.scalingFadeCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }

    if (event.target.classList.toString().indexOf("fade") > -1) {
        dropdownConfig.isFadingEnabled = true;

        if(event.target.classList.toString().indexOf("@") > -1){
            var x = event.target.classList.toString().substring(event.target.classList.toString().indexOf("@"), event.target.classList.toString().length) + " ";

        var durationAndType = x.substring(0, x.indexOf(" ")) + "-";
        
        dropdownConfig.fadingDurationSeconds = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
        dropdownConfig.fadeCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }

    if (event.target.classList.toString().indexOf("fade-blur") > -1) {
        dropdownConfig.isFadingBlurEnabled = true;

        if(event.target.classList.toString().indexOf("@") > -1){
            var x = event.target.classList.toString().substring(event.target.classList.toString().indexOf("@"), event.target.classList.toString().length) + " ";

        var durationAndType = x.substring(0, x.indexOf(" ")) + "-";
        
        dropdownConfig.fadingBlurDurationSeconds = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
        dropdownConfig.fadeBlurCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }


    function openMenu() {
        function dropDownOpen(dropDownMenuBefore) {

            document.getElementById("dropdownContainer").innerHTML += dropDownMenuBefore.outerHTML;
            dropDownMenuBefore.parentElement.setAttribute("id", "dropdownn")
            dropDownMenuBefore.outerHTML = "";

            var dropDownMenu = document.getElementById("dropdownContainer").childNodes[0];

            if (dropdownConfig.isSecondaryClickEnabled) {
                dropDownMenu.classList.add("secondary-click");
            }

            if (dropdownConfig.isFixedPositioningEnabled) {
                dropDownMenu.style.position = "fixed";
            }

            function menuPositionCalculation() {
                var posX = event.pageX;
                var posY = event.pageY;

                if (dropdownConfig.isFixedPositioningEnabled) {
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

            if (dropdownConfig.isScalingBounceEnabled) {
                dropDownMenu.style.transition = "transform " + dropdownConfig.scalingBounceDurationSeconds + "s " + dropdownConfig.scalingBouncyCurveType;
                dropDownMenu.style.filter = "blur(0px)";
                dropDownMenu.style.opacity = "100%";

                menuPositionCalculation();
                setTimeout(() => {
                    dropDownMenu.style.transform = "scale(1.01)";
                    setTimeout(() => {
                        dropDownMenu.style.transform = "scale(1)";
                    }, dropdownConfig.scalingBounceDurationSeconds * 1000 + 50);
                }, 0.1);

            } else if (dropdownConfig.isScalingBlurEnabled) {
                dropDownMenu.style.opacity = "100%";
                dropDownMenu.style.transition = "filter " + dropdownConfig.scalingBlurDurationSeconds + "s " + dropdownConfig.scalingBlurCurveType + ", transform " + dropdownConfig.scalingBlurDurationSeconds + "s " + dropdownConfig.scalingBlurCurveType;

                menuPositionCalculation();
                setTimeout(() => {
                    dropDownMenu.style.transform = "scale(1)";
                    dropDownMenu.style.filter = "blur(0px)";
                }, 0.1);

            } else if (dropdownConfig.isScalingFadeEnabled) {
                dropDownMenu.style.filter = "blur(0px)";
                dropDownMenu.style.transition = "opacity " + dropdownConfig.scalingFadeDurationSeconds + "s " + dropdownConfig.scalingFadeCurveType + ", transform " + dropdownConfig.scalingFadeDurationSeconds + "s " + dropdownConfig.scalingFadeCurveType;

                menuPositionCalculation();
                setTimeout(() => {
                    dropDownMenu.style.opacity = "100%";
                    dropDownMenu.style.transform = "scale(1)";
                }, 0.1);

            } else if (dropdownConfig.isScalingEnabled) {
                dropDownMenu.style.filter = "blur(0px)";
                dropDownMenu.style.opacity = "100%";
                dropDownMenu.style.transition = "transform " + dropdownConfig.scalingDurationSeconds + "s " + dropdownConfig.scalingCurveType;

                menuPositionCalculation();
                setTimeout(() => {
                    dropDownMenu.style.transform = "scale(1)";
                }, 0.1);

            } else if (dropdownConfig.isFadingBlurEnabled) {
                dropDownMenu.style.transform = "scale(1)";
                dropDownMenu.style.transition = "filter " + dropdownConfig.fadingBlurDurationSeconds + "s " + dropdownConfig.fadeBlurCurveType + ", opacity " + dropdownConfig.fadingBlurDurationSeconds + "s " + dropdownConfig.fadeBlurCurveType;

                menuPositionCalculation();
                setTimeout(() => {
                    dropDownMenu.style.opacity = "100%";
                    dropDownMenu.style.filter = "blur(0px)";
                }, 0.1);

            } else if (dropdownConfig.isFadingEnabled) {
                dropDownMenu.style.filter = "blur(0px)";
                dropDownMenu.style.transform = "scale(1)";
                dropDownMenu.style.transition = "opacity " + dropdownConfig.fadingDurationSeconds + "s " + dropdownConfig.fadeCurveType;

                menuPositionCalculation();
                setTimeout(() => {
                    dropDownMenu.style.opacity = "100%";
                }, 0.1);

            } else {
                dropDownMenu.style.transition = "none";
                dropDownMenu.style.filter = "blur(0px)";
                dropDownMenu.style.opacity = "100%";
                dropDownMenu.style.transform = "scale(1)";
                menuPositionCalculation();
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

    if (event.target.classList.contains("dropdown") == true || event.target.classList.contains("dropdown-menu") == true || nodes.join().includes("dropdown-menu") == true && event.target.classList.contains("dismiss-button") == false) {
        if (!dropdownConfig.isDropdownEnabled) {
            dropdownConfig.isDropdownEnabled = true;

            if (!dropdownConfig.isSecondaryClickEnabled && event.button == 0) {
                openMenu();
            } else if (dropdownConfig.isSecondaryClickEnabled && event.button == 2) {
                openMenu();
            } else if (dropdownConfig.isSecondaryClickEnabled && event.button == 0) {
                dismissMenu();
            } else if (!dropdownConfig.isSecondaryClickEnabled && event.button == 2) {
                dismissMenu();
            }

        } else if (!dropdownConfig.shouldNotDismissAtTap) {
            dismissMenu();
        } else if (dropdownConfig.isSecondaryClickEnabled && event.button == 0 && !nodes.join().includes("dropdown-menu")) {
            dismissMenu();
        }

    } else {
        dismissMenu();
    }
}

window.onscroll = function(e) {
    if (dropdownConfig.shouldDismissWhileScrolling) {
        dismissMenu();
    }
}

function secondaryClick(event) {
    if (event.target.parentElement.classList.contains("secondary-click") || event.target.classList.contains("secondary-click")) {
        dropdownConfig.isSecondaryClickEnabled = true;
        event.preventDefault();
    }

}

function log(event) {
    if (event.target.classList.contains("dropdown") == false && !dropdownConfig.isDropdownEnabled) {
        dropdownConfig.shouldNotDismissAtTap = false;
        dropdownConfig.isScalingEnabled = false;
        dropdownConfig.isScalingBounceEnabled = false;
        dropdownConfig.isScalingBlurEnabled = false;
        dropdownConfig.isScalingFadeEnabled = false;
        dropdownConfig.isFadingEnabled = false;
        dropdownConfig.isFadingBlurEnabled = false;
        dropdownConfig.isSecondaryClickEnabled = false;
        dropdownConfig.isFixedPositioningEnabled = false;
    }

    console.log(event.target.classList.toString());
    console.log("dropdownEnabled: " + dropdownConfig.isDropdownEnabled);
    console.log("dontDismissAtTapEnabled: " + dropdownConfig.shouldNotDismissAtTap);
    console.log("scalingEnabled: " + dropdownConfig.isScalingEnabled);
    console.log("scalingBouncyEnabled: " + dropdownConfig.isScalingBounceEnabled);
    console.log("scalingBlurEnabled: " + dropdownConfig.isScalingBlurEnabled);
    console.log("scalingFadeEnabled: " + dropdownConfig.isScalingFadeEnabled);
    console.log("fadeEnabled: " + dropdownConfig.isFadingEnabled);
    console.log("fadeBlurEnabled: " + dropdownConfig.isFadingBlurEnabled);
    console.log("secondaryClickEnabled: " + dropdownConfig.isSecondaryClickEnabled);
    console.log("fixedPosEnabled: " + dropdownConfig.isFixedPositioningEnabled);
}