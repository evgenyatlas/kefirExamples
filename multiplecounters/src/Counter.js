import K from 'kefir'

class Counter {
    constructor(name) {
        this._state = 0
        this._name = name
        const _inc$ = K.fromEvents(document.body, "click").filter(({ target }) => target.matches(`.inc-${this._name}`)).map(_ => 1)
        const _dec$ = K.fromEvents(document.body, "click").filter(({ target }) => target.matches(`.dec-${this._name}`)).map(_ => -1)
        this._state$ = K.merge([_inc$, _dec$]).scan((prev, next) => prev + next)

        this._state$.observe(count => this._state = count)
    }

    render() {
        return `
        <div class="counter">
            <div class="counterOut">
                <span>Counter:${this._name} </span><span>${this._state}</span>
            </div>
            <button type="button" class="inc-${this._name}">+</button>
            <button type="button" class="dec-${this._name}">-</button>
        </div>`
    }

    getStream() {
        return this._state$
    }
}

export default Counter