// simple-todos.js
Tasks = new Mongo.Collection("tasks");


if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    tasks: function () {
      return Tasks.find({}, {sort: {createdAt: -1}});  //-1 is descending
    }  
  });

	Template.body.events({
		"submit .new-task": function (event) {
			console.log(event);
		  // This function is called when the new task form is submitted

		  var text = event.target.text.value;

		  Tasks.insert({
		    text: text,	//we are inserting literally - "text: " ..., "createdAt: " ...
		    createdAt: new Date() // current time
		  });

		  // Clear form
		  event.target.text.value = "";

		  // Prevent default form submit
		  return false;
		}
	});

	Template.task.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Tasks.update(this._id, {$set: {checked: ! this.checked}});
  },
  "click .delete": function () {
    var deleteConfirmed = confirm("Post will be permanently deleted. Are you sure?");
    //console.log(deleteConfirmed);
    if (deleteConfirmed) {
    	Tasks.remove(this._id);	
    }
    

  }
});
}
