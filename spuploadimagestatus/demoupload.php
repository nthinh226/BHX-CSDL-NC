<?php
$filename = md5(mt_rand());
$extension=str_replace('video/', '.', $_FILES['video']['type']);
$status = (boolean) move_uploaded_file($_FILES['video']['tmp_name'], '../../file/'.$filename.$extension);

$response = (object) [
  'status' => $status
];

if ($status) {
  $response->url = 'https://ttoworld.com/file/'.$filename.$extension;
}

echo json_encode($response);
