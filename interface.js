$(function () {
    $(function () {
      $("#event-name").focus();
    });
  
    function DateError(input) {
      $("#" + input).addClass("error");
      $("#" + input).focus(function () {
        $("#" + input).datepicker("show");
      });
      $("#" + input).focus();
      $("#" + input).val("");
      return true;
    }
    $("#event-start-date").on("StartdateError", function (e) {
        console.log(e);
      });
      $("#event-end-date").on("Enddaterror", function (e) {
        console.log(e);
      });
    $("#event-start-date").datetimepicker();
    $("#event-end-date").datetimepicker();
    $("#all-day-event-date").datetimepicker({
      timepicker: false,
      onChangeDateTime: function (dp, $input) {
        var datetime = $input.val();
        var date = datetime.split(" ")[0];
        $input.val(date);
      },
    });
    $("#recurrent-event-end-date").datetimepicker();

  
    $("#event-name").on("change", function (e) {
      if ($("#event-name").val()) {
        $("#event-location").focus();
      }
    });
    $("#event-location").on("change", function (e) {
      if ($("#event-location").val()) {
        $("#all-day-event-checkbox").focus();
      }
    });
  
    
    $("#all-day-event-checkbox").change(function () {
      if (this.checked) {
        showAllDayEventOptions();
      } else {
        hideAllDayEventOptions();
      }
    });
  
    $("#all-day-event-date").on("change", function (e) {
      if (Date.parse($("#all-day-event-date").val())) {
        $("#recurrent-event-type-selector").focus();
      } else {
        DateError("all-day-event-date");
      }
    });
  
    $("#event-start-date").on("change", function (e) {
      if (Date.parse($("#event-start-date").val())) {
        $("#event-end-date").focus(function () {
          $("#event-end-date").datepicker("show");
        });
        $("#event-end-date").focus();
      } else {
        DateError("event-start-date");
        var event = new CustomEvent("StartdateError", {
            detail: {
              hazcheeseburger: true,
            },
          });
          $("#event-start-date").trigger("log", ["StartdateError"]);
      }
    });
  
    $("#event-end-date").on("change", function (e) {
      if (Date.parse($("#event-end-date").val())) {
        $("#recurrent-event-type-selector").focus();
      } else {
        DateError("event-end-date");
        var event = new CustomEvent("Enddaterror", {
            detail: {
              hazcheeseburger: true,
            },
          });
          $("#event-end-date").trigger("log", ["Enddaterror"]);
      }
    });
  
    $("#recurrent-event-type-selector").change(function (e) {
      var val = $("#recurrent-event-type-selector option:selected").val();
      hideRecurrentEventOptions();
      hideRecurrentEventDetails();
  
      if (val == "custom") {
        showRecurrentEventOptions();
      } else {
        resetAllRecurrentEventDetails();
      }
  
      if (val == "none") {
        hideRecurrentEventEndDetails();
      } else {
        showRecurrentEventEndDetails();
      }
    });
  
    $("#recurrent-event-type-selector").on("change", function (e) {
      if ($("#recurrent-event-type-selector").val() != "none") {
        $("#recurrent-event-end-date").focus(function () {
          $("#recurrent-event-end-date").datepicker("show");
        });
        $("#recurrent-event-end-date").focus();
      }
    });
  
    $("#recurrent-event-end-date").on("change", function (e) {
      if (Date.parse($("#recurrent-event-end-date").val())) {
        if ($("#recurrent-event-type-selector").val() == "custom") {
          $("#recurrent-event-time-selector").focus();
        } else {
          $("#create-event-button").focus();
        }
      } else {
        DateError("recurrent-event-end-date");
      }
    });
  
    $("#recurrent-event-time-selector").change(function (e) {
      var val = $("#recurrent-event-time-selector option:selected").val();
      hideRecurrentEventDetails();
  
      if (val == "daily") {
        $("#daily-recurrent-details").show();
      } else if (val == "weekly") {
        $("#weekly-recurrent-details").show();
      } else if (val == "monthly") {
        $("#monthly-recurrent-details").show();
      } else if (val == "yearly") {
        $("#yearly-recurrent-details").show();
      }
      $("#daily-recurrent-freq").focus();
    });
  
    $("#daily-recurrent-freq").change(function (e) {
      if (
        !$.isNumeric($("#daily-recurrent-freq").val()) ||
        $("#daily-recurrent-freq").val() < 1
      ) {
        $("#errormessage").css({ display: "block", color: "tomato" });
        $("#daily-recurrent-freq").focus();
      } else {
        $("#errormessage").css("display", "none");
        $("#create-event-button").focus();
      }
    });
  
    $("input[type=text]").focus(function () {
      $(this).select();
    });
  });
  
  // Functions to reset recurrent event interface
  function hideRecurrentEventDetails() {
    $("#daily-recurrent-details").hide();
    $("#weekly-recurrent-details").hide();
    $("#monthly-recurrent-details").hide();
    $("#yearly-recurrent-details").hide();
  }
  function hideRecurrentEventOptions() {
    $("#recurrent-event-details-line").hide();
    $("#recurrent-event-details").hide();
  }
  function showRecurrentEventOptions() {
    $("#recurrent-event-details-line").show();
    $("#recurrent-event-details").show();
    $("#daily-recurrent-details").show();
  }
  function resetAllRecurrentEventDetails() {
    $("#recurrent-event-time-selector").val("daily");
    $(".weekday-checkbox").prop("checked", false);
    $(".day-checkbox").prop("checked", false);
    $(".month-checkbox").prop("checked", false);
  }
  function showAllDayEventOptions() {
    $("#start-time-row").hide();
    $("#end-time-row").hide();
    $("#all-day-event-row").show();
    $("#event-start-date").val("");
    $("#event-end-date").val("");
    $("#all-day-event-date").focus(function () {
      $("#all-day-event-date").datepicker("show");
    });
    $("#all-day-event-date").focus();
  }
  function hideAllDayEventOptions() {
    $("#all-day-event-row").hide();
    $("#start-time-row").show();
    $("#end-time-row").show();
    $("#all-day-event-date").val("");
    $("#event-start-date").focus(function () {
      $("#event-start-date").datepicker("show");
    });
    $("#event-start-date").focus();
  }
  function showRecurrentEventEndDetails() {
    $("#recurrent-event-end-date-row").show();
  }
  function hideRecurrentEventEndDetails() {
    $("#recurrent-event-end-date-row").hide();
    $("#recurrent-event-end-date").val("");
    if ($("#recurrent-event-end-date").hasClass("error")) {
      $("#recurrent-event-end-date").removeClass("error");
    }
  }
  
  // hacky way to get the button to accommodate size of hidden divs in Safari
  function hideAndShowCreateEventButtom() {
    $("#create-event-button").hide();
    $("#create-event-button").show();
  }
  