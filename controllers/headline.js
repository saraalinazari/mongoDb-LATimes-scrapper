const db = require('../models');

exports.index = function(req,res){
    //it should show data from data base
    console.log('inside headline.js');
    db.Headline.find({},null,{sort: {createdAt:1}}, (err,data)=>{
      //  console.log(data);
        let hbsObj2={
            headline: data,
            customCss: './css/style.css',
            customJs: './js/scrape.js'
        }
        if(data.length === 0)
        {
            res.render('home');
        }
        else{
            res.render('home',hbsObj2);
        }
        
    });
    // .then(function(dbArticle) {{headline:data}
    //   // If we were able to successfully find Articles, send them back to the client
    //   res.json(dbArticle);
    // })
    // .catch(function(err) {
    //   // If an error occurred, send it to the client
    //   res.json(err);
    // });
    // res.render('home');
}

exports.saveArticle = function(req,res){
    console.log('inside headline.js');
    let articleId = req.params.id;
    console.log("articleId",articleId);
    db.Headline.findById(articleId,(err,data) =>{
        if(data.saved){
            db.Headline.findByIdAndUpdate(articleId,{$set:{saved: false}},{new: true},(err,data)=>{
                res.render('home');
            });
        }
        else{
            db.Headline.findByIdAndUpdate(articleId,{$set:{saved: true}},{new: true},(err,data)=>{
                res.render('home');
            });
        }
    });
    
}

exports.showSavedArticles = function(req,res){
    console.log("inside the controller for showing saved articles");
    //db.Headline.find({saved:true},(err,data)=>{
   // db.Headline.find({saved:true},(err,data)=>{
    db.Headline.find({"saved":true})
    .populate({path: "notes"}).exec(function(err, data) {
        if(data){
                    console.log(data);
                   res.render('saved', {
                    layout: 'main',
                    headline:data
                  });
                   //res.json(data);{headline:data}
                }
    });
    // .then(function(data){
    //     if(data){
    //         console.log(data);
    //        res.render('saved', {
    //         layout: 'main',
    //         headline:data
    //       });
    //        //res.json(data);{headline:data}
    //     }
    // });
    //     if(err){
    //         res.json(err);
    //     }
    //     let hbsObj={
    //         headline: data,
    //         customCss: './css/style.css',
    //         customJs: './js/scrape.js'
    //     }
    //     if(data){
    //         console.log(data);
    //        res.render('saved', {
    //         layout: 'main',
    //         headline:data
    //       });
    //        //res.json(data);{headline:data}
    //     }
    // });
}

exports.showNotes = function(req,res){
    console.log("Controller for showing notes");
    let thisId = req.params.id;
    db.Headline.findOne({ _id: thisId })
    // ..and populate all of the notes associated with it
    .populate("notes")
    .then(function(data) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(data);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
}


exports.addNote = function(req,res){
    console.log("Controller for adding notes");
    let id = req.params.id;
    let title = req.body.title;
    let body = req.body.body;
 // let note = req.body;
    console.log("title:  ", title);
    console.log('id: ', id);
    console.log("body:  ", body);
   // console.log("note:  ", note);
    let note={
        title: title,
        body: body,
        headline: id
    };console.log("note:  ", note);
    db.Note.create(note)
    .then(function(dbNote) {
        console.log(dbNote);
      // findOneAndUpdate  If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
      // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
      // dbNote._idSince our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
      return db.Headline.findByIdAndUpdate({ _id: id }, {$push: {notes: {_id:dbNote._id,title:dbNote.title,body:dbNote.body,headline: dbNote.headline} }}); //{ notes: {_id:dbNote._id,title:dbNote.title,body:dbNote.body}  }, { new: true });
    })
    .then(function(notes) {
      // If we were able to successfully update an Article, send it back to the client
      res.json(notes);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      console.log("err",err);
      res.json(err);
    });

}

exports.deleteNote = function(req,res){
    let noteId = req.params.noteId;
    let headlineId = req.params.headlineId;
    console.log("noteId",noteId);
    console.log("headlineId",headlineId);
    db.Note.findByIdAndRemove({_id:noteId},function(err){
        if(err){
            console.log(err);
            res.send(err);
        }
        else{
            db.Headline.findByIdAndUpdate({_id: headlineId},{$set:{notes:""}},{new:false})
            .exec(function(err){
                if(err){
                    console.log(err);
                    res.send(err);
                }else{
                    res.send("Not deleted");
                }
            });
        }
    });
}