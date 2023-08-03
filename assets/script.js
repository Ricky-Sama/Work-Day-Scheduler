// Function to display current date 
$(function () {
  displayCurrentDate();
});

function displayCurrentDate() {
  const currentDayElement = $('#currentDay');
  const currentDate = dayjs().format('dddd: MMMM D, YYYY');
  currentDayElement.text(`${currentDate}`);
}

// Colors of rows (based on time)
$(function () {
  setRowColorBasedOnTime();
});

function setRowColorBasedOnTime() {
  const currentHour = new Date().getHours();

  $('.time-block').each(function () {
      const rowHour = parseInt($(this).attr('id').split('-')[1]);

      if (rowHour < currentHour) {
          $(this).addClass('past').removeClass('present future');
      } else if (rowHour === currentHour) {
          $(this).addClass('present').removeClass('past future');
      } else {
          $(this).addClass('future').removeClass('past present');
      }
  });
}

// Function to save event description to local storage
function saveEventToLocalStorage(eventId, eventDescription) {
  localStorage.setItem(eventId, eventDescription);
}

// Function to load events from local storage (called when the page loads)
function loadEventsFromLocalStorage() {
  $('.time-block').each(function () {
      const eventId = $(this).attr('id');
      const eventDescription = localStorage.getItem(eventId);
      if (eventDescription) {
          $(this).find('textarea').val(eventDescription);
      }
  });
}

// Save Function
  $('.saveBtn').on('click', function () {
      const eventRow = $(this).closest('.time-block');
      const eventId = eventRow.attr('id');
      const eventDescription = eventRow.find('textarea').val();
      saveEventToLocalStorage(eventId, eventDescription);
  });
