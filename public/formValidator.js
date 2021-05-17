const formValidate = document.querySelector('#login_form')

if (formValidate) {
    const signupCard = document.querySelector('.sign-up_card')

    signupCard.classList.replace('sign-up_card-no-js', 'sign-up_card-has-js')

    if (document.querySelector('.takenUsername').innerHTML) {
        addClass('.sign-up_card', 'sign-up_card-show')
        addClass('.login_card', 'login_card-hide')
        addClass('.sign-up-failed', 'form-err-message')

        if (signupCard.classList.contains('sign-up_card-has-js')) {
            removeClass('.sign-up_card', 'sign-up_card-has-js')
        }
    } else {

        removeClass('.sign-up-failed', 'sign-up_card-has-js')

    }

    if (document.querySelector('.loginFailed').innerHTML) {

        addClass('.login-failed', 'form-err-message')

    } else {

        removeClass('.login-failed', 'form-err-message')
    }

    document.querySelector('.sign-up-button').addEventListener('click', () => {


        addClass('.sign-up_card', 'sign-up_card-show')
        addClass('.login_card', 'login_card-hide')

        if (signupCard.classList.contains('sign-up_card-has-js')) {
            signupCard.classList.remove('sign-up_card-has-js')
        }
    })

    document.querySelector('.sign-up_card_close').addEventListener('click', () => {


        removeClass('.sign-up_card', 'sign-up_card-show')
        removeClass('.login_card', 'login_card-hide')

    })

    const validateForm = (event) => {
        if (event.target) {
            var target = event.target
        } else {
            var target = event
        }


        let emailLogin = document.querySelector('#emailLogin')
        let passwordLogin = document.querySelector('#passwordLogin')
        let userSignup = document.querySelector('#userSignup')
        let emailSignup = document.querySelector('#emailSignup')
        let passwordSignup = document.querySelector('#passwordSignup')
        let passwordSignupRepeat = document.querySelector('#passwordSignupRepeat')

        let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let regexUsername = /^[a-zA-Z0-9_.-]*$/

        if (target.id == 'emailLogin') {
            if (emailLogin.value.length == 0) {
                if (!emailLogin.classList.contains('err')) {
                    toggleClass('#emailLogin', 'err')
                    toggleClass('#emailLogin', 'no-err')

                    insertHTML("#emailLogin", 'Vul je e-mailadres in.')
                    replaceClass("#emailLogin", 'no-err-message', 'err-message')
                } else {
                    removeClass('#emailLogin', 'no-err')
                    emailLogin.nextElementSibling.classList.replace('no-err-message', 'err-message')
                    emailLogin.nextElementSibling.innerHTML = 'Vul je e-mailadres in.'
                }
            } else if (!emailLogin.value.match(regexEmail)) {
                emailLogin.nextElementSibling.classList.replace('no-err-message', 'err-message')
                emailLogin.nextElementSibling.innerHTML = 'Vul je e-mailadres correct in.'
                addClass('#emailLogin', 'err')
                removeClass('#emailLogin', 'no-err')

            } else {
                removeClass('#emailLogin', 'no-err')
                removeClass('#emailLogin', 'err')
                emailLogin.nextElementSibling.classList.replace('err-message', 'no-err-message')
            }
        }

        if (target.id == 'passwordLogin') {
            if (passwordLogin.value.length == 0) {
                if (!passwordLogin.classList.contains('err')) {


                    addClass('#passwordLogin', 'err')
                    removeClass('#passwordLogin', 'no-err')

                    passwordLogin.nextElementSibling.classList.replace('no-err-message', 'err-message')
                    passwordLogin.nextElementSibling.innerHTML = 'Vul je wachtwoord in .'
                }
            } else {
                removeClass('#passwordLogin', 'err')
                removeClass('#passwordLogin', 'no-err')
                passwordLogin.nextElementSibling.classList.replace('err-message', 'no-err-message')
            }
        }

        if (target.id == 'userSignup') {
            if (userSignup.value.length == 0) {
                if (!userSignup.classList.contains('err')) {


                    addClass('#userSignup', 'err')
                    removeClass('#userSignup', 'no-err')

                    userSignup.nextElementSibling.classList.replace('no-err-message', 'err-message')
                    userSignup.nextElementSibling.innerHTML = 'Kies een username.'
                } else {

                    removeClass('#userSignup', 'no-err')

                    userSignup.nextElementSibling.classList.replace('no-err-message', 'err-message')
                    userSignup.nextElementSibling.innerHTML = 'Kies een username.'
                }
            } else if (!userSignup.value.match(regexUsername)) {
                userSignup.nextElementSibling.classList.replace('no-err-message', 'err-message')
                userSignup.nextElementSibling.innerHTML = 'Een username mag alleen letters, cijfers en dashes bevatten.'


                addClass('#userSignup', 'err')
                removeClass('#userSignup', 'no-err')
            } else {


                removeClass('#userSignup', 'err')
                removeClass('#userSignup', 'no-err')
                userSignup.nextElementSibling.classList.replace('err-message', 'no-err-message')
            }
        }

        if (target.id == 'emailSignup') {
            if (emailSignup.value.length == 0) {
                if (!emailSignup.classList.contains('err')) {


                    addClass('#emailSignup', 'err')
                    removeClass('#emailSignup', 'no-err')
                    emailSignup.nextElementSibling.classList.replace('no-err-message', 'err-message')
                    emailSignup.nextElementSibling.innerHTML = 'Vul je e-mailadres in.'
                } else {

                    removeClass('#emailSignup', 'no-err')
                    emailSignup.nextElementSibling.classList.replace('no-err-message', 'err-message')
                    emailSignup.nextElementSibling.innerHTML = 'Vul je e-mailadres in.'
                }
            } else if (!emailSignup.value.match(regexEmail)) {
                emailSignup.nextElementSibling.classList.replace('no-err-message', 'err-message')
                emailSignup.nextElementSibling.innerHTML = 'Vul een correct e-mailadres in.'


                addClass('#emailSignup', 'err')
                removeClass('#emailSignup', 'no-err')
            } else {


                removeClass('#emailSignup', 'err')
                removeClass('#emailSignup', 'no-err')
                emailSignup.nextElementSibling.classList.replace('err-message', 'no-err-message')
            }
        }

        if (target.id == 'passwordSignup') {
            if (passwordSignup.value.length == 0) {
                if (!passwordSignup.classList.contains('err')) {


                    addClass('#passwordSignup', 'err')
                    removeClass('#passwordSignup', 'no-err')
                    passwordSignup.nextElementSibling.classList.replace('no-err-message', 'err-message')
                    passwordSignup.nextElementSibling.innerHTML = 'Vul een wachtwoord in.'
                }
            } else {


                removeClass('#passwordSignup', 'err')
                removeClass('#passwordSignup', 'no-err')
                passwordSignup.nextElementSibling.classList.replace('err-message', 'no-err-message')
            }
        }

        if (target.id == 'passwordSignupRepeat') {
            if (passwordSignupRepeat.value.length == 0) {
                if (!passwordSignupRepeat.classList.contains('err')) {


                    addClass('#passwordSignupRepeat', 'err')
                    removeClass('#passwordSignupRepeat', 'no-err')
                    passwordSignupRepeat.nextElementSibling.classList.replace('no-err-message', 'err-message')
                    passwordSignupRepeat.nextElementSibling.innerHTML = 'Herhaal wachtwoord.'
                } else {

                    removeClass('#passwordSignupRepeat', 'no-err')
                    passwordSignupRepeat.nextElementSibling.classList.replace('no-err-message', 'err-message')
                    passwordSignupRepeat.nextElementSibling.innerHTML = 'Herhaal wachtwoord.'
                }
            } else if (passwordSignupRepeat.value != passwordSignup.value) {
                passwordSignupRepeat.nextElementSibling.classList.replace('no-err-message', 'err-message')
                passwordSignupRepeat.nextElementSibling.innerHTML = 'Wachtwoorden komen niet overeen.'


                addClass('#passwordSignupRepeat', 'err')
                removeClass('#passwordSignupRepeat', 'no-err')
            } else {


                removeClass('#passwordSignupRepeat', 'err')
                removeClass('#passwordSignupRepeat', 'no-err')
                passwordSignupRepeat.nextElementSibling.classList.replace('err-message', 'no-err-message')
            }
        }


    }

    let allInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]')

    allInputs.forEach((input) => {
        input.addEventListener('blur', validateForm)
    })

    document.querySelector('#sign-up_form').addEventListener('submit', (event) => {
        event.preventDefault()

        let err = false

        let submitAllInputs = document.querySelector('#sign-up_form')

        submitAllInputs.querySelectorAll(':scope > input').forEach((input) => {
            validateForm(input)

            if (input.classList.contains('no-err') || input.classList.contains('err') || parseInt(window.formTotal) === 0) {
                err = true
            }
        })

        if (err === true) {
            document.querySelector('#form-err-message').classList.replace('no-err-message', 'form-err-message')
        } else {
            document.querySelector('#form-err-message').classList.replace('form-err-message', 'no-err-message')
            document.querySelector('#sign-up_form').submit()
        }
    })

    document.querySelector('#login_form').addEventListener('submit', (event) => {
        event.preventDefault()

        let err = false

        let submitAllInputs = document.querySelector('#login_form')

        submitAllInputs.querySelectorAll(':scope > input').forEach((input) => {
            validateForm(input)

            if (input.classList.contains('no-err') || input.classList.contains('err') || parseInt(window.formTotal) === 0) {
                err = true
            }
        })

        if (err === true) {
            document.querySelector('#login-err-message').classList.replace('no-err-message', 'form-err-message')
        } else {
            document.querySelector('#login-err-message').classList.replace('form-err-message', 'no-err-message')
            document.querySelector('#login_form').submit()
        }
    })
}


function toggleClass(classname, classToggle) {
    document.querySelector(`${classname}`).classList.toggle(`${classToggle}`)
}

// function conditionalToggle(condition, classname, classToggle) {
//     document.querySelector(`${classname}`).classList.toggle(`${classToggle}`)
// }


function addClass(classname, classToggle) {
    document.querySelector(`${classname}`).classList.add(`${classToggle}`)
}

function removeClass(classname, classToggle) {
    document.querySelector(`${classname}`).classList.remove(`${classToggle}`)
}

function replaceClass(element, before, after) {
    console.log('replace class')
    document.querySelector(`${element}`).nextElementSibling.classList.replace(`${before}`, `${after}`)
}

function insertHTML(element, content) {
    console.log('insert the html')
    document.querySelector(`${element}`).nextElementSibling.innerHTML = `${content}`
}