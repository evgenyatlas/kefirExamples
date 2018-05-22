import K from 'kefir'
import Counter from './Counter'

//Dom elem
const root = document.querySelector('#root')
const counterA = new Counter('A')
const counterB = new Counter('B')
const counterC = new Counter('C')

const state$ = K.merge([counterA.getStream(), counterB.getStream(), counterC.getStream()])

const render = function (...stream) {
    const html = stream.map(stream => stream.render()).join('<br>')
    return html
}

state$.observe(_ => root.innerHTML = render(counterA, counterB, counterC))

/*First launching*/
root.innerHTML = render(counterA, counterB, counterC)
