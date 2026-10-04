let currentProblem = "";

let conversationStep = 0;

let userName = "";


/* PROBLEM DATABASE */

const problems = {

    attendance: {
        keywords: [
            "attendance",
            "absent",
            "absence",
            "percentage",
            "shortage"
        ],

        name: "Attendance Issue",

        priority: "HIGH",

        action: "Check your attendance record and contact your class advisor."
    },


    exam: {
        keywords: [
            "exam",
            "examination",
            "test",
            "missed exam",
            "miss exam"
        ],

        name: "Examination Issue",

        priority: "HIGH",

        action: "Contact your faculty or examination office as soon as possible."
    },


    idcard: {
        keywords: [
            "id card",
            "identity card",
            "lost id",
            "college id"
        ],

        name: "ID Card Issue",

        priority: "MEDIUM",

        action: "Report the lost card and contact the student services office."
    },


    programming: {
        keywords: [
            "programming",
            "coding",
            "code",
            "python",
            "java",
            "javascript",
            "program"
        ],

        name: "Programming Learning Issue",

        priority: "NORMAL",

        action: "Break the topic into smaller concepts and practice simple examples first."
    },


    assignment: {
        keywords: [
            "assignment",
            "homework",
            "project",
            "submission",
            "deadline"
        ],

        name: "Assignment Issue",

        priority: "MEDIUM",

        action: "Check the submission deadline and contact your faculty if you need clarification."
    },


    study: {
        keywords: [
            "study",
            "studying",
            "concentrate",
            "focus",
            "time",
            "timetable"
        ],

        name: "Study Management Issue",

        priority: "NORMAL",

        action: "Create a short study schedule and divide large topics into smaller tasks."
    }

};


/* ADD MESSAGE */

function addMessage(text, sender) {

    const chatBox =
        document.getElementById("chatBox");

    const message =
        document.createElement("div");

    message.className =
        "message " + sender;

    const bubble =
        document.createElement("div");

    bubble.className = "bubble";

    bubble.textContent = text;

    message.appendChild(bubble);

    chatBox.appendChild(message);

    chatBox.scrollTop =
        chatBox.scrollHeight;
}


/* SHOW TYPING */

function showTyping() {

    document
        .getElementById("typing")
        .classList.remove("hidden");
}


/* HIDE TYPING */

function hideTyping() {

    document
        .getElementById("typing")
        .classList.add("hidden");
}


/* DETECT PROBLEM */

function detectProblem(text) {

    const lower =
        text.toLowerCase();

    let bestMatch = null;

    let highestScore = 0;


    for (const key in problems) {

        let score = 0;

        for (const word of problems[key].keywords) {

            if (lower.includes(word)) {

                score++;
            }
        }


        if (score > highestScore) {

            highestScore = score;

            bestMatch = key;
        }
    }


    return bestMatch;
}


/* UPDATE ANALYSIS */

function updateAnalysis(problemKey) {

    const problem =
        problems[problemKey];


    document.getElementById("problemType")
        .textContent = problem.name;


    const priority =
        document.getElementById("priority");


    priority.textContent =
        problem.priority;


    priority.className =
        "priority " +
        problem.priority.toLowerCase();


    document.getElementById("nextAction")
        .textContent = problem.action;


    document.getElementById("progressBar")
        .style.width = "70%";


    document.getElementById("progressText")
        .textContent = "70% analyzed";
}


/* BOT RESPONSE */

function generateResponse(problemKey, text) {

    if (!problemKey) {

        return "I’m not completely sure what problem you are facing. Could you describe it with a little more detail?";
    }


    const lower =
        text.toLowerCase();


    /* ATTENDANCE */

    if (problemKey === "attendance") {

        if (
            lower.includes("%") ||
            /\b\d+\b/.test(lower)
        ) {

            return "Thanks for the details. Since this is an attendance-related issue, your next step should be to verify the official attendance record and speak with your class advisor about the available options.";
        }

        return "I understand. Is your attendance below the required percentage?";
    }


    /* EXAM */

    if (problemKey === "exam") {

        if (
            lower.includes("missed") ||
            lower.includes("miss")
        ) {

            return "Since you missed an examination, contact the concerned faculty or examination office immediately. Explain the situation and ask about the official procedure for your case.";
        }

        return "Is this about a missed examination, exam preparation, or an examination schedule?";
    }


    /* ID CARD */

    if (problemKey === "idcard") {

        return "For a lost ID card, first report it to the appropriate student-services office. Ask about the replacement procedure and whether any temporary identification is available.";
    }


    /* PROGRAMMING */

    if (problemKey === "programming") {

        return "Programming can become easier when you break the problem into small steps. Tell me which language or topic is troubling you, and I can help you identify where to start.";
    }


    /* ASSIGNMENT */

    if (problemKey === "assignment") {

        return "For an assignment problem, first check the exact requirements and deadline. If something is unclear or you may miss the deadline, contact your faculty as early as possible.";
    }


    /* STUDY */

    if (problemKey === "study") {

        return "Try dividing your study session into small tasks instead of trying to finish everything at once. Which subject or topic are you struggling to manage?";
    }


    return "I understand. Tell me a little more about the situation so I can guide you better.";
}


/* SEND MESSAGE */

function sendMessage() {

    const input =
        document.getElementById("userInput");

    const text =
        input.value.trim();


    if (!text) {

        return;
    }


    addMessage(text, "user");

    input.value = "";


    showTyping();


    setTimeout(() => {

        hideTyping();


        const detected =
            detectProblem(text);


        if (detected) {

            currentProblem = detected;

            updateAnalysis(detected);

            conversationStep++;

        }


        const response =
            generateResponse(
                detected || currentProblem,
                text
            );


        addMessage(response, "bot");


        updateProgress();


    }, 700);

}


/* QUICK MESSAGE */

function quickMessage(text) {

    document.getElementById("userInput")
        .value = text;

    sendMessage();
}


/* ENTER KEY */

function handleEnter(event) {

    if (event.key === "Enter") {

        sendMessage();
    }
}


/* PROGRESS */

function updateProgress() {

    let progress =
        Math.min(
            70 + conversationStep * 10,
            100
        );


    document.getElementById("progressBar")
        .style.width = progress + "%";


    document.getElementById("progressText")
        .textContent =
        progress + "% analyzed";
}


/* CLEAR CHAT */

function clearChat() {

    document.getElementById("chatBox")
        .innerHTML = "";


    currentProblem = "";

    conversationStep = 0;


    document.getElementById("problemType")
        .textContent = "Waiting for input";


    document.getElementById("priority")
        .textContent = "NORMAL";


    document.getElementById("priority")
        .className = "priority normal";


    document.getElementById("nextAction")
        .textContent =
        "Tell me about your problem to begin.";


    document.getElementById("progressBar")
        .style.width = "0%";


    document.getElementById("progressText")
        .textContent =
        "0% analyzed";
}
