const cheerio = require('cheerio');
const request = require('request');
// const Headline = require('../models/Headline');
// const Note = require('../models/Note');
const db = require('../models');
exports.index = function(req,res){
    //it should show data from news website
    console.log("You are in fetch.js controller");
    request("http://www.latimes.com/latest/",function(error,response,html){
        const $ = cheerio.load(html);
        let result={};

        // $('div.gs-c-promo').each((i,element) => {
        //     result.img = $(element).find('div.gs-c-promo-image').find('div.gs-o-media-island').find('div.gs-o-responsive-image').find('img').attr('src');
        //     result.link= $(element).find('div').find('div').find('a').attr('href');
        //     result.title = $(element).find('div').find('div').find('a').find('h3').text().trim();
        //     result.summary = $(element).find('div').find('div').find('p.gs-c-promo-summary').text().trim();
        //     result.createdAt = $(element).find('div').find('ul').find('li').find('span').find('time').attr('datetime');
            
        $('li.trb_outfit_group_list_item').each((i, element) => {
            result.link = (($(element).find('a').attr('href')).split(".html")[0]);
            result.title = $(element).find('h3').find('a').text().trim();
            result.summary = $(element).find('p.trb_outfit_group_list_item_brief').text().trim();
            result.img = $(element).find('a').find('img').attr('data-baseurl');
            result.createdAt = $(element).find('span.trb_outfit_categorySectionHeading_date').attr('data-dt');
        
            
            
            console.log(result);
       
        db.Headline.create(result)
        .then(function(dbHeadline) {
          // View the added result in the console
          console.log(dbHeadline);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
        db.Headline.find({title: result.title})
        .then(function(dbHeadline) {
          // If we were able to successfully find Articles, send them back to the client
          res.json(dbHeadline);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          res.json(err);
        });

     });
/* <p class="gs-c-promo-summary gel-long-primer gs-u-mt nw-c-promo-summary">Counter terror police investigate after a man and woman are exposed to an unknown substance near Salisbury.</p> */
        res.redirect("/");
    });


}