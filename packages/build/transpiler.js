const fs         = require('fs')
const meta       = require('html-meta-tags')
const handlebars = require('handlebars')

module.exports = (file, target, config) => {
  const source = fs.readFileSync(file, 'utf-8')
  const template = handlebars.compile(source)
  const data = {
    title: config.head.title,
    meta: meta(config.head)
  }

  fs.writeFileSync(target, template(data))
  
  return true
}