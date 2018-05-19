import K from 'kefir'

//Dom elem
const root = document.querySelector('#root')
const getValueInput = () => +document.querySelector('.input-add').value

const inc$ = K.fromEvents(document.body, "click").filter(({ target }) => target.matches('.inc')).map(_ => 1)
const dec$ = K.fromEvents(document.body, "click").filter(({ target }) => target.matches('.dec')).map(_ => -1)
const add$ = K.fromEvents(document.body, "click")
    .filter(({ target }) => target.matches('.add'))
    .log()
    .map(_ => getValueInput())

const state$ = K.merge([inc$, dec$, add$]).scan((prev, next) => prev + next)

const render = function (state) {
    return `
    <div class="counterOut">
        <span>${state}</span>
    </div>
    <button type="button" class="inc">+</button>
    <button type="button" class="dec">-</button>
    <input type="number" class="input-add" />
    <button type="button" class="add">go</button>
    `
}

state$.observe(count => root.innerHTML = render(count))
