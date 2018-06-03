import K from 'kefir'
import * as R from 'ramda'
import React from 'react'

export default (streamsToProps, ComponentToWrap) => {
    class Container extends React.Component {
        constructor(props) {
            super(props)

            this.state = {}

            Container.constructor$.plug(K.constant(props))
        }

        componentWillMount(...args) {
            let props$ = K.combine(streamsToProps)

            this.sb = props$.observe(data => {
                this.setState(data)
            }, console.error)

            Container.willMount$.plug(K.constant(args))
        }

        componentWillUnmount(...args) {
            this.sb.unsubscribe()

            Container.willUnmount$.plug(K.constant(args))
        }

        render() {
            return <ComponentToWrap {...R.merge(this.props, this.state)}>{this.props.children}</ComponentToWrap>
        }
    }


    Container.constructor$ = K.pool()
    Container.willMount$ = K.pool()
    Container.willUnmount$ = K.pool()

    return Container
}