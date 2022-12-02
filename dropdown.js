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

var isDropdownEnabled = false; // old name: dropdownEnabled
var shouldNotDismissAtTap = false; // old name: dontDismissAtTapEnabled, TODO: invert this variable!
var shouldDismissWhileScrolling = false; // old name: dismissWhileScrolling
var isSecondaryClickEnabled = false; // old name: secondaryClickEnabled
var isFixedPositioningEnabled = false; // old name: fixedPosEnabled

var isScalingEnabled = false; // old name: scalingEnabled
var isScalingBounceEnabled = false; // old name: scalingBouncyEnabled
var isScalingBlurEnabled = false; // old name: scalingBlurEnabled
var scalingFadeEnabled = false;
var fadeEnabled = false;
var fadeBlurEnabled = false;

var scalingDuration = 0.2;
var scalingBouncyDuration = 0.2;
var scalingBlurDuration = 0.2;
var scalingFadeDuration = 0.2;
var fadeDuration = 0.2;
var fadeBlurDuration = 0.2;

var scalingCurveType = "";
var scalingBouncyCurveType = "";
var scalingBlurCurveType = "";
var scalingFadeCurveType = "";
var fadeCurveType = "";
var fadeBlurCurveType = "";

// Dropdown Menus

function dismissMenu() {
    isDropdownEnabled = false;

    var dismissDuration = 0;
    var dropDownMenu = document.getElementById("dropdownContainer").childNodes[0];

    if (isScalingBlurEnabled) {
        dismissDuration = scalingBlurDuration;
        dropDownMenu.style.transform = "scale(0)";
        dropDownMenu.style.filter = "blur(30px)";
        setTimeout(() => {
            dropDownMenu.style.opacity = "0%";
        }, scalingBlurDuration * 1000);

    } else if (isScalingBounceEnabled) {
        dismissDuration = scalingBouncyDuration;
        dropDownMenu.style.transform = "scale(0)";

    } else if (fadeBlurEnabled) {
        dismissDuration = fadeBlurDuration;
        dropDownMenu.style.opacity = "0%";
        dropDownMenu.style.filter = "blur(30px)";
        setTimeout(() => {
            dropDownMenu.style.transform = "scale(0)";
        }, fadeBlurDuration * 1000);

    } else if (scalingFadeEnabled) {
        dismissDuration = scalingFadeDuration;
        dropDownMenu.style.opacity = "0%";
        dropDownMenu.style.transform = "scale(0)";
        setTimeout(() => {
            dropDownMenu.style.filter = "blur(30px)";
        }, scalingFadeDuration * 1000);

    } else if (isScalingEnabled) {
        dismissDuration = scalingDuration;
        dropDownMenu.style.transform = "scale(0)";

    } else if (fadeEnabled) {
        dismissDuration = fadeDuration;
        dropDownMenu.style.opacity = "0%";
        setTimeout(() => {
            dropDownMenu.style.transform = "scale(0)";
        }, fadeDuration * 1000);

    } else {
        dropDownMenu.style.transition = "none";
        dropDownMenu.style.filter = "blur(30px)";
        dropDownMenu.style.opacity = "0%";
        dropDownMenu.style.transform = "scale(0)";
    }

    setTimeout(() => {
        shouldNotDismissAtTap = false;
        isScalingEnabled = false;
        isScalingBounceEnabled = false;
        isScalingBlurEnabled = false;
        scalingFadeEnabled = false;
        fadeEnabled = false;
        fadeBlurEnabled = false;
        isSecondaryClickEnabled = false;
        isFixedPositioningEnabled = false;
        shouldDismissWhileScrolling = false;

        document.getElementById("dropdownn").innerHTML += dropDownMenu.outerHTML;
        dropDownMenu.outerHTML = "";
        document.getElementById("dropdownn").setAttribute("id", "");
    }, dismissDuration * 1000 + 50);
}

