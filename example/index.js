import { config, start, componentFactory } from 'mk-meta-engine'
import myConfig  from './config'

import mk_app_person_list from './apps/mk-app-person-list/index.js'

const apps = {
	[mk_app_person_list.name]:mk_app_person_list,	
}


config(myConfig({apps}))


import * as mkComponents from 'mk-component'

Object.keys(mkComponents).forEach(key=>{
	componentFactory.registerComponent(key, mkComponents[key])
})
	

start()