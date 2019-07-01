<?php
  if(isset($_POST['submit'])){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = "Email from website.";
    $msg = $_POST['message'];
    $header = "From: ".$name.", Adress: ".$email;

    mail("paroskidev@gmail.com",$subject,$msg,$header);
  }