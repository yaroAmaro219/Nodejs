var _ = require("lodash")
var fs = require('fs')
var data = {
  name: "bob"
}

// console.log(data.name)


// fs.readFile('./data.json', 'UTF-8', (err, data) => {
//   var data = JSON.parse(data)
//     console.log(data.name)
// })

// fs.readdir('c:/', (err, data) => {
//   console.log(data)
// })

fs.writeFile('data1.json', JSON.stringify(data), (err) => {
  console.log('write finished', err)
})