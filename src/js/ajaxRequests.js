const editForm = document.getElementById('form')
if (editForm) {
  const inputs = editForm.querySelectorAll('input')
  const selects = editForm.querySelectorAll('select')
  for (i = 0; i < inputs.length; i++) {
    if (inputs[i].id === "lng") {
      // do nothing (only one listener is enough to know if location is changed)
    } else {
      inputs[i].addEventListener('change', () => {
        updateProfile(editForm)
      })
    }
  }
}

const login = (form) => {

  event.preventDefault()

  const url = `/login`

  let data = {
    username: form.elements.username.value,
    password: form.elements.password.value
  }

  sendData(url, data);
}

const updateProfile = (form) => {
  const url = `/edit`

  let data = {
    name: form.elements.name.value,
    age: form.elements.age.value,
    gender: form.elements.gender.value,
    looking: form.elements.looking.value,
    lat: form.elements.lat.value,
    lng: form.elements.lng.value
  }

  sendData(url, data);
}

const sendData = async (url, data) => {
  xhr = new XMLHttpRequest()
  const errorDisplay = document.querySelector('.error-display')

  // created bodyData to send though XML using this: https://stackoverflow.com/questions/35325370/how-do-i-post-a-x-www-form-urlencoded-request-using-fetch
  let bodyData = []

  for (property in data) {
    const encodedKey = encodeURIComponent(property)
    const encodedValue = encodeURIComponent(data[property])
    bodyData.push(encodedKey + "=" + encodedValue)
  }

  bodyData = bodyData.join("&")

  if (editForm) {
    editForm.parentNode.classList.remove('updated')
  }

  try {
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

    xhr.onload = function() {
      if (this.status == 200) {
        if (this.responseText === "logged in") {
          // handle what happens when passport authenticates
          window.location.replace("/")
        } else if (this.responseText === "updated profile") {
          editForm.parentNode.classList.add('updated')
        } else {
          errorDisplay.innerHTML = this.responseText
        }
      } else {
        errorDisplay.innerHTML = this.responseText
      }
    }

    xhr.send(bodyData)
  } catch (e) {
    console.log(e)
  }
}