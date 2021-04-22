import { commonTaskTemplateMgr, customTaskTemplateMgr } from './TaskTemplateMgr'

const MainMgr = {
  init () {
    commonTaskTemplateMgr.init()
    customTaskTemplateMgr.init()
  }
}

export default MainMgr
