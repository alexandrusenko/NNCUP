<?php 
function Encrypt($S){
  $mask1 = array(0,0,0,0,0,0,0,0);
  $mask2 = array(0,0,0,0,0,0,0,0);
  $block = array(0,0,0,0,0,0,0,0);
  $i = 0;

  function cshr($v, $sh){
    if($sh < 0) {
       $sh = 256 + $sh;
    }
    for($c = 1; $c <= $sh; $c++){
    	$v = ($v >> 1) + 128 * ($v % 2);
    }
    return $v;
  }

  function rotateleft($qwe){
    $rb = array(0,0,0,0,0,0,0,0);
    for($c = 0; $c <= 7; $c++){
      for($d = 0; $d <= 7; $d++){
        $t = $qwe[7 - $d];
        $t = cshr($t, $c - 1);
        if($t % 2 == 1){$rb[$c]++;}
        $rb[$c] = cshr($rb[$c], 1);
      }
    }
    for($c = 0; $c <= 7; $c++){$qwe[$c] = $rb[$c];}
    return $qwe;
  }
   
  function rotateright($qwe){
    $rb= array(0,0,0,0,0,0,0,0);
    for($c = 0; $c <= 7; $c++){
      for($d = 0; $d <= 7; $d++){
        $t = $qwe[$d];
        $t = cshr($t, 7 - $c);
        if($t % 2 == 1){$rb[$c]++;}
        $rb[$c] = cshr($rb[$c], 1);
      }
    }
    for($c = 0; $c <= 7; $c++){$qwe[$c] = $rb[$c];}
    return $qwe; 
  }

  $mask1[0]=0;   $mask1[1]=191; $mask1[2]=54;  $mask1[3]=16;
  $mask1[4]=144; $mask1[5]=33;  $mask1[6]=176; $mask1[7]=240;
  $mask2[0]=128; $mask2[1]=215; $mask2[2]=36;  $mask2[3]=207;
  $mask2[4]=3;   $mask2[5]=103; $mask2[6]=12;  $mask2[7]=134;
  for($i = 0; $i <= (strlen($S) - 1); $i++){
    $block[$i % 8] = ord($S[$i]);
  }
  $block[0] = cshr($block[0], 6);
  $block[1] = cshr($block[1], 3);
  $block[2] = cshr($block[2], 7);
  $block[3] = cshr($block[3], 5);
  $block[4] = cshr($block[4], 1);
  $block[5] = cshr($block[5], 4);
  $block[6] = cshr($block[6], 2);
  $block[7] = cshr($block[7], 5);
  $block[0] = $block[0] ^ $mask1[0];
  $block[1] = $block[1] ^ $mask1[1];
  $block[2] = $block[2] ^ $mask1[2];
  $block[3] = $block[3] ^ $mask1[3];
  $block[4] = $block[4] ^ $mask1[4];
  $block[5] = $block[5] ^ $mask1[5];
  $block[6] = $block[6] ^ $mask1[6];
  $block[7] = $block[7] ^ $mask1[7];
  $block = rotateleft($block);
  $block[0] = cshr($block[0], 2);
  $block[1] = cshr($block[1], 2);
  $block[2] = cshr($block[2], 0);
  $block[3] = cshr($block[3], 5);
  $block[4] = cshr($block[4], 7);
  $block[5] = cshr($block[5], 4);
  $block[6] = cshr($block[6], 2);
  $block[7] = cshr($block[7], 1);
  $block[0] = $block[0] ^ $mask2[0];
  $block[1] = $block[1] ^ $mask2[1];
  $block[2] = $block[2] ^ $mask2[2];
  $block[3] = $block[3] ^ $mask2[3];
  $block[4] = $block[4] ^ $mask2[4];
  $block[5] = $block[5] ^ $mask2[5];
  $block[6] = $block[6] ^ $mask2[6];
  $block[7] = $block[7] ^ $mask2[7];
  $block = rotateright($block);
  $block = rotateright($block);

  for($i = 0; $i <= 7; $i++){
    if($block[$i] < 32){ $block[$i] = 128 - 32 + $block[$i];}
    if($block[$i] >= 128){ $block[$i] = $block[$i] - 128 + 32;}
  }
  return chr($block[0]).chr($block[1]).chr($block[2]).chr($block[3]).chr($block[4]).chr($block[5]).chr($block[6]).chr($block[7]);
}

  echo "\n";
echo Encrypt("*ALEXPWDA");

?>