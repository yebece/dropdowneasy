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

// Animations definitions
var ddeAnimations = {
    none: {
        duration: 0,
        curveType: "",

        dismissMenu: function(dropDownMenu) {
            dropDownMenu.style.transition = "none";
            dropDownMenu.style.filter = "blur(30px)";
            dropDownMenu.style.opacity = "0%";
            dropDownMenu.style.transform = "scale(0)";
        },

        dropDownOpen: function(dropDownMenu) {
            dropDownMenu.style.transition = "none";
            dropDownMenu.style.filter = "blur(0px)";
            dropDownMenu.style.opacity = "100%";
            dropDownMenu.style.transform = "scale(1)";
        }
    },

    scalingBlur: { 
        duration: 0.2,
        curveType: "",

        dismissMenu: function(dropDownMenu) {
            dropDownMenu.style.transform = "scale(0)";
            dropDownMenu.style.filter = "blur(30px)";
            setTimeout(() => {
                dropDownMenu.style.opacity = "0%";
            }, this.duration * 1000);
        },

        dropDownOpen: function(dropDownMenu) {
            dropDownMenu.style.opacity = "100%";
            dropDownMenu.style.transition = 
                "filter " + this.duration + "s " + this.curveType + 
                ", transform " + this.duration + "s " + this.curveType;

            setTimeout(() => {
                dropDownMenu.style.transform = "scale(1)";
                dropDownMenu.style.filter = "blur(0px)";
            }, 0.1);
        }
    },

    scalingBounce: { 
        duration: 0.2,
        curveType: "",

        dismissMenu: function(dropDownMenu) {
            dropDownMenu.style.transform = "scale(0)";
        },

        dropDownOpen: function(dropDownMenu) {
            dropDownMenu.style.transition = "transform " + this.duration + "s " + this.curveType;
            dropDownMenu.style.filter = "blur(0px)";
            dropDownMenu.style.opacity = "100%";

            setTimeout(() => {
                dropDownMenu.style.transform = "scale(1.01)";
                setTimeout(() => {
                    dropDownMenu.style.transform = "scale(1)";
                }, this.duration * 1000 + 50);
            }, 0.1);
        }
    },

    fadingBlur: { 
        duration: 0.2,
        curveType: "",

        dismissMenu: function(dropDownMenu) {
            dropDownMenu.style.opacity = "0%";
            dropDownMenu.style.filter = "blur(30px)";
            setTimeout(() => {
                dropDownMenu.style.transform = "scale(0)";
            }, this.duration * 1000);
        },

        dropDownOpen: function(dropDownMenu) {
            dropDownMenu.style.transform = "scale(1)";
            dropDownMenu.style.transition = 
                "filter " + this.duration + "s " + this.curveType + 
                ", opacity " + this.duration + "s " + this.curveType;
            
            setTimeout(() => {
                dropDownMenu.style.opacity = "100%";
                dropDownMenu.style.filter = "blur(0px)";
            }, 0.1);
        }
    },

    scalingFade: { 
        duration: 0.2, 
        curveType: "",

        dismissMenu: function(dropDownMenu) {
            dropDownMenu.style.opacity = "0%";
            dropDownMenu.style.transform = "scale(0)";
            setTimeout(() => {
                dropDownMenu.style.filter = "blur(30px)";
            }, this.duration * 1000);
        },

        dropDownOpen: function(dropDownMenu) {
            dropDownMenu.style.filter = "blur(0px)";
            dropDownMenu.style.transition = 
                "opacity " + this.duration + "s " + this.curveType + 
                ", transform " + this.duration + "s " + this.curveType;

            setTimeout(() => {
                dropDownMenu.style.opacity = "100%";
                dropDownMenu.style.transform = "scale(1)";
            }, 0.1);
        }
    },

    scaling: { 
        duration: 0.2,
        curveType: "",

        dismissMenu: function(dropDownMenu) {
            dropDownMenu.style.transform = "scale(0)";
        },

        dropDownOpen: function(dropDownMenu) {
            dropDownMenu.style.filter = "blur(0px)";
            dropDownMenu.style.opacity = "100%";
            dropDownMenu.style.transition = "transform " + this.duration + "s " + this.curveType;
            
            setTimeout(() => {
                dropDownMenu.style.transform = "scale(1)";
            }, 0.1);
        }
    },

    fading: { 
        duration: 0.2,
        curveType: "",

        dismissMenu: function(dropDownMenu) {
            dropDownMenu.style.opacity = "0%";
            setTimeout(() => {
                dropDownMenu.style.transform = "scale(0)";
            }, this.duration * 1000);
        },

        dropDownOpen: function(dropDownMenu) {
            dropDownMenu.style.filter = "blur(0px)";
            dropDownMenu.style.transform = "scale(1)";
            dropDownMenu.style.transition = "opacity " + this.duration + "s " + this.curveType;

            setTimeout(() => {
                dropDownMenu.style.opacity = "100%";
            }, 0.1);
        }
    },
};

