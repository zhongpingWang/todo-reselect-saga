/* eslint-disable no-constant-condition */
import { put, call, takeEvery,fork,take } from 'redux-saga/effects' 
import * as actions from '../actions/index' 

import test from '../interface/test'


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// export const loginSelector = state => state.selectedReddit
// export const postsByRedditSelector = state => state.postsByReddit

export function* incrementAsync() {  
  yield put({type: 'INCREMENT'})
}  


export function* fetchLogin() {   
  yield put( actions.fetchLogin() )
  const posts = yield call(test.test)  
    //const [users, repos]= yield [call(fetchLoginApi),call(fetchLoginApi)] 
  yield put( actions.receivePosts("",[] ))
}


export function* startup() {  
  yield fork(fetchLogin);
}

export function* invalidateReddit() {
  while (true) {
    const {reddit} = yield take(actions.INVALIDATE_REDDIT)
     
    const posts = yield call(test.test)  
    //const [users, repos]= yield [call(fetchLoginApi),call(fetchLoginApi)] 
    yield put( actions.receivePosts("", posts.response.data.children.map(child => child.data)))
  }
}

export default function* root() {
  yield takeEvery('INCREMENT2', incrementAsync)
  yield fork(startup)
  yield fork(invalidateReddit)
   
}
