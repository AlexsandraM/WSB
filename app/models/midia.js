var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

    var MidiaDigital = new Schema({
      autor: { type: String, max:50},
      issn: { type: String, max:8},
      tamanho: {type: String}
    })

module.exports = mongoose.model('MidiaDigital', MidiaDigital);
