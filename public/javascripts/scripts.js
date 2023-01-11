'use strict';

(function() {
    const socket = io();

    const chatContent = document.querySelector('#chat-content #content')
    const setNicknameContent = document.querySelector('#set-nickname')

    const messageForm = document.querySelector('#message-form')
    const nicknameField = document.querySelector('#nickname-field')
    const messageField = document.querySelector('#message-field')

    const setNicknameForm = document.querySelector('#set-nickname-form')
    const sendMessageButton = document.querySelector('#send-message-button')

    const colorInputButton = document.querySelector('#color-input')
    const colorPreview = document.querySelector('#color-preview')

    const displayError = (message) => {
        const el = (document.createElement('div'))
        el.classList.add('error')

        el.textContent = message

        el.addEventListener('click', el.remove)

        document.querySelector('#errors').appendChild(el)

        document.querySelector('#errors').scrollTo(0, document.querySelector('#errors').scrollHeight)

        setTimeout(() => {
            el.remove()
        }, 3000)
    }

    setNicknameForm.addEventListener('submit', (ev) => {
        ev.preventDefault()
        
        const nickname = nicknameField.value.trim()

        if(nickname.length > 0) {
            socket.emit('set_nickname', messageField.value)
            sessionStorage.setItem('nickname', nickname)
            sessionStorage.setItem('nicknameColor', colorInputButton.value)
    
            setNicknameContent.style.display = 'none'
            messageField.disabled = false
            sendMessageButton.disabled = false

            socket.emit('new_user', {
                nickname: nickname,
                nicknameColor: colorInputButton.value
            })
            document.querySelector('#spinner').style.display = 'block'
        } else {
            displayError('Nickname too short')
        }
    })

    colorInputButton.addEventListener('change', (ev) => {
        colorPreview.style.backgroundColor = ev.target.value
    })

    messageForm.addEventListener('submit', (ev) => {
        ev.preventDefault()

        if(!sessionStorage.getItem('nickname')) {
            setNicknameContent.style.display = 'block'
            messageField.disabled = true
            sendMessageButton.disabled = true

            return
        }

        if(messageField.value.trim().length > 0) {
            socket.emit('message', {
                nickname: sessionStorage.getItem('nickname'),
                nicknameColor: sessionStorage.getItem('nicknameColor'),
                message: messageField.value
            })
    
            messageField.value = ''
            messageField.focus()
        } else {
            displayError('Message cannot be blank.')
        }
    })

    const insertMessage = (message) => {
        const el = document.createElement('p')

        el.innerHTML = message

        chatContent.appendChild(el)

        chatContent.parentElement.scrollTo(0, chatContent.parentElement.scrollHeight)
    }

    socket.on('message', (message) => {
        if(sessionStorage.getItem('nickname')) {
            insertMessage(message)
        }
    })

    socket.on('get_messages', (messages) => {
        chatContent.innerHTML = ''

        for(let message of messages) {
            insertMessage(message)
        }

        document.querySelector('#spinner').style.display = 'none'
        chatContent.style.display = 'block'
    })

    const deleteSession = () => {
        sessionStorage.removeItem('nickname')
        sessionStorage.removeItem('nicknameColor')
    }

    socket.on('disconnect', () => {
        deleteSession()
    })

    window.onbeforeunload = deleteSession
})()

