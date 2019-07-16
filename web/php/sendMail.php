<?php
  $input = file_get_contents('php://input');
  $data = json_decode($input);
  $header = "From: " . $data->name . ", E-mail: " . $data->email;
  mail("info@koddzona.rs","Poruka sa veb stranice",$data->msg,$header);