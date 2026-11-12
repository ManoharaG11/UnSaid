
const confessionInput = document.getElementById("confessionInput");
const postButton = document.getElementById("postButton");
const confessionList = document.getElementById("confessionList");
const postCount = document.getElementById("postCount");
const charCount = document.getElementById("charCount");
const clearButton = document.getElementById("clearButton");

// Load saved posts or create sample posts
const samplePosts = [
    {
        id: 1,
        text: "Sometimes I smile just to hide what I really feel.",
        likes: 5,
        laughs: 2,
        fires: 3
    },
    {
        id: 2,
        text: "I want to make my parents proud, no matter how hard it gets.",
        likes: 8,
        laughs: 0,
        fires: 4
    },
    {
        id: 3,
        text: "I miss someone I cannot talk to anymore.",
        likes: 6,
        laughs: 1,
        fires: 2
    }
];

let confessions = JSON.parse(localStorage.getItem("unsaidPosts"));

if (!Array.isArray(confessions)) {
    confessions = samplePosts;
    savePosts();
}

// Save posts in browser storage
function savePosts() {
    localStorage.setItem("unsaidPosts", JSON.stringify(confessions));
}

// Display all confessions
function displayPosts() {
    confessionList.innerHTML = "";

    postCount.textContent = `${confessions.length} POSTS`;

    if (confessions.length === 0) {
        confessionList.innerHTML =
            '<p class="empty-message">The wall is quiet. Be the first to say something.</p>';
        return;
    }

    confessions.forEach((post) => {
        const card = document.createElement("article");
        card.className = "confession-card";

        const label = document.createElement("p");
        label.className = "anonymous-label";
        label.textContent = "◉ ANONYMOUS";

        const message = document.createElement("p");
        message.className = "confession-text";
        message.textContent = post.text;

        const reactions = document.createElement("div");
        reactions.className = "reaction-row";

        const reactionTypes = [
            { key: "likes", emoji: "❤️" },
            { key: "laughs", emoji: "😂" },
            { key: "fires", emoji: "🔥" }
        ];

        reactionTypes.forEach((reaction) => {
            const button = document.createElement("button");
            button.className = "reaction-button";
            button.textContent =
                `${reaction.emoji} ${post[reaction.key] || 0}`;

            button.addEventListener("click", () => {
                post[reaction.key] = (post[reaction.key] || 0) + 1;
                savePosts();
                displayPosts();
            });

            reactions.appendChild(button);
        });

        card.appendChild(label);
        card.appendChild(message);
        card.appendChild(reactions);

        confessionList.appendChild(card);
    });
}

// Character counter
confessionInput.addEventListener("input", () => {
    charCount.textContent =
        `${confessionInput.value.length} / 300`;
});

// Add a new anonymous confession
postButton.addEventListener("click", () => {
    const message = confessionInput.value.trim();

    if (message.length === 0) {
        alert("Please write something before posting!");
        return;
    }

    const newPost = {
        id: Date.now(),
        text: message,
        likes: 0,
        laughs: 0,
        fires: 0
    };

    confessions.unshift(newPost);

    savePosts();
    displayPosts();

    confessionInput.value = "";
    charCount.textContent = "0 / 300";
});

// Clear all posts
clearButton.addEventListener("click", () => {
    const confirmClear = confirm(
        "Are you sure you want to delete all confessions?"
    );

    if (confirmClear) {
        confessions = [];
        savePosts();
        displayPosts();
    }
});

// Initial display
displayPosts();
