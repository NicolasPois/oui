import {buildLogin, buildLogout} from "./login1.js";

const URL_IS_CONNECTED = "./php/is_connected.php";

$(() => {
  $.ajax({
    url: URL_IS_CONNECTED,
    method: "get",
    dataType: "json"
  }).done(function (data) {
    if (data.hasOwnProperty("result")) {
      if (data.result) {
        let $loginLogout = $("#login-logout");
        $loginLogout.empty();
        if (data.hasOwnProperty("is_connected")) {
          if (data.is_connected) {
            /* connected -> logout form */
            $loginLogout.append(buildLogout());
            if (data.hasOwnProperty("message")) {
              if (data.message) {
                $("#message .modal-body").html(data.message);
                $("#message").modal("show");
              }
            }
          } else {
            /* not connected -> login form */
            $loginLogout.append(buildLogin());
            $loginLogout.append("test 2");
          }
          $loginLogout.fadeIn(1000);
        }
      } else {
        /* displayErrorMessage(data); */
      }
    } else {
    }
  })
    .fail(function () {
    });
});

