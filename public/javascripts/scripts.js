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
        console.log(message)
    }

    setNicknameForm.addEventListener('submit', (ev) => {
        ev.preventDefault()
        
        const nickname = nicknameField.value.trim()

        if(nickname.length > 0) {
            socket.emit('set_nickname', messageField.value)
            sessionStorage.setItem('nickname', nicknameField.value)
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

        socket.emit('message', {
            nickname: sessionStorage.getItem('nickname'),
            nicknameColor: sessionStorage.getItem('nicknameColor'),
            message: messageField.value
        })

        messageField.value = ''
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

