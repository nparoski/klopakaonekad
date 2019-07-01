<?php
  if(isset($_POST['submit'])){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = "Mejl sa sajta";
    $msg = $_POST['message'];
    $header = "From: ".$name.", Adress: ".$email;

    mail("info@koddzona.rs",$subject,$msg,$header);
    header("location: ../index.html?mailsent");
  }