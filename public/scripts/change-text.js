// TODO: Change to pure javascript\
const text = ['ақындық', 'шешендік', 'музыкалық'];

let counter = 0;
const elem = $("#greeting");

function change() {
    elem.fadeOut(function () {
        elem.html(text[counter]);
        counter++;
        if (counter >= text.length) {
            counter = 0;
        }
        elem.fadeIn();
    });
}

setInterval(change, 2000);

// dataWord(); // If you don't use external fonts use this on DOM ready; otherwise use:
// $(window).on("load", dataWord);