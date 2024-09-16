let inpName = document.getElementById('inpName');
let inpImg = document.getElementById('inpImg');
let btn = document.getElementById('btn');
let content = document.getElementById('content');


fetch('https://66e80571b17821a9d9db0043.mockapi.io/PhotoSiteP')
  .then(response => response.json())
  .then(data => {
    content.innerHTML = data.map(item => `
      <div class="img-container">
        <p>${item.name}</p>
        <img src="${item.img}" alt="${item.name}">
        <button class="delete-btn" onclick="deleteImage(${item.id}, this)">Delete</button>
      </div>
    `).join(''); 
  });


function deleteImage(id, btnElement) {
  fetch(`https://66e80571b17821a9d9db0043.mockapi.io/PhotoSiteP/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      btnElement.parentElement.remove(); 
    });
}


btn.addEventListener('click', () => {
  let name = inpName.value.trim();
  let imgUrl = inpImg.value.trim();

  
  if (!name || !imgUrl) {
    alert('Please enter both');
    return;
  }

  
  fetch('https://66e80571b17821a9d9db0043.mockapi.io/PhotoSiteP', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      name: name,
      img: imgUrl,
    }),
  })
    .then(response => response.json())
    .then(data => {
      
      content.innerHTML += `
        <div class="img-container">
          <p>${data.name}</p>
          <img src="${data.img}" alt="${data.name}">
          <button class="delete-btn" onclick="deleteImage(${data.id}, this)">Delete</button>
        </div>
      `;
      inpName.value = '';
      inpImg.value = '';
    });
});
