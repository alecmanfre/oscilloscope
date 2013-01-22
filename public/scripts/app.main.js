var p = 'scripts/vendor/';
require(["jquery", p + "dropdown.js", p + "prettify.js", "./scripts/examples.js","./scripts/app.analog.js"], function($, dd, pf, examples) {
  $(document).ready(function(e) {
    prettyPrint();
    examples.bind();
  });
});