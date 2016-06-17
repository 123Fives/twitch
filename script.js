$(function() {
  var userNames = ["freecodecamp", "syntag", "devwars", "teamspOOky","itshafu","trumpsc","telltale","rubcup","habathcx", "RobotCaleb", "noobs2ninjas","ESL_SC2", "OgamingSC2", "cretetion"],

    streamurl = "https://api.twitch.tv/kraken/streams/",
    userurl = "https://api.twitch.tv/kraken/users/",
    noLogo = "https://dl.dropboxusercontent.com/u/21809793/dairy-cow-300x300.jpg",
    offline = "</p></div><span class='fa fa-square-o'></span>",
    status,
    statusP,
    userDiv;

  function displayAllUsers(arr) {
    //add or remove active class from buttons
    $(".online-users, .offline-users").removeClass("active");
    $(".all-users").addClass("active");

    arr.forEach(function(user) {
      return $.getJSON(userurl + user + "/?callback=?", function(result) {
        $.getJSON(streamurl + user + "/?callback=?", function(data) {
          //check for logo
          if (result.logo === null) {
            result.logo = noLogo;
          }
          //check streaming status
          if (data.stream === null) {
            status = offline;
          } else {
            //get and shorten status
            statusP = data.stream.channel.status;
            statusP = statusP.substr(0, 33);
            status = "</br><span class='details'>" + statusP + "</span></p></div><span class='fa fa-check-square-o'></span>";
          }
          //create HTML
          userDiv = '<a href="http://twitch.tv/' + result.name + '"><div class="user-div"><img class="img-responsive img-rounded img-profile" title=' + result.display_name + ' src=' + result.logo + '><div class="text"><p class="display-name">' + result.display_name + status + '</div></a>';

          $(".results").append(userDiv);
        });
      });
    });
  }

  function displayOnlineUsers() {
    $(".all-users, .offline-users").removeClass("active");
    $(".online-users").addClass("active");

    userNames.forEach(function(user) {
      return $.getJSON(userurl + user + "/?callback=?", function(result) {
        $.getJSON(streamurl + user + "/?callback=?", function(data) {

          if (result.logo === null) {
            result.logo = noLogo;
          }
          if (data.stream !== null) {

            statusP = data.stream.channel.status;
            statusP = statusP.substr(0, 33);
            status = "</br><span class='details'>" + statusP + "</span></p></div><span class='fa fa-check-square-o'></span>";

            userDiv = '<a href="http://twitch.tv/' + result.name + '"><div class="user-div"><img class="img-responsive img-rounded img-profile" title=' + result.display_name + ' src=' + result.logo + '><div class="text"><p class="display-name">' + result.display_name + status + '</div></a>';

            $(".results").append(userDiv);
          }
        });
      });
    });
  }

  function displayOfflineUsers() {
    $(".all-users, .online-users").removeClass("active");
    $(".offline-users").addClass("active");

    userNames.forEach(function(user) {
      return $.getJSON(userurl + user + "/?callback=?", function(result) {
        $.getJSON(streamurl + user + "/?callback=?", function(data) {

          if (result.logo === null) {
            result.logo = noLogo;
          }
          if (data.stream === null) {

            status = offline;

            userDiv = '<a href="http://twitch.tv/' + result.name + '"><div class="user-div"><img class="img-responsive img-rounded img-profile" title=' + result.display_name + ' src=' + result.logo + '><div class="text"><p class="display-name">' + result.display_name + status + '</div></a>';

            $(".results").append(userDiv);
          }
        });
      });
    });
  }

  //user search
  var numKeyUp = 0,
    searchValue,
    searchFor = [],
    regex;
  $("#user-search").keyup(function(event) {
    searchValue = $("#user-search").val();
    if (searchValue.length === 0) {
      $(".results").empty();
      displayAllUsers(userNames);
    }
    if (searchValue.length > 1 && searchValue.length % 2 === 0) {
      searchFor = userNames.filter(function(name) {
        regex = new RegExp(searchValue.toLowerCase());
        return regex.test(name.toLowerCase());
      })
      $(".results").empty();
      displayAllUsers(searchFor);
    }
  });

  //Click Handlers
  $(".all-users").on("click", function() {
    $(".results").empty();
    displayAllUsers(userNames);
  })

  $(".online-users").on("click", function() {
    $(".results").empty();
    displayOnlineUsers();
  })

  $(".offline-users").on("click", function() {
    $(".results").empty();
    displayOfflineUsers();
  })

  //initial display
  displayAllUsers(userNames);
});