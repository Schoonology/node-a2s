var request = require('request')

//
// # A2SRenderer
//
function A2SRenderer(obj) {
  if (!(this instanceof A2SRenderer)) {
    return new A2SRenderer(obj)
  }

  obj = obj || {}

  this.url = this.url || obj.url || 'http://api.a2saas.com'
}
A2SRenderer.A2SRenderer = A2SRenderer

//
// ## render `render(options, callback)`
//
// Renders **options.text** to SVG.
//
// Returns the SVG content.
//
A2SRenderer.prototype.render = render
function render(options, callback) {
  var self = this
    , text = options.text

  self.put({
    text: text
  }, function (err, id) {
    if (err) {
      callback(err)
      return
    }

    self.get({
      id: id
    }, callback)
  })
}

//
// ## put `put(options, callback)`
//
// PUTs **options.text** to the supplied host.
//
// Returns the new ID.
//
A2SRenderer.prototype.put = put
function put(options, callback) {
  var self = this
    , text = options.text

  request.put({
    url: self.url + '/put.php',
    body: text
  }, function (err, response, body) {
    if (err) {
      callback(err)
      return
    }

    if (body.error) {
      callback(body.error)
      return
    }

    callback(null, JSON.parse(body).success)
  })
}

//
// ## get `get(options, callback)`
//
// GETs **options.id** from the supplied host.
//
// Returns the SVG contents.
//
A2SRenderer.prototype.get = get
function get(options, callback) {
  var self = this
    , id = options.id

  request.get({
    url: self.url + '/get.php',
    qs: {
      id: id
    }
  }, function (err, response, body) {
    if (err) {
      callback(err)
      return
    }

    if (body.error) {
      callback(body.error)
      return
    }

    callback(null, JSON.parse(body).svg)
  })
}

module.exports = A2SRenderer
