<?php
header('Content-Type: application/json');
ini_set('display_errors', 0);

error_reporting(E_ERROR | E_WARNING | E_PARSE); 

  include 'remove_accents.php';

include '100000_random_words.php';
$search = strtolower($_GET['search'] ?? '');

if (empty($search)) {
    echo json_encode([]);
    exit;
}


$searchWords = explode(' ', $search);

$results = array_filter($words, function ($item) use ($searchWords) {
    
    $itemNormalized = strtolower(remove_accents($item));
    
    
    foreach ($searchWords as $word) {
        $wordNormalized = remove_accents($word);
        if (strpos($itemNormalized, $wordNormalized) === false) {
            return false;
        }
    }
    return true;
});

echo json_encode(array_values($results));

?>
