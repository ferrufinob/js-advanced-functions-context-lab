/* Your Code Here */
function createEmployeeRecord(employee) {
  return {
    firstName: `${employee[0]}`,
    familyName: `${employee[1]}`,
    title: `${employee[2]}`,
    payPerHour: employee[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeArray) {
  return employeeArray.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateStamp.split(" ")[1]),
    date: dateStamp.split(" ")[0],
  });
  return this;
}

function createTimeOutEvent(dateStamp) {
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateStamp.split(" ")[1]),
    date: dateStamp.split(" ")[0],
  });
  return this;
}

function hoursWorkedOnDate(date) {
  // given a date time lapsed between timeIn and Timeout
  let timeIn = this.timeInEvents.find(function (event) {
    return event.date === date;
  });
  let timeOut = this.timeOutEvents.find(function (event) {
    return event.date === date;
  });
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
  return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}

function payrollExpense() {}

function findEmployeeByFirstName(scrArray, firstName) {
  return scrArray.find((src) => src.firstName === firstName);
}

function calculatePayroll(employeeArray) {
  /// create an array of all wages
  let wages = employeeArray.map((employee) => allWagesFor.call(employee));
  /// add all the ages and reduce to total sum
  return wages.reduce(function (total, el) {
    return el + total;
  });
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
  let eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  let payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
