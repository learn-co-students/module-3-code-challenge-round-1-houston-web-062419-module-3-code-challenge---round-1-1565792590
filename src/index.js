document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3209 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch("https://randopic.herokuapp.com/images/3209")
  .then(res => res.json())
  .then(images => renderCard(images))
  // .then(images => {
  //   images.forEach(image =>
  //     renderCard(image))
  // })

  function renderCard(images){
    const imgDiv = document.querySelector('#image-card')
    const img = document.querySelector("img")
    img.src = "http://blog.flatironschool.com/wp-content/uploads/2016/01/20141110-Flatiron-School-29-352x200.jpg"



    const name = document.querySelector("#name")
    name.innerText = `${images.name}`

    const likes = document.querySelector("#likes")
    likes.innerText = `${images.like_count}`

    const likeBtn = document.querySelector("#like_button")

    likeBtn.addEventListener("click", () => {
      fetch("https://randopic.herokuapp.com/images/3209", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {
            like_count: ++images.like_count
          }
        )
      })
      .then(res => res.json())
      .then(newimages => {
        likes.innerText = `${newimages.likes}`
      })
      

    })



    

    const ul = document.querySelector("#comments")

    const li = document.createElement('li')
    li.innerText = `${images.comments[0].content}`

    const newForm = document.querySelector("#comment_form")

    newForm.addEventListener('submit', (e)=> {
      e.preventDefault()

      fetch("https://randopic.herokuapp.com/images/3209", {
        method: "POST",
        headers:
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify(
            {
              comments: images.comments[0].content
                
            })
      
    })
    .then(res => res.json())
    .then(images => renderCard(images))
    ul.append(li)



    })

    ul.append(li)

    


  }

 
  

})
