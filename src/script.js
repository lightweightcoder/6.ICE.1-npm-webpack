import moment from 'moment';
import copy from 'copy-to-clipboard';
import momentTimeZone from 'moment-timezone';

const getAllTimeZones = (currentTime) => {
  const timeZoneNames = moment.tz.names();
  const dates = [];

  timeZoneNames.forEach((timeZoneName) => {
    // format the current time to that timezone
    const DateAndTimeString = momentTimeZone(currentTime).tz(timeZoneName).format();

    const DateAndTimeStringArray = DateAndTimeString.split('+');
    console.log(DateAndTimeStringArray);
    const timeDifferenceString = DateAndTimeStringArray[1];
    if (timeDifferenceString) {
      const hrsDifferenceString = timeDifferenceString.substring(0, 2);
      console.log(hrsDifferenceString); // 01
      dates.push(hrsDifferenceString);
    }

    console.log(timeDifferenceString); // 03:00

    // output
    const countryAndDateEl = document.createElement('p');
    countryAndDateEl.innerHTML = `${timeZoneName} : ${DateAndTimeString}`;
    document.body.appendChild(countryAndDateEl);
  });
};

const createDateInput = () => {
  // make a container
  const div = document.createElement('div');

  // display element
  const h2 = document.createElement('h2');

  // copy-to-clipboard button
  const copyBtn = document.createElement('button');
  copyBtn.innerHTML = 'copy to clpboard';

  // input
  const input = document.createElement('input');

  // set the input attribute type to date
  input.setAttribute('type', 'date');

  // on change, display in the span
  input.addEventListener('change', () => {
    // use moment to display formatted date
    const unformattedDate = input.value;

    const formattedDate = moment(unformattedDate).format('MMMM Do, YYYY');

    h2.innerText = formattedDate;

    // append the copy to clipboard btn
    div.appendChild(copyBtn);

    copyBtn.addEventListener('click', () => {
      const formattedDateToCopy = moment(unformattedDate).format('D/M/YY');
      copy(formattedDateToCopy);
    });

    // display all timezones and timezone names
    getAllTimeZones();
  });

  div.appendChild(input);
  div.appendChild(h2);

  return div;
};

document.body.appendChild(createDateInput());