function menumove(event) {
    if (event.target.classList.contains("dont-dismiss-at-tap")) {
        shouldNotDismissAtTap = true;
    }

    if (event.target.classList.contains("dismiss-while-scrolling")) {
        shouldDismissWhileScrolling = true;
    }

    if (event.target.classList.contains("secondary-click")) {
        isSecondaryClickEnabled = true;
    }

    if (event.target.classList.contains("fixed-pos")) {
        isFixedPositioningEnabled = true;
    }

    // Animations

    if (event.target.classList.toString().indexOf("scaling") > -1) {
        isScalingEnabled = true;
        
        if(event.target.classList.toString().indexOf("@") > -1){
        var x = event.target.classList.toString().substring(event.target.classList.toString().indexOf("@"), event.target.classList.toString().length) + " ";
        

        var durationAndType = x.substring(0, x.indexOf(" ")) + "-";

        scalingDuration = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
        scalingCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }

    if (event.target.classList.toString().indexOf("scaling-bouncy") > -1) {
        isScalingBounceEnabled = true;

        if(event.target.classList.toString().indexOf("@") > -1){
        var x = event.target.classList.toString().substring(event.target.classList.toString().indexOf("@"), event.target.classList.toString().length) + " ";

        var durationAndType = x.substring(0, x.indexOf(" ")) + "-";

        scalingBouncyDuration = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
        scalingBouncyCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }

    if (event.target.classList.toString().indexOf("scaling-blur") > -1) {
        isScalingBlurEnabled = true;

        if(event.target.classList.toString().indexOf("@") > -1){
            var x = event.target.classList.toString().substring(event.target.classList.toString().indexOf("@"), event.target.classList.toString().length) + " ";

        var durationAndType = x.substring(0, x.indexOf(" ")) + "-";
        
        scalingBlurDuration = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
        scalingBlurCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }

    if (event.target.classList.toString().indexOf("scaling-fade") > -1) {
        scalingFadeEnabled = true;

        if(event.target.classList.toString().indexOf("@") > -1){
            var x = event.target.classList.toString().substring(event.target.classList.toString().indexOf("@"), event.target.classList.toString().length) + " ";

        var durationAndType = x.substring(0, x.indexOf(" ")) + "-";
        
        scalingFadeDuration = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
        scalingFadeCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }

    if (event.target.classList.toString().indexOf("fade") > -1) {
        fadeEnabled = true;

        if(event.target.classList.toString().indexOf("@") > -1){
            var x = event.target.classList.toString().substring(event.target.classList.toString().indexOf("@"), event.target.classList.toString().length) + " ";

        var durationAndType = x.substring(0, x.indexOf(" ")) + "-";
        
        fadeDuration = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
        fadeCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }

    if (event.target.classList.toString().indexOf("fade-blur") > -1) {
        fadeBlurEnabled = true;

        if(event.target.classList.toString().indexOf("@") > -1){
            var x = event.target.classList.toString().substring(event.target.classList.toString().indexOf("@"), event.target.classList.toString().length) + " ";

        var durationAndType = x.substring(0, x.indexOf(" ")) + "-";
        
        fadeBlurDuration = eval(durationAndType.substring(1, durationAndType.indexOf("-") - 1));
        fadeBlurCurveType = durationAndType.substring(durationAndType.indexOf("-") + 1, durationAndType.length - 1);
        }
    }


    function openMenu() {
        function dropDownOpen(dropDownMenuBefore) {

            document.getElementById("dropdownContainer").innerHTML += dropDownMenuBefore.outerHTML;
            dropDownMenuBefore.parentElement.setAttribute("id", "dropdownn")
            dropDownMenuBefore.outerHTML = "";

            var dropDownMenu = document.getElementById("dropdownContainer").childNodes[0];

            if (isSecondaryClickEnabled) {
                dropDownMenu.classList.add("secondary-click");
            }

            if (isFixedPositioningEnabled) {
                dropDownMenu.style.position = "fixed";
            }

            function menuPositionCalculation() {
                var posX = event.pageX;
                var posY = event.pageY;

                if (isFixedPositioningEnabled) {
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

            if (isScalingBounceEnabled) {
                dropDownMenu.style.transition = "transform " + scalingBouncyDuration + "s " + scalingBouncyCurveType;
                dropDownMenu.style.filter = "blur(0px)";
                dropDownMenu.style.opacity = "100%";

                menuPositionCalculation();
                setTimeout(() => {
                    dropDownMenu.style.transform = "scale(1.01)";
                    setTimeout(() => {
                        dropDownMenu.style.transform = "scale(1)";
                    }, scalingBouncyDuration * 1000 + 50);
                }, 0.1);

            } else if (isScalingBlurEnabled) {
                dropDownMenu.style.opacity = "100%";
                dropDownMenu.style.transition = "filter " + scalingBlurDuration + "s " + scalingBlurCurveType + ", transform " + scalingBlurDuration + "s " + scalingBlurCurveType;

                menuPositionCalculation();
                setTimeout(() => {
                    dropDownMenu.style.transform = "scale(1)";
                    dropDownMenu.style.filter = "blur(0px)";
                }, 0.1);

            } else if (scalingFadeEnabled) {
                dropDownMenu.style.filter = "blur(0px)";
                dropDownMenu.style.transition = "opacity " + scalingFadeDuration + "s " + scalingFadeCurveType + ", transform " + scalingFadeDuration + "s " + scalingFadeCurveType;

                menuPositionCalculation();
                setTimeout(() => {
                    dropDownMenu.style.opacity = "100%";
                    dropDownMenu.style.transform = "scale(1)";
                }, 0.1);

            } else if (isScalingEnabled) {
                dropDownMenu.style.filter = "blur(0px)";
                dropDownMenu.style.opacity = "100%";
                dropDownMenu.style.transition = "transform " + scalingDuration + "s " + scalingCurveType;

                menuPositionCalculation();
                setTimeout(() => {
                    dropDownMenu.style.transform = "scale(1)";
                }, 0.1);

            } else if (fadeBlurEnabled) {
                dropDownMenu.style.transform = "scale(1)";
                dropDownMenu.style.transition = "filter " + fadeBlurDuration + "s " + fadeBlurCurveType + ", opacity " + fadeBlurDuration + "s " + fadeBlurCurveType;

                menuPositionCalculation();
                setTimeout(() => {
                    dropDownMenu.style.opacity = "100%";
                    dropDownMenu.style.filter = "blur(0px)";
                }, 0.1);

            } else if (fadeEnabled) {
                dropDownMenu.style.filter = "blur(0px)";
                dropDownMenu.style.transform = "scale(1)";
                dropDownMenu.style.transition = "opacity " + fadeDuration + "s " + fadeCurveType;

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
        if (!isDropdownEnabled) {
            isDropdownEnabled = true;

            if (!isSecondaryClickEnabled && event.button == 0) {
                openMenu();
            } else if (isSecondaryClickEnabled && event.button == 2) {
                openMenu();
            } else if (isSecondaryClickEnabled && event.button == 0) {
                dismissMenu();
            } else if (!isSecondaryClickEnabled && event.button == 2) {
                dismissMenu();
            }

        } else if (!shouldNotDismissAtTap) {
            dismissMenu();
        } else if (isSecondaryClickEnabled && event.button == 0 && !nodes.join().includes("dropdown-menu")) {
            dismissMenu();
        }

    } else {
        dismissMenu();
    }
}

window.onscroll = function(e) {
    if (shouldDismissWhileScrolling) {
        dismissMenu();
    }
}

function secondaryClick(event) {
    if (event.target.parentElement.classList.contains("secondary-click") || event.target.classList.contains("secondary-click")) {
        isSecondaryClickEnabled = true;
        event.preventDefault();
    }

}

function log(event) {
    if (event.target.classList.contains("dropdown") == false && !isDropdownEnabled) {
        shouldNotDismissAtTap = false;
        isScalingEnabled = false;
        isScalingBounceEnabled = false;
        isScalingBlurEnabled = false;
        scalingFadeEnabled = false;
        fadeEnabled = false;
        fadeBlurEnabled = false;
        isSecondaryClickEnabled = false;
        isFixedPositioningEnabled = false;
    }

    console.log(event.target.classList.toString());
    console.log("dropdownEnabled: " + isDropdownEnabled);
    console.log("dontDismissAtTapEnabled: " + shouldNotDismissAtTap);
    console.log("scalingEnabled: " + isScalingEnabled);
    console.log("scalingBouncyEnabled: " + isScalingBounceEnabled);
    console.log("scalingBlurEnabled: " + isScalingBlurEnabled);
    console.log("scalingFadeEnabled: " + scalingFadeEnabled);
    console.log("fadeEnabled: " + fadeEnabled);
    console.log("fadeBlurEnabled: " + fadeBlurEnabled);
    console.log("secondaryClickEnabled: " + isSecondaryClickEnabled);
    console.log("fixedPosEnabled: " + isFixedPositioningEnabled);
}