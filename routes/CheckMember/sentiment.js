var express = require('express');
var router = express.Router();

// Imports the Google Cloud client library
// const language = require('@google-cloud/language');

// Creates a client
// const client = new language.LanguageServiceClient();

router.post('/', function(req, res){
    //var message = req.body.msg;
    var item = {};
    var result_code;

    // Prepares a document, representing the provided text
    /*const document = {
        content: message,
        type: 'PLAIN_TEXT'
    };*/

    //var result = 1;
    result_code = 1;
    item.code = result_code;

    // Detects the sentiment of the document
    /*client
        .analyzeSentiment({document: document})
        .then(results => {

        item.code = 1;

            const sentiment = results[0].documentSentiment;

            console.log(`Document sentiment:`);
            console.log(`  Score: ${sentiment.score}`);
            console.log(`  Magnitude: ${sentiment.magnitude}`);

    }).catch(err => { console.error('ERROR:', err); });*/

    res.end(JSON.stringify(item));
});

module.exports = router;
