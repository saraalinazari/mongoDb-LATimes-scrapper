$(document).ready(function(){
    $('#scrapeBtn').on('click',scrapeAll);
    $('.saveBtn').on('click', saveArticle);
    $('#showSavedBtn').on('click',showSavedArticles);
    $('.saveNote').on('click',saveNote);
    $('#openModal').on('click',showNotes);
    $('.deleteNote').on('click',deleteNote);
});

function scrapeAll(){
    console.log("inside scrapeall");
    $.get("/scrape", ()=>{
        console.log("got");
    }).done(()=>{
        //window.location.reload();
        window.location.href = "/";
    }
    )
}
function saveArticle(){
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/saved/" + thisId,
        data: {
          // Value taken from title input
          id: thisId
        }
      })
        // With that done
        .then(function(data) {
          // Log the response
          console.log(data);
          // Empty the notes section
         
        });
}
function showSavedArticles(){
    
    $.get("/saved", ()=>{
        console.log("got Saved");
    }).done(()=>{
        window.location.href='/saved';
        //res.render('home');
    }
    );

}

function showNotes(){
    let thisId = $(this).attr("data-id");
    // $.ajax({
    //     method: "GET",
    //     url: "/notes/" + thisId
    // }).done(()=>{
    //    // window.location.href='/saved';
    //     //res.render('home');
    //     console.log("send request to get notes");
    // }
    // )

}

function saveNote(){
    console.log("inside saveNote function in scrape.js");
    
    let thisId = $(this).attr("data-id");
    let noteTitle= $('#noteInputTitle'+thisId).val();
    let noteBody = $('#noteInputBody'+thisId).val();
    let id1 = $(this).attr("value");
    console.log("noteTitle: ", noteTitle);
    console.log("noteInputBody: ", noteBody);
    console.log("id: ", thisId);
    console.log("id1: ", id1);
    
    $.ajax({
        method: "POST",
        url: "/addNote/" + thisId,
        data: {
          // Value taken from title input
          
          title: noteTitle,
          body: noteBody

        }
      })
        // With that done
        .then(function(data) {
          // Log the response
          console.log(data);

          // Empty the notes section
          $("#noteModal").modal("hide");
          window.location.href = "/saved";
        });
}

function deleteNote(){
    let noteId= $(this).attr('data-note-id');
    let headlineId = $(this).attr('data-headline-id');
    console.log("noteId",noteId);
    console.log("headlineId",headlineId);
    // $.ajax({
    //     method: "GET",
    //     url: "/deleteNotes/" + noteId+"/"+headlineId
    // $.get("/deleteNotes/" + noteId+"/"+headlineId, ()=>{
    //     console.log("got Saved");
    // }).done(()=>{
    //     window.location.href='/saved';
    //     //res.render('home');
    // }
    // );
    $.ajax({
        method: "DELETE",
        url: "/deleteNotes/" + noteId + "/" + headlineId
    }).done(function(data) {
        console.log(data)
        $(".modalNote").modal("hide");
        window.location.href = "/saved";
    });
    // .done(function(data){
    //    // window.location.href='/saved';
    //     //res.render('home');
    //     console.log("data",data);
    //     $(".modalNote").modal("hide");
    //     console.log("send request to delete notes");
    //     window.location.href='/saved';
    // }
    // )
}