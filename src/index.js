document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch("https://randopic.herokuapp.com/images/3211")
  .then(res => res.json())
  .then(image => {
    image.comments.forEach(comment => {
      const ul = document.getElementById("comments")
      const li = document.createElement("li")
      const delBtn = document.createElement("button")
      const br = document.createElement("br")
      delBtn.innerText = "Delete Comment"
      delBtn.className = "btn btn-success"
      li.innerText = comment.content
      ul.prepend(li, br, br, delBtn, br, br)
      delBtn.addEventListener("click", () => {
        fetch(`https://randopic.herokuapp.com/comments/${comment.id}`, {
          method: "Delete"
          })
        .then(() => {
          li.remove()
          delBtn.remove()
        })
      })
    })
    const img = document.querySelector("img")
      img.src = image.url
    const imgName = document.querySelector("#name")
      imgName.innerText = `Image Name: ${image.name}`
    const like = document.getElementById("likes")
      like.innerText = image.like_count

    const likeBtn = document.getElementById("like_button")
      likeBtn.addEventListener("click", () => {
        likes = image.like_count + 1
        fetch("https://randopic.herokuapp.com/likes", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "image_id": image.id
          })
        })
        .then(res => res.json())
        .then(image => {
          like.innerText = likes
        })
      })

    const form = document.getElementById("comment_form")
      form.addEventListener("submit", (event) => {
        event.preventDefault()
        const ul = document.getElementById("comments")
        const li = document.createElement("li")
        fetch("https://randopic.herokuapp.com/comments", {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "content": event.target[0].value,
            "image_id": image.id,
          })
        })
        .then(res => res.json())
        .then(comment => {
          const li = document.createElement("li")
          li.innerText = event.target[0].value
          const delBtn = document.createElement("button")
          const br = document.createElement("br")
          delBtn.innerText = "Delete Comment"
          delBtn.className = "btn btn-success"
          ul.prepend(li, br, br, delBtn, br, br)
          delBtn.addEventListener("click", () => {
            fetch(`https://randopic.herokuapp.com/comments/${comment.id}`, {
              method: "Delete"
              })
            .then(() => {
              li.remove()
              delBtn.remove()
            })
          })
        })
      })

  })
})
