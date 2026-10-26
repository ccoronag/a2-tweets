function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	//TODO: Filter to just the written tweets

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	var searchable_tweets = [];
	for (var i = 0; i < tweet_array.length; i++) {
		var current_tweet = tweet_array[i];
		if (!current_tweet.written) {
			continue;
		}
		searchable_tweets.push(current_tweet);
	};

	// console.log(searchable_tweets);
	var search_bar = document.getElementById("textFilter");
	var search_results = [];
	var search_text;
	var table = document.getElementById("tweetTable");
	search_bar.addEventListener('input', function() {
		table.innerHTML = "";
		search_results = [];
		search_text = search_bar.value.trim();
		if (search_text === "") {
			document.getElementById("searchCount").innerHTML = search_results.length;
			document.getElementById("searchText").innerHTML = search_text;
			table.innerHTML = "";
			return;
		}
		console.log(search_text);
		for (var i = 0; i < searchable_tweets.length; i++) {
			var current_search = searchable_tweets[i];
			// console.log(current_tweet.writtenText)
			if (current_search.writtenText.includes(search_text)) {
				search_results.push(current_search);
			}
		}
		document.getElementById("searchCount").innerHTML = search_results.length;
		document.getElementById("searchText").innerHTML = search_text;
		// console.log(search_results);
		
		// console.log(search_results);
		var rows = '';
		for (var j = 0; j < search_results.length; j++) {
			rows += search_results[j].getHTMLTableRow(j + 1);
		}
		table.innerHTML += rows;
	});

	// console.log(search_results);

	
}

function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
	// var search_bar = document.getElementById("textFilter");
	// var search_results = [];
	// search_bar.addEventListener('keypress', function() {
	// 	var search_text = search_bar.value.trim();
	// 	if (search_text === "") {
	// 		search_results = [];
	// 		return;
	// 	}
		
	// 	for (var i = 0; i < searchable_tweets.length; i++) {
	// 		current_tweet = searchable_tweets[i];
	// 		if (current_tweet.text.includes(search_text)) {
	// 			search_results.push();
	// 		}
	// 	}
	// });
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});