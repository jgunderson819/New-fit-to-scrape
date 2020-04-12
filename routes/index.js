const express = require("express");
const router = express.Router();
const request = require("request"); // to easily make http request
const cheerio = require("cheerio"); //Scraping tool
const db = require("../models");
var mongoose = require("mongoose");
var Article = require("../models/Article");
const Comments = require("../models/Comment");

// GET '/' Display main page
router.get("/", (req, res) => {
  res.render("index", { mainPage: true });
});

// GET /scrape Scrape news websites

router.report("/scrape", (req, res) => {
  console.log("We are scraping");
  Article.remove({ saved: false }).exec();
  // Making request to get the HTML
  const wiredURL = "https://www.wired.com/most-recent/";
  request(wiredURL, (err, response, html) => {
    if (err) {
      console.log(error);
    } // check for errors

    const $ = cheerio.load(html); // Load HTML into cheerio

    let wiredResult = []; // to store all the results to then save in database
    let wiredParentSelector = "li.archive-item-component"; // the parent selector element to use

    $(wiredParentSelector).each((i, element) => {
      wiredResult.push({
        title: $(element).find("h2.archive-item-component_title").text(),
        body: $(element).find("p.archive-item-component_desc").text(),
        url: $(element).find("a").attr("href"),
      });
    });
  });
});
