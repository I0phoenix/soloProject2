window.addEventListener('DOMContentLoaded', async() => {
    await fetchAndDisplayBlogPosts();
});
async function fetchAndDisplayBlogPosts(){
    try{
        const blogPostResponse = await fetch('/blogs/');
        if(!blogPostResponse.ok){
            throw new Error("Failed to fetch blog posts.");
        }

        const blogPosts = await blogPostResponse.json();

        await Promise.all(blogPosts.map(async (blogPost) => {
            const authorResponse = await fetch(`/users/getUserByID/${blogPost.author}`);
            if(!authorResponse.ok){
                throw new Error("Failed to fetch author details.");
            }
            const authData = await authorResponse.json();
            blogPost.authorName = authData.name;
        }));

        await Promise.all(blogPosts.map(async (blogPost) => {
            await Promise.all(blogPost.comments.map(async (comment) => {
                const userResponse = await fetch(`/users/getUserByID/${comment.user}`);
                if(!userResponse.ok){
                    throw new Error("Failed to fetch user details.");
                }
                const userData = await userResponse.json();
                comment.userName = userData.name;
            }));
        }));

        await displayBlogPosts(blogPosts);

    }
    catch(error){
        console.error('Error fetching content', error.message);
    }
}

async function displayBlogPosts(blogPosts){
    const blogPostContainer = document.getElementById('blogPosts');
    blogPostContainer.innerHTML = "";
    blogPosts.forEach(blogPost => {
        const cardElement = createBlogPostCard(blogPost);
        blogPostContainer.appendChild(cardElement);
    })
}

async function createBlogPostCard(blogPost){
    const cardElement = document.createElement('div');
    cardElement.classList.add('blog-post-card');

    const titleElement = document.createElement('h5');
    titleElement.textContent = blogPost.title;

    const authorElement = document.createElement('p');
    authorElement.textContent = `Author: ${blogPost.authorName}`;

    const contentElement = document.createElement('p');
    contentElement.textContent = blogPost.content;

    cardElement.appendChild(titleElement);
    cardElement.appendChild(authorElement);
    cardElement.appendChild(contentElement);

    return cardElement;
}

function createLikeButton(likes){

}

function createCommentsElement(blogPost){

}

function createCommentForm(blogPostID){

}

