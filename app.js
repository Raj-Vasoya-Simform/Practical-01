const inquirer = require("inquirer");
const totalOffset = require("./utils/total_offset");
const NewTimezone = require("./utils/NewTimezone");
const validateTime = require("./utils/validate");



let CURRENT_TIME, CURRENT_TIMEZONE, CONVERT_TO_TIMEZONE;

//taking input from user (Current Timezone, Convert To Timezone, Time)
inquirer
  .prompt([
    {
      type: "input",
      name: "currentTimezone",
      message: "CURRENT_TIMEZONE : ",
    },
    {
      type: "input",
      name: "convertToTimezone",
      message: "CONVERT_TO : ",
    },
    {
      type: "input",
      name: "currentTime",
      message: `Enter time in format of 'Hour:Minutes AM/PM' :`,
      default() {
        const date = new Date();
        return date
          .toLocaleString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          })
          .toString();
      },
    },
  ])
  .then((answers) => {
    CURRENT_TIMEZONE = answers.currentTimezone.split(" ")[0];
    CONVERT_TO_TIMEZONE = answers.convertToTimezone.split(" ")[0];
    CURRENT_TIME = answers.currentTime;

    if (!validateTime(CURRENT_TIME)) {
      throw new Error(
        `Please enter correct time in format of 'Hour:Minutes AM/PM'`
      );
    }

    const total_offset = totalOffset(CURRENT_TIMEZONE, CONVERT_TO_TIMEZONE);
    const converted_time = NewTimezone(CURRENT_TIME, total_offset);

    //displaying output
    console.log(
      `CURRENT_TIMEZONE_TIME (${CURRENT_TIMEZONE}) : ${CURRENT_TIME}`
    );
    console.log(
      `CONVERTED_TIMEZONE_TIME (${CONVERT_TO_TIMEZONE}) : ${converted_time}`
    );
  })
  .catch((error) => {
    console.error(error.message);
    process.exit();
  });
