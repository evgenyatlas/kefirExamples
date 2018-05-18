import K from 'kefir'

//Dom elem
const counterOut = document.querySelector('.counterOut')
const incButton = document.querySelector(`.inc`)
const decButton = document.querySelector(`.dec`)
const inputButton = document.querySelector('.add')
const inputNumber = document.querySelector('.input-add')

const inc$ = K.fromEvents(incButton, "click").map(_ => 1)
const dec$ = K.fromEvents(decButton, "click").map(_ => -1)
const input$ = K.fromEvents(inputButton, "click").map(_ => parseInt(inputNumber.value))//It is legal?
const state$ = K.merge([inc$, dec$, input$]).scan((prev, next) => prev + next)

const render = function (state) {
    return `<span>${state}</span>`
}

state$.observe(count => counterOut.innerHTML = render(count))