function DropdownEasyConfiguration() {
    this.isDropdownEnabled = false; // old name: dropdownEnabled
    this.shouldNotDismissAtTap = false; // old name: dontDismissAtTapEnabled, TODO: invert this variable!
    this.shouldDismissWhileScrolling = false; // old name: dismissWhileScrolling
    this.isSecondaryClickEnabled = false; // old name: secondaryClickEnabled
    this.isFixedPositioningEnabled = false; // old name: fixedPosEnabled
    
    this.scalingBouncyCurveType = "";
    this.scalingBounceDurationSeconds = 0.2;
    this.isScalingBounceEnabled = false; // old name: scalingBouncyEnabled

    this.isScalingBlurEnabled = false; // old name: scalingBlurEnabled
    this.scalingBlurDurationSeconds = 0.2;
    this.scalingBlurCurveType = "";

    this.isScalingFadeEnabled = false; // old name: scalingFadeEnabled
    this.scalingFadeDurationSeconds = 0.2;
    this.scalingFadeCurveType = "";

    this.isFadingEnabled = false; // old name: fadeEnabled
    this.fadingDurationSeconds = 0.2;
    this.fadeCurveType = "";

    this.isScalingEnabled = false; // old name: scalingEnabled
    this.scalingDurationSeconds = 0.2;
    this.scalingCurveType = "";

    this.isFadingBlurEnabled = false; // old name: fadeBlurEnabled
    this.fadingBlurDurationSeconds = 0.2;
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

// Dropdown Menus

function selectAnimation() {
    if (ddeConfig.isScalingBlurEnabled) {
        return ddeAnimations.scalingBlur;
    } else if (ddeConfig.isScalingBounceEnabled) {
        return ddeAnimations.scalingBounce;
    } else if (ddeConfig.isFadingBlurEnabled) {
        return ddeAnimations.fadingBlur;
    } else if (ddeConfig.isScalingFadeEnabled) {
        return ddeAnimations.scalingFade;
    } else if (ddeConfig.isScalingEnabled) {
        return ddeAnimations.scaling;
    } else if (ddeConfig.isFadingEnabled) {
        return ddeAnimations.fading;
    } else {
        return ddeAnimations.none;
    }
}

function dismissMenu() {
    ddeConfig.isDropdownEnabled = false;

    var dropDownMenu = document.getElementById("dropdownContainer").childNodes[0];
    var animation = selectAnimation();

    animation.dismissMenu(dropDownMenu);

    setTimeout(() => {
        ddeConfig.resetState();

        document.getElementById("dropdownn").innerHTML += dropDownMenu.outerHTML;
        dropDownMenu.outerHTML = "";
        document.getElementById("dropdownn").setAttribute("id", "");
    }, animation.duration * 1000 + 50);
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

            ddeConfig.scalingDurationSeconds = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
            ddeConfig.scalingCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }

    if (classString.indexOf("scaling-bouncy") > -1) {
        ddeConfig.isScalingBounceEnabled = true;

        if (classString.indexOf("@") > -1) {
            var x = classString.substring(classString.indexOf("@"), classString.length) + " ";
            var durationAndType = x.substring(0, x.indexOf(" ")) + "-";

            ddeConfig.scalingBounceDurationSeconds = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
            ddeConfig.scalingBouncyCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }

    if (classString.indexOf("scaling-blur") > -1) {
        ddeConfig.isScalingBlurEnabled = true;

        if (classString.indexOf("@") > -1) {
            var x = classString.substring(classString.indexOf("@"), classString.length) + " ";
            var durationAndType = x.substring(0, x.indexOf(" ")) + "-";

            ddeConfig.scalingBlurDurationSeconds = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
            ddeConfig.scalingBlurCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }

    if (classString.indexOf("scaling-fade") > -1) {
        ddeConfig.isScalingFadeEnabled = true;

        if (classString.indexOf("@") > -1) {
            var x = classString.substring(classString.indexOf("@"), classString.length) + " ";
            var durationAndType = x.substring(0, x.indexOf(" ")) + "-";

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

            var animation = selectAnimation();
            animation.dropDownOpen(dropDownMenu);
            menuPositionCalculation();
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