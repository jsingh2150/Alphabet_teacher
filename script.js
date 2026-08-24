/* =========================================
   ALPHABET DATA
========================================= */

const uppercaseLetters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const lowercaseLetters =
    "abcdefghijklmnopqrstuvwxyz".split("");



/* =========================================
   TOTAL CARDS
========================================= */

/*
   26 alphabet cards
   +
   1 Complete card
   =
   27 total cards
*/

const TOTAL_LETTERS = 26;

const TOTAL_CARDS = 27;



/* =========================================
   CURRENT ALPHABET
========================================= */

let letters = [...uppercaseLetters];

let currentIndex = 0;



/* =========================================
   COMPLETED LETTERS
========================================= */

let completedLetters = new Set();



/* =========================================
   COMPLETE CARD
========================================= */

const COMPLETE_CARD =
    "🎉 Complete!";



/* =========================================
   HTML ELEMENTS
========================================= */

const card =
    document.getElementById("card");

const cardNumber =
    document.getElementById("cardNumber");

const counter =
    document.getElementById("counter");

const progressBar =
    document.getElementById("progressBar");

const nextBtn =
    document.getElementById("nextBtn");

const prevBtn =
    document.getElementById("prevBtn");

const randomBtn =
    document.getElementById("randomBtn");

const shuffleBtn =
    document.getElementById("shuffleBtn");

const caseToggle =
    document.getElementById("caseToggle");

const resetBtn =
    document.getElementById("resetBtn");



/* =========================================
   IS COMPLETE CARD?
========================================= */

function isCompleteCard() {

    return currentIndex >= letters.length;

}



/* =========================================
   COMPLETE CURRENT LETTER
========================================= */

function completeCurrentLetter() {


    /*
       Don't count the Complete card.
    */

    if (isCompleteCard()) {

        return;

    }


    /*
       Convert lowercase to uppercase
       so A and a are considered
       the same letter.
    */

    const letter =
        letters[currentIndex].toUpperCase();


    /*
       Set automatically prevents
       duplicate letters from being
       counted more than once.
    */

    completedLetters.add(letter);

}



/* =========================================
   UPDATE CARD NUMBER
========================================= */

function updateCardNumber() {


    /*
       Complete card = card 27
    */

    if (isCompleteCard()) {

        cardNumber.textContent =
            "Card 27 of 27";

        return;

    }


    /*
       Normal letter cards
    */

    cardNumber.textContent =
        `Card ${currentIndex + 1} of 27`;

}



/* =========================================
   UPDATE COUNTER
========================================= */

function updateCounter() {


    const completed =
        completedLetters.size;


    const remaining =
        TOTAL_LETTERS - completed;


    /*
       COMPLETE
    */

    if (completed === TOTAL_LETTERS) {

        counter.textContent =
            "🎉 All 26 letters completed!";

        counter.style.color =
            "#16a34a";

    }


    /*
       NORMAL
    */

    else {

        counter.textContent =
            `${completed} of 26 letters completed • ${remaining} remaining`;

        counter.style.color =
            "#4b5563";

    }



    /* =================================
       PROGRESS BAR
    ================================= */

    const percentage =
        (completed / TOTAL_LETTERS) * 100;


    progressBar.style.width =
        `${percentage}%`;

}



/* =========================================
   UPDATE CARD
========================================= */

function updateCard() {


    /*
       Fade out
    */

    card.style.opacity =
        "0";

    card.style.transform =
        "scale(0.85)";


    setTimeout(() => {


        /* =================================
           COMPLETE CARD
        ================================= */

        if (isCompleteCard()) {

            card.textContent =
                COMPLETE_CARD;

            card.style.background =
                "#22c55e";

            card.style.color =
                "white";

            card.style.fontSize =
                "70px";

        }


        /* =================================
           NORMAL LETTER
        ================================= */

        else {

            card.textContent =
                letters[currentIndex];

            card.style.background =
                "white";

            card.style.color =
                "#111827";

            card.style.fontSize =
                "";

        }


        /*
           Fade in
        */

        card.style.opacity =
            "1";

        card.style.transform =
            "scale(1)";


        /*
           Update information
        */

        updateCardNumber();

        updateCounter();


    }, 120);

}



/* =========================================
   NEXT
========================================= */

