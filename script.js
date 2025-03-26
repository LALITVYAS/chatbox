document.addEventListener("DOMContentLoaded", function () {
    loadUsers();
    loadChatFromLocalStorage();
    loadBackgroundImageFromLocalStorage();
});

function loadUsers() {
    const userList = document.getElementById("userList");
    const users = [
    { name: "John Mayers", role: "Accountant", avatar: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "Tony Stark", role: "Engineer", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
    { name: "S. Johansson", role: "Actress", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
    { name: "Bruce Wayne", role: "Businessman", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
    { name: "Diana Prince", role: "Archaeologist", avatar: "https://randomuser.me/api/portraits/women/2.jpg" },
    { name: "Peter Parker", role: "Photographer", avatar: "https://randomuser.me/api/portraits/men/4.jpg" },
    { name: "Clark Kent", role: "Journalist", avatar: "https://randomuser.me/api/portraits/men/5.jpg" },
    { name: "Natasha Romanoff", role: "Spy", avatar: "https://randomuser.me/api/portraits/women/3.jpg" },
    { name: "Steve Rogers", role: "Soldier", avatar: "https://randomuser.me/api/portraits/men/6.jpg" },
    { name: "Wanda Maximoff", role: "Sorceress", avatar: "https://randomuser.me/api/portraits/women/4.jpg" }
];


    userList.innerHTML = "";
    users.forEach(user => {
        let userDiv = document.createElement("div");
        userDiv.classList.add("user");
        userDiv.innerHTML = `
            <img src="${user.avatar}" alt="${user.name}">
            <div>
                <p><strong>${user.name}</strong></p>
                <p>${user.role}</p>
            </div>
        `;
        userDiv.onclick = () => loadChat(user);
        userList.appendChild(userDiv);
    });
}

function loadChat(user) {
    document.querySelector(".chat-username").textContent = user.name;
    document.querySelector(".chat-role").textContent = user.role;
    document.querySelector(".chat-avatar").src = user.avatar;
    
    localStorage.setItem("activeChatUser", JSON.stringify(user));
    loadChatFromLocalStorage();
}

function sendMessage() {
    let messageInput = document.getElementById("messageInput");
    let message = messageInput.value.trim();
    if (message) {
        let chatMessages = document.getElementById("chatMessages");
        let timestamp = new Date().toLocaleTimeString();
        let messageDiv = document.createElement("div");
        messageDiv.classList.add("chat-message", "sent");
        messageDiv.innerHTML = `<p>${message}</p><span class="timestamp">${timestamp}</span>`;
        chatMessages.appendChild(messageDiv);
        saveMessageToLocalStorage(message, timestamp);
        messageInput.value = "";
    }
}

function saveMessageToLocalStorage(message, timestamp) {
    let user = JSON.parse(localStorage.getItem("activeChatUser"));
    if (!user) return;
    
    let chatHistory = JSON.parse(localStorage.getItem(user.name)) || [];
    chatHistory.push({ text: message, time: timestamp, type: "sent" });
    localStorage.setItem(user.name, JSON.stringify(chatHistory));
}

function loadChatFromLocalStorage() {
    let user = JSON.parse(localStorage.getItem("activeChatUser"));
    if (!user) return;
    
    let chatMessages = document.getElementById("chatMessages");
    chatMessages.innerHTML = "";
    let chatHistory = JSON.parse(localStorage.getItem(user.name)) || [];
    
    chatHistory.forEach(msg => {
        let messageDiv = document.createElement("div");
        messageDiv.classList.add("chat-message", msg.type);
        messageDiv.innerHTML = `<p>${msg.text}</p><span class="timestamp">${msg.time}</span>`;
        chatMessages.appendChild(messageDiv);
    });
}

function changeTheme(event) {
    let selectedColor = event.target.value;
    document.querySelector(".sidebar").style.backgroundColor = selectedColor;
    document.querySelector(".chat-container header").style.backgroundColor = selectedColor;
    document.querySelector(".message-box button").style.backgroundColor = selectedColor;
    document.querySelector(".message-box button").style.borderColor = selectedColor;
    let textColor = ["black", "navy", "maroon"].includes(selectedColor) ? "white" : "black";
    document.querySelector(".sidebar h4").style.color = textColor;
    document.querySelector(".chat-container header h4").style.color = textColor;
}

document.addEventListener("DOMContentLoaded", function () {
    let menuButton = document.querySelector(".dropdown-toggle");
    let menu = document.getElementById("dropdownMenu");

    menuButton.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevents closing immediately
        menu.style.display = (menu.style.display === "block") ? "none" : "block";
    });

    // Close menu when clicking outside
    document.addEventListener("click", function (event) {
        if (!menu.contains(event.target) && event.target !== menuButton) {
            menu.style.display = "none";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    loadUsers();

    let searchInput = document.querySelector("#User");
    searchInput.addEventListener("input", searchUser);
});

function searchUser(event) {
    let query = event.target.value.toLowerCase();
    let users = document.querySelectorAll(".user");

    users.forEach(user => {
        let name = user.querySelector("strong").textContent.toLowerCase();
        user.style.display = name.includes(query) ? "flex" : "none";
    });
}


document.addEventListener("DOMContentLoaded", function () {
    loadUsers();
    loadChatFromLocalStorage();
    loadBackgroundImageFromLocalStorage(); // Load saved background image
});

// Toggle background selection menu
function toggleBackgroundMenu() {
    let menu = document.getElementById("bgMenu");
    menu.style.display = menu.style.display === "block" ? "none" : "block";
}

// Change chat section background and save in localStorage
function changeBackgroundImage(imageUrl) {
    let chatSection = document.querySelector(".chat-container");
    chatSection.style.backgroundImage = `url(${imageUrl})`;
    chatSection.style.backgroundSize = "cover";
    chatSection.style.backgroundPosition = "center";

    // Save background image in localStorage
    localStorage.setItem("chatBackgroundImage", imageUrl);
}

// Load saved background on page load
function loadBackgroundImageFromLocalStorage() {
    let savedImage = localStorage.getItem("chatBackgroundImage");
    if (savedImage) {
        let chatSection = document.querySelector(".chat-container");
        chatSection.style.backgroundImage = `url(${savedImage})`;
        chatSection.style.backgroundSize = "cover";
        chatSection.style.backgroundPosition = "center";
    }
}

