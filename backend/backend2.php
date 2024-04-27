<?php
header('Content-Type: application/json');
ini_set('display_errors', 0);

error_reporting(E_ERROR | E_WARNING | E_PARSE); 
include 'remove_accents.php';

include 'websites.php';
$search = strtolower($_GET['search'] ?? '');

if (empty($search)) {
    echo json_encode([]);
    exit;
}

$results = array_filter($websites, function ($page) use ($search) {
	    
        if (strpos(strtolower(remove_accents($page)), remove_accents($search)) !== false) {
        	
            return true;
        
        
    }
    
    return false;
});

echo json_encode(array_values($results));
?>