function nextLetter() {


    /*
       If we're on Complete,
       Start Over automatically
       when Next is clicked.
    */

    if (isCompleteCard()) {

        currentIndex = 0;

        updateCard();

        return;

    }


    /*
       Complete current card
       before moving forward.
    */

    completeCurrentLetter();


    /*
       If all 26 letters have
       been completed, show
       Card 27.
    */

    if (
        completedLetters.size ===
        TOTAL_LETTERS
    ) {

        currentIndex =
            letters.length;

        updateCard();

        return;

    }


    /*
       Move to next letter.
    */

    currentIndex++;


    /*
       Safety check.
    */

    if (
        currentIndex >=
        letters.length
    ) {

        currentIndex =
            letters.length - 1;

    }


    updateCard();

}



/* =========================================
   PREVIOUS
========================================= */

function previousLetter() {


    /*
       If we're on Complete,
       go back to Z.
    */

    if (isCompleteCard()) {

        currentIndex =
            letters.length - 1;

        updateCard();

        return;

    }


    /*
       Move backward.
    */

    currentIndex--;


    /*
       If we're before A,
       go to Z.
    */

    if (currentIndex < 0) {

        currentIndex =
            letters.length - 1;

    }


    updateCard();

}



/* =========================================
   RANDOM
========================================= */

function randomLetter() {


    /*
       If lesson is complete,
       don't randomly select
       another card.
    */

    if (
        completedLetters.size ===
        TOTAL_LETTERS
    ) {

        return;

    }


    /*
       Pick random letter.
    */

    currentIndex =
        Math.floor(
            Math.random() *
            letters.length
        );


    /*
       Complete that letter.
    */

    completeCurrentLetter();


    /*
       If this was the final
       uncompleted letter,
       show Complete.
    */

    if (
        completedLetters.size ===
        TOTAL_LETTERS
    ) {

        currentIndex =
            letters.length;

    }


    updateCard();

}



/* =========================================
   SHUFFLE
========================================= */

function shuffleLetters() {


    /*
       Don't shuffle completed
       lesson.
    */

    if (
        completedLetters.size ===
        TOTAL_LETTERS
    ) {

        return;

    }


    /*
       Fisher-Yates shuffle.
    */

    for (
        let i =
            letters.length - 1;

        i > 0;

        i--
    ) {


        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            letters[i],
            letters[j]
        ] =
        [
            letters[j],
            letters[i]
        ];

    }


    /*
       Start at first shuffled
       letter.
    */

    currentIndex = 0;


    updateCard();

}



/* =========================================
   BUTTON EVENTS
========================================= */

nextBtn.addEventListener(
    "click",
    nextLetter
);


prevBtn.addEventListener(
    "click",
    previousLetter
);


randomBtn.addEventListener(
    "click",
    randomLetter
);


shuffleBtn.addEventListener(
    "click",
    shuffleLetters
);



/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
    "keydown",
    function(event) {


        /*
           Right Arrow = Next
        */

        if (
            event.key ===
            "ArrowRight"
        ) {

            nextLetter();

        }


        /*
           Left Arrow = Previous
        */

        if (
            event.key ===
            "ArrowLeft"
        ) {

            previousLetter();

        }


        /*
           Space = Random
        */

        if (
            event.key ===
            " "
        ) {

            event.preventDefault();

            randomLetter();

        }

    }
);



/* =========================================
   UPPERCASE / LOWERCASE
========================================= */

caseToggle.addEventListener(
    "change",
    function() {


        /*
           Save current letter.
        */

        let currentLetter = null;


        if (!isCompleteCard()) {

            currentLetter =
                letters[currentIndex];

        }


        /*
           Switch alphabet.
        */

        if (this.checked) {

            letters =
                [...lowercaseLetters];

        }

        else {

            letters =
                [...uppercaseLetters];

        }


        /*
           If on Complete,
           remain on Card 27.
        */

        if (
            currentLetter === null
        ) {

            currentIndex =
                letters.length;

        }

        else {

            /*
               Find same letter
               in new alphabet.
            */

            currentIndex =
                letters.findIndex(
                    letter =>
                        letter.toUpperCase() ===
                        currentLetter.toUpperCase()
                );


            if (
                currentIndex < 0
            ) {

                currentIndex = 0;

            }

        }


        updateCard();

    }
);



/* =========================================
   START OVER
========================================= */

resetBtn.addEventListener(
    "click",
    function() {


        /*
           Clear all progress.
        */

        completedLetters.clear();


        /*
           Restore alphabet order.
        */

        if (
            caseToggle.checked
        ) {

            letters =
                [...lowercaseLetters];

        }

        else {

            letters =
                [...uppercaseLetters];

        }


        /*
           Return to Card 1.
        */

        currentIndex = 0;


        /*
           Update screen.
        */

        updateCard();

    }
);



/* =========================================
   INITIALIZE
========================================= */

updateCard();
