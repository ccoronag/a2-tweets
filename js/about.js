function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	const options = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "UTC"
	};
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	
	earliest_tweet = tweet_array.reduce((lowest, current) => {
		return current.time < lowest.time ? current : lowest;
	});
	latest_tweet = tweet_array.reduce((highest, current) => {
		return current.time > highest.time ? current : highest;
	});
	document.getElementById('firstDate').innerHTML = earliest_tweet.time.toLocaleDateString(undefined, options);
	document.getElementById('lastDate').innerHTML = latest_tweet.time.toLocaleDateString(undefined, options);

	
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});