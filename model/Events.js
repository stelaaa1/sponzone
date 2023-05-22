const mongoose = require('mongoose');
//models are used to create Schema and give the db a unique stucture
const { Schema } = mongoose;

//creating new-Notes schema
//The NotesSchema object defines the structure and validation rules for the user notes.
const EventsSchema = new Schema({
  user: {
    //acts as a foreign key
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  eventName: {
    type: String,
    required: true,
  },
  eventAddress: {
    type: String,
    required: true,
  },
  eventBrief: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
  },
});
//registering allows us to perform CRUD on the collections
//"nameofcollection" -should be in sigular form
//creating the db model-.model(modelName,modelType)
Events = mongoose.model('Event', EventsSchema);
module.exports = Events;
