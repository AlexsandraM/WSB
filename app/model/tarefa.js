var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId;

var Tarefa = new Schema({
	date: { type: Date, default: Date.now },
	description: { type: String, max: 256 },
	done: { type: Boolean, default: false },
	priority: { type: Number, min: 1, max: 3 }
});

module.exports = mongoose.model('Tarefa', Tarefa);