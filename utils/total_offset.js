const timezoneData = require("../data/timezone.json");

//finding total offset - how far any timezone from UTC
const totalOffset = (CT, CTT) => {
  const total_offset = timezoneData[CTT].offset - timezoneData[CT].offset;
  return total_offset;
};

module.exports = totalOffset;
