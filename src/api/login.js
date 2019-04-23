/**
* Created by Administrator on 2018/4/17.
*/
import fetch from 'common/js/fetch'

export function login (returnUrl) {
  return fetch({
    url: '/rwlmall/wechat/authorize',
    params: {
      returnUrl
    }
  })
}
