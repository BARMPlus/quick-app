/**
 * Created by Administrator on 2018/4/18.
*/

export const ERR_OK = 0

export async function promise (api) {
  let promise = new Promise((resolve, reject) => {
    api.then((ops) => {
      ops.code && ops.code === ERR_OK ? resolve(ops.data) : reject(ops)
    }).catch((err) => {
      reject(err)
    })
  })
  try {
    return await promise
  } catch (e) {
    console.error(e)
    return e
  }
}

export const platformText = { // 定义枚举类，如下
  problem: 1, // 常见问题
  about: 2, // 关于小让
  joinIn: 3, // 加盟小让
  userProtocol: 4, // 用户协议
  accede: 5// 加入小让
}
