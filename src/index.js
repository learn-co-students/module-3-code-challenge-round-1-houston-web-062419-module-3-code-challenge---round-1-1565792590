document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3214 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const divImg = document.querySelector("#image_card")
  // <div id="image_card" class="card col-md-4">
  //         <img src="" id="image" data-id=""/>
  //         <h4 id="name">Title of image goes here</h4>
  //         <span>Likes:
  //           <span id="likes">Likes Go Here</span>
  //         </span>
  //         <button id="like_button">Like</button>
  //         <form id="comment_form">
  //           <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
  //           <input type="submit" value="Submit"/>
  //         </form>
  //         <ul id="comments">
  //              <!-- <li> for each comment goes here -->
  //         </ul>
  //       </div>


  fetch(imageURL)
  .then(response => response.json())
  .then(info => {
    // console.log(allInfo)
    // debugger 
    renderInform(info)
  })

  function renderInform(info){
    // const div = document.createElement
    const img = document.createElement("img")
    img.src = info.url 

    const h4 = document.createElement("h4")
    h4.innerText = info.name

    const span = document.createElement("span")
    span.innerText = `${info.like_count}`

    const button = document.createElement("button")
    button.innerText = "Likes"
    button.addEventListener("click",() => {
      addLikes(span,like_count)
    })    
    const ul = document.querySelector("#comments")
    const li = document.createElement("li")
    li.innerText = info.comments.content
    ul.append(li) 

    divImg.append(img,h4,span,button,ul)


  }
  function addLikes(span,like_count){
    fetch(likeURL,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        like_count: ++like_count
      })
    })
    .then(resp => resp.json())
    .then(() => {
      span.innerText = info.like_count
    })
  }

})
