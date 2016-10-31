$(function() {
  function update_background_width() {
    var trump_votes = parseInt($('#votes-t').html());
    var hilary_votes = parseInt($('#votes-c').html());

    var ratio = trump_votes / (trump_votes + hilary_votes) * 100;

    var bg_trump = $('.back-trump');
    var bg_hilary = $('.back-hilary');

    bg_trump.css('width', ratio.toString() + '%');
    bg_hilary.css('margin-left', ratio.toString() + '%');
    bg_hilary.css('width', (100 - ratio).toString() + '%');
  }

  function get_data() {
    // $.get('http://trump-app.appspot.com/hacky', function (data) {
    //   data = data.split('\n');
    //});
     var request = new XMLHttpRequest();
     request.onreadystatechange = function() {
       if(request.readyState == 4 && request.status == 200)
        callback_1(request.responseText)
     }
     request.open("GET", "http://trump-app.appspot.com/hacky", true);
     request.send(null);
    // xhr = createCORSRequest("GET", 'https://inbox.google.com/');
    // console.log(xhr);
    // data = xhr.responseText;
    // console.log("data: "+ data);
    // $('#t-votes').val(data[0]);
    // $('#h-votes').val(data[1]);
  }

  function callback_1(data) {
    data = data.split('\n');
    $('#votes-c').html(data[1]);
    $('#votes-t').html(data[0]);
    update_background_width();
  }

  // function createCORSRequest(method, url) {
  // var xhr = new XMLHttpRequest();
  //   if ("withCredentials" in xhr) {
  //
  //     // Check if the XMLHttpRequest object has a "withCredentials" property.
  //     // "withCredentials" only exists on XMLHTTPRequest2 objects.
  //     xhr.open(method, url, true);
  //
  //   } else if (typeof XDomainRequest != "undefined") {
  //
  //     // Otherwise, check if XDomainRequest.
  //     // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
  //     xhr = new XDomainRequest();
  //     xhr.open(method, url);
  //
  //   } else {
  //
  //     // Otherwise, CORS is not supported by the browser.
  //     xhr = null;
  //
  //   }
  //   return xhr;
  // }

  function vote(val) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if(request.readyState == 4 && request.status == 200)
       console.log('Votes changed');
       callback_1(request.responseText)
    }

    request.open("GET", "http://trump-app.appspot.com/hacky?option=" + val.toString(), true);
    request.send(null);
  }

  $("#img-trump").click(function (e) {
    vote(0);
  });

  $("#img-hillary").click(function (e) {
    vote(1);
  });

  get_data();
});
