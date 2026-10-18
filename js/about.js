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
	var lowest = new Tweet("", "Fri Jan 1 06:58:57 +0000 2500");
	var highest = new Tweet("", "Fri Jan 1 06:58:57 +0000 1999");
	var completed_events_ct = 0;
	for (i = 0; i < tweet_array.length; i++) {
		var current = tweet_array[i];
		lowest = current.time < lowest.time ? current : lowest;
		highest = current.time > highest.time ? current : highest;

		// console.log(current.source);
		if (current.source === "completed_event") {
			completed_events_ct++;
		}
	}
	document.getElementById('firstDate').innerHTML = lowest.time.toLocaleDateString(undefined, options);
	document.getElementById('lastDate').innerHTML = highest.time.toLocaleDateString(undefined, options);

	document.getElementsByClassName('completedEvents')[0].innerHTML = completed_events_ct;
	document.getElementsByClassName('completedEventsPct')[0].innerHTML = math.format(completed_events_ct/tweet_array.length, {notation: 'fixed', precision: 2}) * 100 + "%";

}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});