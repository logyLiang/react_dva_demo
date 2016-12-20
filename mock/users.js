const qs = require('qs')
const Mock = require('mockjs')
const Watch = require("watchjs")

let usersListData = {}
if (!global.usersListData) {
  const data = !!localStorage.getItem("antdUsersListData")
    ? JSON.parse(localStorage.getItem("antdUsersListData"))
    : Mock.mock({
      'data|100': [
        {
          'id|+1': 1,
          name: '@cname',
          nickName: '@last',
          phone: /^1[34578]\d{9}$/,
          'age|11-99': 1,
          address: '@county(true)',
          isMale: '@boolean',
          email: '@email',
          createTime: '@datetime',
          avatar: function () {
            return Mock.Random.image('100x100', Mock.Random.color(), "#757575", 'png', this.nickName.substr(0, 1))
          }
        }
      ],
      page: {
        total: 100,
        current: 1
      }
    })
  usersListData = data
  global.usersListData = usersListData
  if (!localStorage.getItem("antdUsersListData")) {
    localStorage.setItem("antdUsersListData", JSON.stringify(usersListData))
  }
} else {
  usersListData = global.usersListData
}

Watch.watch(usersListData, function () {
  localStorage.setItem("antdUsersListData", JSON.stringify(usersListData))
})

module.exports = {

  'GET /api/users'(req, res) {
    const page = qs.parse(req.query)
    const pageSize = page.pageSize || 20
    const currentPage = page.page || 1

    let data
    let newPage

    let newData = usersListData.data.concat()

    if (page.field) {
      const d = newData.filter(function (item) {
        return item[page.field].indexOf(decodeURI(page.keyword)) > -1
      })

      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize)

      newPage = {
        current: currentPage * 1,
        total: d.length
      }
    } else {
      data = usersListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      usersListData.page.current = currentPage * 1
      newPage = {
        current: usersListData.page.current,
        total: usersListData.page.total
      }
    }
    res.json({ success: true, data, page: newPage })
  },

  'POST /api/users'(req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.avatar = Mock.Random.image('100x100', Mock.Random.color(), "#757575", 'png', newData.nickName.substr(0, 1))

    newData.id = usersListData.data.length + 1
    usersListData.data.unshift(newData)

    usersListData.page.total = usersListData.data.length
    usersListData.page.current = 1

    global.usersListData = usersListData
    res.json({ success: true, data: usersListData.data, page: usersListData.page })
  },

  'DELETE /api/users'(req, res) {
    const deleteItem = req.body

    usersListData.data = usersListData.data.filter(function (item) {
      if (item.id == deleteItem.id) {
        return false
      }
      return true
    })

    usersListData.page.total = usersListData.data.length

    global.usersListData = usersListData
    res.json({ success: true, data: usersListData.data, page: usersListData.page })
  },

  'PUT /api/users'(req, res) {
    const editItem = req.body

    editItem.createTime = Mock.mock('@now')
    editItem.avatar = Mock.Random.image('100x100', Mock.Random.color(), "#757575", 'png', editItem.nickName.substr(0, 1))

    usersListData.data = usersListData.data.map(function (item) {
      if (item.id == editItem.id) {
        return editItem
      }
      return item
    })

    global.usersListData = usersListData
    res.json({ success: true, data: usersListData.data, page: usersListData.page })
  }

}
