/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 */
function findSearchTermInBooks(searchTerm, scannedTextObj) {
    var result = {
        "SearchTerm": searchTerm,
        "Results": []
    };

    scannedTextObj.forEach(book => {
        book.Content.forEach(line => {
            if (line.Text.includes(searchTerm)) {
                result.Results.push({
                    "ISBN": book.ISBN,
                    "Page": line.Page,
                    "Line": line.Line
                });
            }
        });
    });

    return result; 
}

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian's"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
];

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/** 
 * Unit Test: Positive Test - Should Return a Match
 */
function positiveTest() {
    const result = findSearchTermInBooks("Canadian", twentyLeaguesIn);
    if (result.Results.length > 0) {
        console.log("PASS: Positive Test (Expected Matches Found)");
    } else {
        console.log("FAIL: Positive Test (Expected Matches Not Found)");
    }
}

/** 
 * Unit Test: Negative Test - Should Not Return Any Matches
 */
function negativeTest() {
    const result = findSearchTermInBooks("nonexistentword", twentyLeaguesIn);
    if (result.Results.length === 0) {
        console.log("PASS: Negative Test (No Matches as Expected)");
    } else {
        console.log("FAIL: Negative Test (Unexpected Matches Found)");
    }
}

/** 
 * Unit Test: Case-Sensitive Test - Matching on Specific Case
 */
function caseSensitiveTest() {
    const matchCaseResult = findSearchTermInBooks("The", twentyLeaguesIn);
    const noMatchCaseResult = findSearchTermInBooks("the", twentyLeaguesIn);

    if (matchCaseResult.Results.length > 0 && noMatchCaseResult.Results.length === 0) {
        console.log("PASS: Case-Sensitive Test (Correct Case Matching)");
    } else {
        console.log("FAIL: Case-Sensitive Test (Incorrect Case Matching)");
    }
}

/*

// Running the tests
positiveTest();
negativeTest();
caseSensitiveTest();


Explanation:

Positive Test: This test checks if the function finds matches for a word that exists in the text ("Canadian"). It passes if the results array has one or more entries.

Negative Test: This test verifies the function's behavior when the search term is not in the text ("nonexistentword"). It passes if the results array is empty.

Case-Sensitive Test: This test checks if the function correctly distinguishes between different cases of the same word ("The" vs. "the"). It passes if "The" returns matches while "the" does not.

You can run these tests to validate the functionality of your findSearchTermInBooks function. Depending on your specific requirements, you might need to adjust the test data or the function's logic.

 */

