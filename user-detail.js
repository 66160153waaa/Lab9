document.addEventListener("DOMContentLoaded", async () => {
    const userDetailContainer = document.getElementById("user-detail");
    const viewPostsButton = document.getElementById("view-posts");
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");

    if (!userId) {
        userDetailContainer.innerHTML = "<p>ไม่พบข้อมูลผู้ใช้</p>";
        return;
    }

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await response.json();

        userDetailContainer.innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>อีเมล:</strong> ${user.email}</p>
            <p><strong>เบอร์โทร:</strong> ${user.phone}</p>
            <p><strong>เว็บไซต์:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
        `;

        viewPostsButton.addEventListener("click", () => {
            window.location.href = `user-posts.html?id=${userId}`;
        });
    } catch (error) {
        console.error("Error fetching user details:", error);
    }
});