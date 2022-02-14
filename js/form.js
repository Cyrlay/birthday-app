let firstName, birthDate, email, phoneNumber, addBtn, cardList, popUp, popUpInfo, UserDataEdit, popUpFirstName,
    popUpBirthdayDate, popUpEmail, popUpPhoneNumber, popUpAddBtn, popUpCloseBtn, errorInfo, childData, userFirstName,
    userDateOfBirth, userEmailAddress, userPhoneNumber, modal, navigation, labels, calendar, modalUserName,
    modalDateOfBirth, modalEmail, modalPhone, imageDescription, closeButton, resultIMG, resultDescription, nav = 0,
    clicked = null

let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

let phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})$/
let emailFormat = /^\w+([ .-]?\w+)*@\w+([ .-]?\w+)*(\.\w{2,3})+$/
let dateFormat = /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/

const main = () => {
    prepareDOMElements()
    prepareDOMEvents()
    createListFromLocalStorage()
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

    navigation = document.querySelector('.cld-datetime')
    labels = document.querySelector('.cld-labels')
    calendar = document.querySelector('.cld-days')
    modal = document.getElementById('modalEvent');
    modalUserName = document.querySelector('.modal-user-name')
    modalDateOfBirth = document.querySelector('.modal-date-of-birth')
    modalEmail = document.querySelector('.modal-email')
    modalPhone = document.querySelector('.modal-phone')
    imageDescription = document.querySelector('.image-description')
    closeButton = document.querySelector('.close-button')
}

const prepareDOMEvents = () => {
    addBtn.addEventListener('click', addNewDate)
    popUpCloseBtn.addEventListener('click', closePopUp)
    popUpAddBtn.addEventListener('click', changeUserData)
    cardList.addEventListener('click', checkClick)
}

