const editProfile = document.querySelector("#edit_profile")
if (editProfile) {
    const editProfileButton = document.querySelector(".profile_button")
    editProfileButton.addEventListener('click', () => {
        toggleClass(".profile_button", "profile_button-hide")
        toggleClass(".profile_save", "profile_save-show")
        toggleClass(".profile_edit_form", "profile_edit")
    })
    if (document.querySelector(".takenUsername").innerHTML) {
        toggleClass(".sign-up-failed", "form-err-message")
    }
}

function toggleClass(classname, classToggle) {
    document.querySelector(`${classname}`).classList.toggle(`${classToggle}`)
}