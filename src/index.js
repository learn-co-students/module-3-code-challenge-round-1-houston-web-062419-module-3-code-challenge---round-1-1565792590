document.addEventListener('DOMContentLoaded', () => {
  
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3213 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const image = document.getElementById("image")
  const imageName = document.getElementById('name')
  const likes = document.getElementById("likes")
  const likeButton = document.getElementById("like_button")
  const commentForm = document.getElementById("comment_form")
  const comments = document.getElementById("comments")
  const commentInput = document.getElementById("comment_input")


  fetch(`${imageURL}`)
  .then(res=> res.json())
  .then(data => {
    image.setAttribute("src",`${data.url}`)
    data.comments.forEach((comment)=> {
      comments.prepend(createComment(comment))
    })
    likes.innerText = data.like_count
    imageName.innerText = data.name
  })

// fetch (https://randopic.herokuapp.com/images/3213)
// .then(res => res.json())
// .then(image => {
//   image.forEach(image => renderImage(image))

// function renderImage(image) {
//   imageLink.src = `${image.url}`
//   imageName.innerText = image.name
//   imageLikes.innerText = image.like_count
  
  likeButton.addEventListener('click',() => {
    likes.innerText = parseInt(likes.innerText)+1
    fetch(`${likeURL}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: `${imageId}`,
        like_count: `${likes.innerText}`
      })
    })
    .then(res=> res.json())
  })
  
  commentForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    fetch(`${commentsURL}`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: `${imageId}`,
        content: `${commentInput.value}`
      })
    })
    .then(res => res.json())
    .then(comment => {
    comments.append(createComment(comment))
    })
    commentForm.reset()
  })
  })
  
  function createComment(commentData){
    let newComment = document.createElement('li')
    newComment.innerText = commentData.content
    return newComment
  }