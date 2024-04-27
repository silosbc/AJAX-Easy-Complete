<?php
header('Content-Type: application/json');
ini_set('display_errors', 0);

error_reporting(E_ERROR | E_WARNING | E_PARSE); 

 include 'remove_accents.php';

include '20000_random_words.php';
$search = strtolower($_GET['search'] ?? '');

if (empty($search)) {
    echo json_encode([]);
    exit;
}

$results = array_filter($words, function ($word) use ($search) {
	    
        if (strpos(strtolower(remove_accents($word)), remove_accents($search)) !== false) {
        	
            return true;
        
        
    }
    
    return false;
});

echo json_encode(array_values($results));
?>
