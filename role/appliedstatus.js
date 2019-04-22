var Enum = require('enum');

var Status = new Enum({'0': 'Applied', '1': 'Selected', '2': 'Rejected', '3':'Inprogress', '4': 'Closed'});
module.exports = Status;