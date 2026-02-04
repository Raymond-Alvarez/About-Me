'use strict';

// 1. Create a global "Live Flag" outside the onload function
let isQuizRunning = false;

window.onload = () => {
    console.log("Operational Precision: System Online.");

    const header = document.querySelector('header');
    const cards = document.querySelectorAll('.card');
    
    if (header) {
        const spacer = document.createElement('div');
        spacer.className = 'header-spacer';
        header.after(spacer);
    }

    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('reveal');
        }, index * 150);
    });

    window.onscroll = () => {
        if (window.pageYOffset > 80) {
            header.classList.add('shrink');
            document.body.classList.add('fixed-header');
        } else {
            header.classList.remove('shrink');
            document.body.classList.remove('fixed-header');
        }
    };

    const runQuiz = () => {
        // SAFETY CHECK: If the quiz is already active, kill this attempt to start it again
        if (isQuizRunning) return;
        
        isQuizRunning = true; // Lock the quiz
        console.log("Quiz Lock Engaged. Starting questions...");

        let userName = prompt("Hi! I'm Raymond. What's your name?");
        if (!userName) { userName = "Friend"; }
        alert("Nice to meet you, " + userName + "!");

        let score = 0;
        const quizData = [
            ["Is 'smooth is fast' my philosophy? (y/n)", "y", "yes"],
            ["Do I prefer clever code over simple code? (y/n)", "n", "no"],
            ["Is a rubber duck a valid team member? (y/n)", "y", "yes"],
            ["Are technical skills the only thing a dev needs? (y/n)", "n", "no"],
            ["Will I ever stop learning? (y/n)", "n", "no"]
        ];

        for (let i = 0; i < quizData.length; i++) {
            let response = prompt(quizData[i][0]);
            let normalized = (response || "").toLowerCase().trim();
            if (normalized === quizData[i][1] || normalized === quizData[i][2]) {
                score++;
                alert("Correct!");
            } else {
                alert("Not quite!");
            }
        }

        const secretNum = 7;
        for (let i = 1; i <= 4; i++) {
            let guess = parseInt(prompt("Q6: Guess a number 1-10 (Attempt " + i + "/4)"));
            if (guess === secretNum) {
                score++;
                alert("Spot on! The number was 7.");
                break; 
            } else {
                alert(guess > secretNum ? "Too high!" : "Too low!");
            }
        }

        const hobbies = ["coding", "hiking", "photography", "gaming", "cooking"];
        for (let i = 1; i <= 6; i++) {
            let hGuess = (prompt("Q7: Guess one of my hobbies (Attempt " + i + "/6)") || "").toLowerCase().trim();
            if (hobbies.includes(hGuess)) {
                score++;
                alert("Yes! " + hGuess + " is definitely on the list.");
                break; 
            }
        }

        alert("Final Results for " + userName + ": " + score + "/7. Thanks for playing!");
        
        window.scrollTo(0, 0);
        
        // Note: We do NOT set isQuizRunning back to false here. 
        // This ensures it only runs once per page load.
    };

    setTimeout(runQuiz, 1000);
};