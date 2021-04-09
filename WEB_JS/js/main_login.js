(function () {
  "use strict";
  const URL_IS_CONNECTED = "./php/is_connected.php";
  const URL_LOGIN = "./php/login.php";
  const URL_LOGOUT = "./php/logout.php";
  const URL_json = "https://gist.github.com/renandanton/8d99dab65bf9fb5b4465ded7ab73a7df.js";
  const CSS_form = {
    "display": "flex",
    "flex-direction": "column",
    "margin": "10%",
    "margin-top": "5%"
  }
  const CSS_title = {
    "font-size": "400%",
    "text-align": "center",
    "padding-bottom": "20%"
  }

  let buildLogin = () => {
    return $("<form />")
      .attr("action", URL_LOGIN)
      .attr("method", "post")
      .css(CSS_form)
      .append(
        $("<div />").append("Cocktails").css(CSS_title),
        $("<img>").attr("src","../img/cocktail.jpg").attr("alt","cocktail"),
        $("<input />")
          .attr("type", "text")
          .attr("name", "username"),
        $("<input />")
          .attr("type", "password")
          .attr("name", "password"),
        $("<button />")
          .append("Login")
          .attr("type", "submit")
      )

      .submit(function () {
        let $data = $(this).serialize();
        let $self = $(this);
        $self.hide();

        $.ajax({
          url: URL_LOGIN,
          method: $(this).attr("method"),
          data: $data,
          dataType: "json"
        }).done(function (data) {
          /* fill div#message */
          if (data.hasOwnProperty("result")) {
            if (data.result) {
              window.location.reload(true);
            } else {
              $self.fadeIn(2000);
              if (data.hasOwnProperty("message")) {
                if (data.message) {
                  $("#message")
                    .html(data.message)
                    .fadeIn();
                }
              }
            }
          }
        });
        return false;
      })
  };
  let buildLogout = () => {
    return $("<button />")
      .append("logout")
      .click(function () {
        $.ajax({
          url: URL_LOGOUT,
          method: "get",
          dataType: "json"
        })
          .done(() => window.location.reload(true))
          .error(function () {

          })
      });
  };
  $(() => {
    $.ajax({
      url: URL_IS_CONNECTED,
      method: "get",
      dataType: "json"
    })
      .done(function (data) {
        if (data.hasOwnProperty("result")) {
          if (data.result) {
            let $login_logout = $("#login_logout");
            $login_logout.empty();
            if (data.hasOwnProperty("is_connected")) {
              if (data.is_connected) {
                /* connected -> logout form */
                $login_logout.append(buildLogout());
              } else {
                /* not connected -> login form */
                $login_logout.append(buildLogin());
              }
              $login_logout.fadeIn(2000);
            }
          } else {
            /* displayErrorMessage(data); */
          }
        } else {

        }
      })
  });
})();
