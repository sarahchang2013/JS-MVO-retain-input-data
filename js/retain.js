$(function(){

    var model = {
        //only deals with data, not views
        //no "view.xx()" here
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    var octopus = {
        //controller handles methods of model and view 
        //like a HUB between them
        addNewNote: function(noteStr) {
            model.add({
                //pass an object as variable to model
                content: noteStr,
                timestamp: new Date().toLocaleString()
            });
            view.render();
        },

        getNotes: function() {
            return model.getAllNotes();
        },

        init: function() {
            model.init();
            view.init();
        }
    };


    var view = {
        //no "model.xx()" here.
        //view functions call controller methods,
        //controller then calls model methods 
        //never directly communicate with model
        init: function() {
            //grab data from dom
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            //add event listeners to dom objects
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        render: function(){
            var htmlStr = '';
            //note is passed to the function by forEach.
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note">'+
                        note.content + ', ' + note.timestamp +
                    '</li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    octopus.init();
});