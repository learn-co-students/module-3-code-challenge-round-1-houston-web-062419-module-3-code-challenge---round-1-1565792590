document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3210 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const img = document.querySelector("img")
  const name = document.querySelector("#name")
  const likes_span = document.querySelector("#likes")
  const ul = document.querySelector("#comments")

  fetch(imageURL)
  .then(res => res.json())
  .then(json => {
  	console.log(json)
  	  img.src = json.url
  	  name.innerText = json.name
  	  likes_span.innerText = json.like_count
  	  json.comments.forEach(c => {
  	  	const li = document.createElement("li")
  	  	li.innerText = c.content
  	  	ul.append(li)
  	  })

  })

  document.querySelector("#like_button").addEventListener("click", () => {
  	likes_span.innerText = parseInt(likes_span.innerText) + 1
  	fetch("https://randopic.herokuapp.com/likes", {
  		method: "POST",
  		headers:{
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
		body: JSON.stringify({
			image_id: imageId
		})
  	})
  	.then(res => res.json())
  	.then (json => {
  		console.log(json)
  	})
  })

  const frm  = document.querySelector("#comment_form")
  frm.addEventListener("submit", (e) => {
  		e.preventDefault()
  		const com_li = document.createElement("li")
  		com_li.innerText = e.target[0].value
  		ul.append(com_li)

  		fetch("https://randopic.herokuapp.com/comments", {
  			method:"POST",
  			headers:{
				'Accept': 'application/json',
				'Content-Type': 'application/json'
  			},
  			body: JSON.stringify({
				image_id: imageId,
				content: e.target[0].value
  			})
  		})
  		.then(res => res.json())
  		.then(json => {
  			console.log(json)
  		})

  		frm.reset()

  })

})




















