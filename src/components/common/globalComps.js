import Vue from 'vue'

import MoBreadcrumb from './MoBreadcrumb'
Vue.component('MoBreadcrumb', MoBreadcrumb)

import MoTable from './table/MoTable'
Vue.component('MoTable', MoTable)
import MoTableColumn from './table/MoTableColumn'
Vue.component('MoTableColumn', MoTableColumn)

import MoPagination from './MoPagination'
Vue.component('MoPagination', MoPagination)

import MoDialog from './MoDialog'
Vue.component('MoDialog', MoDialog)

import MoForm from './MoForm'
Vue.component('MoForm', MoForm)
import MoFormItem from './MoFormItem'
Vue.component('MoFormItem', MoFormItem)
import MoInput from './MoInput'
Vue.component('MoInput', MoInput)

//简易小组件--不包含或包含少量数据传递
import MoCard from './MoCard'
Vue.component('MoCard', MoCard)

import MoButton from './MoButton'
Vue.component('MoButton', MoButton)

import MoTag from './MoTag'
Vue.component('MoTag', MoTag)

import MoSplit from './MoSplit'
Vue.component('MoSplit', MoSplit)

//写作小组件
import MoWrite from './write/MoWrite'
Vue.component('MoWrite', MoWrite)
import MoCatalogue from './write/MoCatalogue'
Vue.component('MoCatalogue', MoCatalogue)
import MoHeadline from './write/childComps/MoHeadline'
Vue.component('MoHeadline', MoHeadline)
import MoLeadIn from './write/childComps/MoLeadIn'
Vue.component('MoLeadIn', MoLeadIn)
import MoParagraph from './write/childComps/MoParagraph'
Vue.component('MoParagraph', MoParagraph)
import MoTextbox from './write/childComps/MoTextbox'
Vue.component('MoTextbox', MoTextbox)
import MoLink from './write/childComps/MoLink'
Vue.component('MoLink', MoLink)
