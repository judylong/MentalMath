# MentalMath

### Math game app made with Ruby on Rails and Backbone.js

### Find a live version [here][heroku]
[heroku]: http://mentalmath.judylong.xyz/
Note: Please use Google Chrome

### Game Play
The game is split up into 9 levels, each testing a different type of arithmetic problem.
By default, a voice will read out the problem to solve, and you should type in your answer into the input box and press enter to submit.
Answer correctly, and you'll be given a new question.
Answer incorrectly, and the question will be repeated. Make submissions until you get it right, or click on the level again to get a new question.

### To set up locally
- cd into MentalMath and run: `bundle install`
- setup and seed database: `bundle exec rake db:setup`
- start server: `rails s`

### Additional Libraries/Resources Used
- Chrome browser's native Speech Synthesis API
- Highcharts.js
