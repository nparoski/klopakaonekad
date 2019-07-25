<?php
  $input = file_get_contents('php://input');
  $data = json_decode($input);
  $header = "From: " . $data->name . ", E-mail: " . $data->email;
  $msg = "Ime: ".$data->name."\n"."Email: ". $data->email ."\n\n"."Poruka: \n\n".$data->msg;
  mail("info@koddzona.rs","Poruka sa veb stranice",$msg,$header,$data->email);