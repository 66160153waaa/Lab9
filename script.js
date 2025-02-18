document.addEventListener("DOMContentLoaded", async () => {
    const userListContainer = document.getElementById("user-list");

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();

        users.forEach(user => {
            const userDiv = document.createElement("div");
            userDiv.className = "user-item";
            userDiv.textContent = user.name;
            userDiv.addEventListener("click", () => {
                window.location.href = `user-detail.html?id=${user.id}`;
            });
            userListContainer.appendChild(userDiv);
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
});