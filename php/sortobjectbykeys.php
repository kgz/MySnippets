<?php 

$array_orderby = function()
{
    $args = func_get_args();
    $data = array_shift($args);
    foreach ($args as $n => $field) {
        if (is_string($field)) {
            $tmp = array();
            foreach ($data as $key => $row)
                $tmp[$key] = $row[$field];
            $args[$n] = $tmp;
            }
    }
    $args[] = &$data;
    call_user_func_array('array_multisort', $args);
    return array_pop($args);
};

//sort by name then form type then collabertion date then Positive Feedback Date
$allTableEntries = $array_orderby($allTableEntries, 'Key 1', SORT_ASC, 'Key 2', SORT_ASC, "Key 3", SORT_ASC, "Key 4", SORT_ASC);
