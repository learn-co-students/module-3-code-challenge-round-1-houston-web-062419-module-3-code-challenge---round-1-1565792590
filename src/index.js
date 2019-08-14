document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3212 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageSrc = 'http://blog.flatironschool.com/wp-content/uploads/2016/10/Code-Background-352x200.jpg'


  fetch(imageURL)
  .then(res => res.json())
  .then(image => renderImage(image))

  function renderImage(image) {
    const pic = document.querySelector('img')
    pic.src = imageSrc
    pic.setAttribute('data-id', imageId)

    const h4 = document.querySelector('#name')
    h4.innerHTML = image.name

    const likes = document.querySelector('#likes')
    likes.innerHTML = image.like_count

    const comments = image.comments.forEach(comment => {
      const li = document.createElement('li')
      li.innerText = comment.content
      const ul = document.querySelector('#comments')
      ul.append(li)
    })
  }

  
  //will increase like on refresh only  :(
  likeBtn = document.querySelector('#like_button')
  likeBtn.addEventListener('click', () => {
    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    })
    .then(res => res.json())
  })


  // must refresh to see new comment :(
  form = document.querySelector('#comment_form')
  form.addEventListener('submit', event => {
    event.preventDefault()

    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: event.target[0].value
      })
    })
    .then(res => res.json())
    .then(console.log)
      
  })


})
