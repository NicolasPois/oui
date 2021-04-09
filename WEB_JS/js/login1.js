const URL_LOGIN = "./php/login.php";
const URL_LOGOUT = "./php/logout.php";

const CSS_LOGIN = {
  "display": "flex",
  "flex-direction": "column"
};

let buildLogin = () => {
  return $("<form />")
    .css(CSS_LOGIN)
    .attr("action", URL_LOGIN)
    .attr("method", "post")
    .append(
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

export {buildLogin, buildLogout}