const addNewDate = () => {

    const today = new Date()
    const minDate = new Date('1900/01/01').getTime()
    const maxDate = today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate()
    const replaceSymbolInUserDate = birthDate.value.replace(/-/g, "/")
    const unixUserDate = new Date(replaceSymbolInUserDate).getTime()

    if (firstName.value === '' || birthDate.value === '' || email.value === '' || phoneNumber.value === '') {
        errorInfo.textContent = 'Each field must be filled.'
    } else if (!email.value.match(emailFormat)) {
        errorInfo.textContent = 'Wrong email format.'
    } else if (!phoneNumber.value.match(phoneFormat)) {
        errorInfo.textContent = 'Wrong phone format.'
    } else if (!birthDate.value.match(dateFormat)) {
        errorInfo.textContent = 'Wrong date format.'
    } else if (unixUserDate < minDate || birthDate.value > maxDate) {
        errorInfo.textContent = 'Enter correct date of birth.'
    } else {

        const newCard = document.createElement('li')
        newCard.classList.add('note')
        saveEventInLocalStorage()

        singleCard(newCard)
        createTools(newCard)
        cardList.append(newCard)
        refreshCalendar()

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

const createListFromLocalStorage = () => {

    if (events.length === 0) {
        console.log('List is empty')
    } else {
        for (let i = 0; i < events.length; i++) {
            const newCard = document.createElement('li')
            newCard.classList.add('note')
            createCardFromLocalStorage(newCard, i)
            createTools(newCard)
            cardList.append(newCard)
        }
    }
}

const createCardFromLocalStorage = (x, i) => {

    const card = document.createElement('div')
    card.classList.add('card-details')
    x.append(card)

    const name = document.createElement('p')
    name.textContent = events[i].name
    const dateOfBirth = document.createElement('p')
    dateOfBirth.textContent = events[i].dateF2
    const eMail = document.createElement('p')
    eMail.textContent = events[i].email
    const phone = document.createElement('p')
    phone.textContent = events[i].phone

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

    for (let i = 0; i < events.length; i++) {
        if (userDateOfBirth.textContent === events[i].dateF2) {
            events[i].name = 'japko'
        }
    }
}

const deleteData = (e) => {

    UserDataEdit = e.target.closest('li')
    childData = UserDataEdit.getElementsByTagName('div')[0]
    userDateOfBirth = childData.getElementsByTagName('p')[1]

    e.target.closest('li').remove()
    const allData = cardList.querySelectorAll('li')
    if (allData.length === 0) {
        cardList.textContent = ''
    }

    for (let i = 0; i < events.length; i++) {
        if (userDateOfBirth.textContent === events[i].dateF2) {
            console.log('Record Deleted.')
            events = events.filter(e => e.dateF2 !== userDateOfBirth.textContent)
            localStorage.setItem('events', JSON.stringify(events))
            refreshCalendar()
        }
    }
}

const closePopUp = () => {
    popUp.style.display = 'none'
    popUpInfo.textContent = ''
}

const changeUserData = () => {

    if (popUpFirstName.value === '' || popUpBirthdayDate.value === '' || popUpEmail.value === '' || popUpPhoneNumber.value === '') {
        popUpInfo.textContent = 'Fields cannot be empty.'
    } else if (!popUpEmail.value.match(emailFormat)) {
        popUpInfo.textContent = 'Wrong email format.'
    } else if (!popUpPhoneNumber.value.match(phoneFormat)) {
        popUpInfo.textContent = 'Wrong phone format.'
    } else if (!popUpBirthdayDate.value.match(dateFormat)) {
        popUpInfo.textContent = 'Wrong date format.'
    } else {

        const tempBirthdayDate = userDateOfBirth.textContent

        userFirstName.textContent = popUpFirstName.value
        userDateOfBirth.textContent = popUpBirthdayDate.value
        userEmailAddress.textContent = popUpEmail.value
        userPhoneNumber.textContent = popUpPhoneNumber.value

        for (let i = 0; i < events.length; i++) {
            if (events[i].dateF2 === tempBirthdayDate) {
                console.log('User data changed.')
                events[i].name = popUpFirstName.value
                events[i].dateF2 = popUpBirthdayDate.value
                events[i].email = popUpEmail.value
                events[i].phone = popUpPhoneNumber.value
                localStorage.setItem('events', JSON.stringify(events))
                refreshCalendar()
            }
        }


        closePopUp()
        popUpInfo.textContent = ''
    }
}

/*const apiKEY = 'MEJwDqfmlSOP7hFT8uZTgpOMzP0zDrKG7KbL6FYh'*/
const apiKEY = 'lHF6o4HPxckX9Hy3GBsuliyQYDUljIhJhSR4qTRl'
const URL = 'https://api.nasa.gov/planetary/apod?api_key=' + apiKEY

axios.get(URL).then(res => {
    resultIMG = res.data.url
    resultDescription = res.data.explanation
}).catch((err) => console.log(err))

/*const setBackground = (date) => {
    const apiKEY = 'lHF6o4HPxckX9Hy3GBsuliyQYDUljIhJhSR4qTRl'
    const URL = 'https://api.nasa.gov/planetary/apod?api_key=' + apiKEY + '&date=' + date
    axios.get(URL).then(res => {
        console.log(res.data)
        resultIMG = res.data.url
        resultDescription = res.data.explanation
    }).catch((err) => console.log(err))
    console.log(resultIMG)
}*/

const openModal = date => {

    clicked = date
    const eventForDay = events.find(e => e.birthday === clicked)

    if (eventForDay) {

        modalUserName.textContent = 'First name: ' + eventForDay.name
        modalDateOfBirth.textContent = 'Date of Birth: ' + eventForDay.dateF2
        modalEmail.textContent = 'Email: ' + eventForDay.email
        modalPhone.textContent = 'Phone: ' + eventForDay.phone
        imageDescription.textContent = resultDescription
        modal.style.backgroundImage = `url('${resultIMG}')`

        closeButton.addEventListener('click', closeModal)

        /*const convertDate = eventForDay.date.replace(/[/]/g, '-')
        const reversedDate = convertDate.split("-").reverse().join("-")*/

        /*setBackground(reversedDate)*/

        modal.append(modalUserName, modalDateOfBirth, modalEmail, modalPhone, imageDescription, closeButton)

    } else {
        console.log('Its not a event day')
    }
    modal.style.display = 'flex'
    modal.style.flexDirection = 'column'
    modal.style.alignItems = 'center'
    modal.style.justifyContent = 'center'
};

const closeModal = () => {
    modal.style.display = 'none'
    modal.style.backgroundImage = ''
    clicked = null;
    refreshCalendar()
};

const refreshCalendar = () => {

    const dt = new Date()

    if (nav !== 0) {
        dt.setMonth(new Date().getMonth() + nav)
    }

    const day = dt.getDate()
    const month = dt.getMonth()
    const year = dt.getFullYear()

    const firstDayOfMonth = new Date(year, month, 1)
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0])

    /*document.getElementById('monthDisplay').innerText = `${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}`*/

    const AddNavigation = () => {
        navigation.textContent = ''
        let rwd = document.createElement('div')
        rwd.setAttribute('id', 'backButton')
        rwd.classList.add('cld-rwd')
        rwd.classList.add('cld-nav')

        rwd.addEventListener('click', () => {
            nav--
            refreshCalendar()
        })

        rwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,50 75,0 75,100"></polyline></svg>'
        navigation.append(rwd)

        let monthDisplay = document.createElement('div')
        monthDisplay.setAttribute('id', 'monthDisplay')
        monthDisplay.innerText = `${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}`
        monthDisplay.classList.add('today')
        navigation.append(monthDisplay)

        let fwd = document.createElement('div')
        fwd.setAttribute('id', 'nextButton')
        fwd.classList.add('cld-fwd')
        fwd.classList.add('cld-nav')

        fwd.addEventListener('click', () => {
            nav++
            refreshCalendar()
        })

        fwd.innerHTML = '<svg height="15" width="15" viewBox="0 0 75 100" fill="rgba(0,0,0,0.5)"><polyline points="0,0 75,50 0,100"></polyline></svg>';
        navigation.append(fwd)
    };

    const AddLabels = () => {
        labels.textContent = ''
        const labelsList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        for (let i = 0; i < labelsList.length; i++) {
            let label = document.createElement('li')
            label.className += "cld-label"
            label.textContent = labelsList[i]
            labels.appendChild(label)
        }
    };

    const AddDays = () => {

        calendar.textContent = ''
        for (let i = 1; i <= paddingDays + daysInMonth; i++) {
            const daySquare = document.createElement('li')
            daySquare.classList.add('cld-day')

            const dayNumber = document.createElement('p')
            dayNumber.classList.add('cld-number')
            daySquare.appendChild(dayNumber)

            /*const dayString = `${i - paddingDays}/${month + 1}/${year}`;
            const birthDayString = `${i - paddingDays}/${month + 1}`;*/

            const MyBirthdayDateString = ('0' + (i - paddingDays)).slice(-2) + '/' + ('0' + (month + 1)).slice(-2)

            if (i > paddingDays) {

                const eventForDay = events.find(element => element.birthday === MyBirthdayDateString)


                dayNumber.innerText = i - paddingDays

                if (i - paddingDays === day && nav === 0) {
                    daySquare.classList.add('today')
                }

                if (eventForDay) {

                    const convertDate = eventForDay.dateF2.replace(/[/]/g, '-')
                    const reversedDate = convertDate.split("-").reverse().join("-")
                    const reversedDateYear = new Date(eventForDay.dateF2).getFullYear()

                    function getAge(dateString) {
                        let today = new Date()
                        let birthDate = new Date(dateString)
                        let age = year - reversedDateYear
                        let m = dt.getMonth() - birthDate.getMonth()
                        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                            age--
                        }
                        return age
                    }

                    daySquare.style.backgroundImage = `url('${resultIMG}')`
                    dayNumber.classList.add('eventday')
                    dayNumber.innerText = `${eventForDay.name} \n ${eventForDay.email} \n ${eventForDay.phone} \n Age: ${getAge(reversedDateYear)}`
                    daySquare.addEventListener('click', () => openModal(MyBirthdayDateString))
                }
            } else {
                dayNumber.textContent = '*'
                daySquare.classList.add('prevMonth')
            }
            calendar.appendChild(daySquare)
        }

        for (let i = paddingDays + daysInMonth; i < 42; i++) {
            const daySquare = document.createElement('li')
            daySquare.classList.add('cld-day')
            daySquare.classList.add('nextMonth')

            const dayNumber = document.createElement('p')
            dayNumber.classList.add('cld-number')
            dayNumber.textContent = '*'
            daySquare.appendChild(dayNumber)

            calendar.appendChild(daySquare)
        }
    }

    AddNavigation()
    AddLabels()
    AddDays()

}

const saveEventInLocalStorage = () => {

    const newBirthDate = birthDate.value.replace(/-/g, "/")
    const inputBirthDate = newBirthDate.split("/").reverse().join("/")

    events.push({
        date: inputBirthDate,
        dateF2: birthDate.value,
        birthday: inputBirthDate.slice(0, 5),
        name: firstName.value,
        email: email.value,
        phone: phoneNumber.value
    })
    localStorage.setItem('events', JSON.stringify(events))
}

document.addEventListener('DOMContentLoaded', main)