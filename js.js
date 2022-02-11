let firstName, birthDate, email, phoneNumber, addBtn, cardList, popUp, popUpInfo, UserDataEdit, popUpFirstName,
    popUpBirthdayDate, popUpEmail, popUpPhoneNumber, popUpAddBtn, popUpCloseBtn, errorInfo, childData, userFirstName,
    userDateOfBirth, userEmailAddress, userPhoneNumber

const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
}

const prepareDOMElements = () => {
    firstName = document.querySelector('.firstname')
    birthDate = document.querySelector('.birthday-date')
    email = document.querySelector('.e-mail')
    phoneNumber = document.querySelector('.phone-number')
    addBtn = document.querySelector('.btn-add')
    cardList = document.querySelector('.card-list')

    popUp = document.querySelector('.popup')
    popUpInfo = document.querySelector('.popup-info')
    popUpFirstName = document.querySelector('.popup-firstname')
    popUpBirthdayDate = document.querySelector('.popup-birthday-date')
    popUpEmail = document.querySelector('.popup-e-mail')
    popUpPhoneNumber = document.querySelector('.popup-phone-number')
    popUpAddBtn = document.querySelector('.accept')
    popUpCloseBtn = document.querySelector('.cancel')
    errorInfo = document.querySelector('.error-message')
}

const prepareDOMEvents = () => {
    addBtn.addEventListener('click', addNewDate)
    popUpCloseBtn.addEventListener('click', closePopUp)
    popUpAddBtn.addEventListener('click', changeUserData)
    cardList.addEventListener('click', checkClick)
}

const addNewDate = () => {

    let phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/
    let emailFormat = /^\w+([ .-]?\w+)*@\w+([ .-]?\w+)*(\.\w{2,3})+$/
    let dateFormat = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/

    if (firstName.value === '' || birthDate.value === '' || email.value === '' || phoneNumber.value === '') {
        errorInfo.textContent = 'Each field must be filled.'
    } else if (!email.value.match(emailFormat)) {
        errorInfo.textContent = 'Wrong email format.'
    } else if (!phoneNumber.value.match(phoneFormat)) {
        errorInfo.textContent = 'Wrong phone format.'
    } else if (!birthDate.value.match(dateFormat)) {
        errorInfo.textContent = 'Wrong date format.'
    } else {
        const newCard = document.createElement('li')
        newCard.classList.add('note')
        singleCard(newCard)
        createTools(newCard)
        cardList.append(newCard)
        firstName.value = ''
        birthDate.value = ''
        email.value = ''
        phoneNumber.value = ''
        errorInfo.textContent = ''
    }
}

const singleCard = (x) => {

    const card = document.createElement('div')
    card.classList.add('card-details')
    x.append(card)

    const name = document.createElement('p')
    name.textContent = firstName.value
    const dateOfBirth = document.createElement('p')
    dateOfBirth.textContent = birthDate.value
    const eMail = document.createElement('p')
    eMail.textContent = email.value
    const phone = document.createElement('p')
    phone.textContent = phoneNumber.value

    card.append(name, dateOfBirth, eMail, phone)
}

const createTools = (x) => {

    const toolsPanel = document.createElement('div')
    toolsPanel.classList.add('tools')
    x.append(toolsPanel)

    const editBtn = document.createElement('button')
    editBtn.classList.add('edit')
    editBtn.textContent = 'EDIT'

    const deleteBtn = document.createElement('button')
    deleteBtn.classList.add('delete')
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>'

    toolsPanel.append(editBtn, deleteBtn)
}

const checkClick = (e) => {
    if (e.target.matches('.edit')) {
        editData(e)
    } else if (e.target.matches('.delete')) {
        deleteData(e)
    }
}

const editData = (e) => {

    UserDataEdit = e.target.closest('li')
    childData = UserDataEdit.getElementsByTagName('div')[0]
    userFirstName = childData.getElementsByTagName('p')[0]
    userDateOfBirth = childData.getElementsByTagName('p')[1]
    userEmailAddress = childData.getElementsByTagName('p')[2]
    userPhoneNumber = childData.getElementsByTagName('p')[3]

    popUpFirstName.value = userFirstName.textContent
    popUpBirthdayDate.value = userDateOfBirth.textContent
    popUpEmail.value = userEmailAddress.textContent
    popUpPhoneNumber.value = userPhoneNumber.textContent

    popUp.style.display = 'flex'
}

const deleteData = (e) => {
    e.target.closest('li').remove()
    const allData = cardList.querySelectorAll('li')
    if (allData.length === 0) {
        cardList.textContent = ''
    }
}

const closePopUp = () => {
    popUp.style.display = 'none'
    popUpInfo.textContent = ''
}

const changeUserData = () => {

    let phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/
    let emailFormat = /^\w+([ .-]?\w+)*@\w+([ .-]?\w+)*(\.\w{2,3})+$/
    let dateFormat = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/

    if (popUpFirstName.value === '' || popUpBirthdayDate.value === '' || popUpEmail.value === '' || popUpPhoneNumber.value === '') {
        popUpInfo.textContent = 'Fields cannot be empty.'
    } else if (!popUpEmail.value.match(emailFormat)) {
        popUpInfo.textContent = 'Wrong email format.'
    } else if (!popUpPhoneNumber.value.match(phoneFormat)) {
        popUpInfo.textContent = 'Wrong phone format.'
    } else if (!popUpBirthdayDate.value.match(dateFormat)) {
        popUpInfo.textContent = 'Wrong date format.'
    } else {
        userFirstName.textContent = popUpFirstName.value
        userDateOfBirth.textContent = popUpBirthdayDate.value
        userEmailAddress.textContent = popUpEmail.value
        userPhoneNumber.textContent = popUpPhoneNumber.value

        closePopUp()
        popUpInfo.textContent = ''
    }
}

document.addEventListener('DOMContentLoaded', main)
