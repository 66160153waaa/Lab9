document.addEventListener("DOMContentLoaded", async () => {
    const postsListContainer = document.getElementById("posts-list");
    const userNameContainer = document.getElementById("user-name");
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");

    if (!userId) {
        postsListContainer.innerHTML = "<p>ไม่พบโพสต์</p>";
        return;
    }

    try {
        const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await userResponse.json();
        userNameContainer.textContent = user.name;

        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        const posts = await postsResponse.json();

        posts.forEach(post => {
            const postDiv = document.createElement("div");
            postDiv.className = "post-item";
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <button class="comment-btn" data-post-id="${post.id}">ดูความคิดเห็น</button>
                <div class="comments-container" id="comments-${post.id}" style="display: none;"></div>
            `;
            postsListContainer.appendChild(postDiv);
        });

        document.querySelectorAll(".comment-btn").forEach(button => {
            button.addEventListener("click", async (event) => {
                const postId = event.target.getAttribute("data-post-id");
                const commentsContainer = document.getElementById(`comments-${postId}`);

                if (commentsContainer.style.display === "none") {
                    const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
                    const comments = await commentsResponse.json();
                    commentsContainer.innerHTML = comments.map(comment => `<p><strong>${comment.name}:</strong> ${comment.body}</p>`).join("");
                    commentsContainer.style.display = "block";
                    event.target.textContent = "ซ่อนความคิดเห็น";
                } else {
                    commentsContainer.style.display = "none";
                    event.target.textContent = "ดูความคิดเห็น";
                }
            });
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
});