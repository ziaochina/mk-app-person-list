import { Map, fromJS } from 'immutable'
import { reducer as MetaReducer } from 'mk-meta-engine'
import config from './config'
import { getInitState } from './data'

class reducer {
    constructor(option) {
        this.metaReducer = option.metaReducer
    }

    init = (state, option) => {
        const initState = getInitState()
        //init之后紧接有load的情况可以设置_notRender=true,优化性能
        initState.data._notRender = true
        return this.metaReducer.init(state, initState)

    }

    load = (state, response) => {
        //init之中存在_notRender=true,load要重新设置为false,否则引擎会不render
        state = this.metaReducer.sf(state, 'data._notRender', false)
        state = this.metaReducer.sf(state, 'data.list', fromJS(response.list))
        state = this.metaReducer.sf(state, 'data.pagination', fromJS(response.pagination))
        state = this.metaReducer.sf(state, 'data.filter', fromJS(response.filter))
        return state
    }

    selectAll = (state, checked) => {
        var lst = this.metaReducer.gf(state, 'data.list')

        if (!lst || lst.size == 0)
            return state

        for (let i = 0; i < lst.size; i++) {
            state = this.metaReducer.sf(state, `data.list.${i}.selected`, checked)
        }

        return state
    }


}

export default function creator(option) {
    const metaReducer = new MetaReducer(option),
        o = new reducer({ ...option, metaReducer })

    return { ...metaReducer, ...o }
}