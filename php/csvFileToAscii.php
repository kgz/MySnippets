<?php

function asciiTable(Array $rows, Int $padSize = 1, String $justify = "right", String $separator = "|", String $border = "-"): String {
    if ($justify === "center") {
        $justify = STR_PAD_BOTH;
    } elseif ($justify === "left") {
        $justify = STR_PAD_LEFT;
    } else {
        $justify = STR_PAD_RIGHT;
    }
    $body = "";
    $headers = reset($rows); // copy the header columns
    $sheet = $rows;
    $sizes = array_map(function($row) { return array_map(function($col) { return strlen($col); }, $row); }, $sheet);
    foreach ($headers as $column => $data) {
        $colSize[$column] = max(array_column($sizes, $column));
    }
    foreach($sheet as $row => $columns) {
        $last = count($columns) - 1;
        $line = "";
        foreach ($columns as $n => $column) {
            $line .= $separator .
                     str_pad(
                     str_repeat(" ", $padSize) .
                         $column . str_repeat(" ", $padSize),
                         $colSize[$n] + ($padSize * 2),
                         " ",
                         $justify
                     ) .
                     ($n === $last ? $separator : "");
        }
        $body .= "$line\n";
        if (!$row) {
            $line = "";
            foreach ($columns as $n => $column) {
                $column = str_repeat($border, $colSize[$n] + ($padSize * 2));
                $line .= $separator . str_pad($column, $colSize[$n] + ($padSize * 2)) . ($n === $last ? $separator : "");
            }
            $body .= "$line\n";
        }
    }
    
    return "<pre>$body</pre>";
}

if (($handle = fopen($r_tmp_f, "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $rows[] = $data;
    }
    fclose($handle);
}





/****************************************************************************************/

function asciiTable(array $rows, Int $padSize = 1, String $justify = "right", String $separator = "|", String $border = "-"): String
{
	if ($justify === "center") {
		$justify = STR_PAD_BOTH;
	} elseif ($justify === "left") {
		$justify = STR_PAD_LEFT;
	} else {
		$justify = STR_PAD_RIGHT;
	}
	$body = "";
	$headers = reset($rows); // copy the header columns
	$sheet = $rows;
	$sizes = array_map(function ($row) {
		return array_map(function ($col) {
			return strlen($col);
		}, $row);
	}, $sheet);
	foreach ($headers as $column => $data) {
		$colSize[$column] = max(array_column($sizes, $column));
	}
	foreach ($sheet as $row => $columns) {
		$last = count($columns) - 1;
		$line = "";
		foreach ($columns as $n => $column) {
			$line .= $separator .
				str_pad(
					str_repeat(" ", $padSize) .
						$column . str_repeat(" ", $padSize),
					$colSize[$n] + ($padSize * 2),
					" ",
					$justify
				) .
				($n === $last ? $separator : "");
		}
		$body .= "$line\n";
		if (!$row) {
			$line = "";
			foreach ($columns as $n => $column) {
				$column = str_repeat($border, $colSize[$n] + ($padSize * 2));
				$line .= $separator . str_pad($column, $colSize[$n] + ($padSize * 2)) . ($n === $last ? $separator : "");
			}
			$body .= "$line\n";
		}
	}

	return "<pre>$body</pre>";
}


if (\App\User\User::id() == 1 && $_SERVER['HTTP_ASCIITABLE'] == 1) {
	if (($handle = fopen($r_tmp_f, "r")) !== FALSE) {
		while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
			$rows[] = $data;
		}
		fclose($handle);
	}
	echo asciiTable($rows);
	exit;
}
