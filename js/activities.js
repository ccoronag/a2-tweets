function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	var activities_map = new Map();
	for (var i = 0; i < tweet_array.length; i++) {
		var current_tweet = tweet_array[i];
		if (activities_map.has(current_tweet.activityType)) {
			activities_map.set(current_tweet.activityType, activities_map.get(current_tweet.activityType) + 1);
		}
		else {
			activities_map.set(current_tweet.activityType, 1);
		}
		
	}
	let top_three_acts = new Map([
		['first', ["activity", 0]],
		['second', ["activity", 0]],
		['third', ["activity", 0]]
	]);
	for (const [key, value] of activities_map) {
		// console.log("current top three: " + top_three_acts);
		// console.log("current number being compared: " + value);
		if (value > top_three_acts.get("first")[1]) {
			top_three_acts.set('third', top_three_acts.get('second'));
			top_three_acts.set('second', top_three_acts.get('first'));
			top_three_acts.set('first', [key, value]);
		}
		else if (value > top_three_acts.get("second")[1]) {
			top_three_acts.set('third', top_three_acts.get('second'));
			top_three_acts.set('second', [key, value]);

		}
		else if (value > top_three_acts.get("third")[1]) {
			top_three_acts.set('third', [key, value]);
		}
	}

	document.getElementById("numberActivities").innerHTML = activities_map.size;
	document.getElementById("firstMost").innerHTML = top_three_acts.get('first')[0];
	document.getElementById("secondMost").innerHTML = top_three_acts.get('second')[0];
	document.getElementById("thirdMost").innerHTML = top_three_acts.get('third')[0];

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.

	// activity_vis_spec = {
	//   "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
	//   "description": "A graph of the number of Tweets containing each type of activity.",
	//   "data": {
	//     "values": tweet_array
	//   }
	//   //TODO: Add mark and encoding
	// };
	// vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});