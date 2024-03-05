<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $name = $_POST["name"];
  $email = $_POST["email"];
  $phone = $_POST["phone"];
  $country = $_POST["country"];
  $q1 = $_POST["q1"];
  $q2 = $_POST["q2"];
  $q3 = $_POST["q3"];
  $q4 = $_POST["q4"];

  // Write an email to the user
  $userSubject = "Thank you for submitting the form";
  $userBody = "Hey, $name!\nThe First Step Is In The Bag! High-Fives All Around! Well done, the first step has been taken.\nI will contact you within 48 hours. I'm looking forward to it! Looking forward to having you a part of my team very soon!";
  $userHeaders = "From: minimalism-training@noreply.com\r\n";
  $userMailSent = mail($email, $userSubject, $userBody, $userHeaders);

  // Write an email to the admin
  $adminSubject = "A new form has been submitted";
  $adminBody = "Name: $name\n"
  . "Email: $email\n"
  . "Phone: $phone\n"
  . "Country: $country\n"
  . "How can I help you?: $q1\n"
  . "What is currently holding you back from reaching your goals?: $q2\n"
  . "What is your motivation to start now?: $q3\n"
  . "Are you ready to commit financially & time-wise through online coaching, workout plans, and accountability to reach your goals for a minimum of 3 months?: $q4\n";
  $adminHeaders = "From: minimalism-training@noreply.com\r\n";

  // Pass email content to HTML part
  echo "<div style='border: 1px solid black; padding: 10px; margin-bottom: 20px;'>";
  echo "<h2>User Email</h2>";
  echo "<p><strong>Subject:</strong> $userSubject</p>";
  echo "<p><strong>Body:</strong> $userBody</p>";
  echo "</div>";

  echo "<div style='border: 1px solid black; padding: 10px;'>";
  echo "<h2>Admin Email</h2>";
  echo "<p><strong>Subject:</strong> $adminSubject</p>";
  echo "<p><strong>Body:</strong> $adminBody</p>";
  echo "</div>";

  // Send email to admin
  $adminMmailSent = mail("j.chen7@students.uu.nl", $adminSubject, $adminBody, $adminHeaders);

  if ($userMailSent) {
    echo "Email sent successfully!";
  } else {
      echo "Email sending failed.";
  }  if ($adminMmailSent) {
    echo "Email sent successfully!";
  } else {
      echo "Email sending failed.";
  }
}
?>
