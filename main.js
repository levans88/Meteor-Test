// simple-todos.js
Posts = new Mongo.Collection("posts");
Tags = new Mongo.Collection("tags");

//temporary test change

if (Meteor.isClient) {
  // This code only runs on the client
  Template.body.helpers({
    posts: function () {
      return Posts.find({}, {sort: {createdAt: -1}});  //-1 is descending
    },  
    tags: function () {
      return Tags.find();
    }
  });

	Template.body.events({
		"submit .new-post": function (event) {
			console.log(event);
		  // This function is called when the new task form is submitted

		  var text = event.target.text.value;
      // ***expression below may not handle other browsers entering line breaks***
      text = text.replace(/&/g, '&amp');
      text = text.replace(/</g, '&lt;');
      text = text.replace(/>/g, '&gt;');
		  text = text.replace(/\r?\n/g, '<br/>');
      Posts.insert({
		    text: text,	//we are inserting literally - "text: " ..., "createdAt: " ...
		    createdAt: new Date() // current time
		  });

		  // Clear form
		  event.target.text.value = "";

		  // Prevent default form submit
		  return false;
		}
	});

	Template.post.events({
  "click .toggle-checked": function () {
    // Set the checked property to the opposite of its current value
    Posts.update(this._id, {$set: {checked: ! this.checked}});
  },
  "click .delete": function () {
    var deleteConfirmed = confirm("Post will be permanently deleted. Are you sure?");
    //console.log(deleteConfirmed);
    if (deleteConfirmed) {
    	Posts.remove(this._id);	
    }
    

  }
});
}
