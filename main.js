// Function to update the greeting and time
function updateGreetingAndTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format
  const currentTime = `${formattedHours}:${formattedMinutes} ${ampm}`;

  // Display current time
  document.getElementById("time").innerText = currentTime;

  // Set the greeting based on the time of day
  let greeting;
  if (hours < 12) {
    greeting = "Good Morning, Achi!";
  } else if (hours >= 12 && hours < 17) {
    greeting = "Good Afternoon, Achi!";
  } else {
    greeting = "Good Evening, Achi!";
  }

  // Display the greeting
  document.getElementById("greeting").innerText = greeting;
}

// Call the function to set the initial time and greeting
updateGreetingAndTime();

// Update the time every minute
setInterval(updateGreetingAndTime, 60000);
