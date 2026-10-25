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
	var distances_map = new Map();
	var weekday_distance_total = 0;
	var weekday_ct = 0;
	var weekend_distance_total = 0;
	var weekend_ct = 0;
	
	for (var i = 0; i < tweet_array.length; i++) {
		var current_tweet = tweet_array[i];
		if (current_tweet.distance === 0) {
			continue;
		}
		
		if (current_tweet.isWeekend) {
			weekend_ct++;
			weekend_distance_total += current_tweet.distance;
		}
		else {
			weekday_ct++;
			weekday_distance_total += current_tweet.distance;
		}
		if (activities_map.has(current_tweet.activityType)) {
			activities_map.set(current_tweet.activityType, activities_map.get(current_tweet.activityType) + 1);
			distances_map.set(current_tweet.activityType, distances_map.get(current_tweet.activityType) + current_tweet.distance);
		}
		else {
			activities_map.set(current_tweet.activityType, 1);
			distances_map.set(current_tweet.activityType, current_tweet.distance);
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

	console.log(top_three_acts);
	console.log(distances_map);

	document.getElementById("numberActivities").innerHTML = activities_map.size;
	document.getElementById("firstMost").innerHTML = top_three_acts.get('first')[0];
	document.getElementById("secondMost").innerHTML = top_three_acts.get('second')[0];
	document.getElementById("thirdMost").innerHTML = top_three_acts.get('third')[0];

	var first_average_distance = distances_map.get(top_three_acts.get('first')[0]) / top_three_acts.get('first')[1];
	// first_average_distance = first_average_distance.toFixed(2);
	var second_average_distance = distances_map.get(top_three_acts.get('second')[0]) / top_three_acts.get('second')[1];
	// second_average_distance = second_average_distance.toFixed(2);
	var third_average_distance = distances_map.get(top_three_acts.get('third')[0]) / top_three_acts.get('third')[1];
	// third_average_distance = third_average_distance.toFixed(2);
	// console.log(first_average_distance);
	// console.log(second_average_distance);
	// console.log(third_average_distance);
	top_three_acts.get('first').push(first_average_distance);
	top_three_acts.get('second').push(second_average_distance);
	top_three_acts.get('third').push(third_average_distance);
	console.log(top_three_acts);
	var longest_distance = Math.max(top_three_acts.get('first')[2], top_three_acts.get('second')[2], top_three_acts.get('third')[2]);
	var longest_activity;
	if (longest_distance == top_three_acts.get('first')[2]) {
		longest_activity = top_three_acts.get('first')[0];
	}
	else if (longest_distance == top_three_acts.get('second')[2]) {
		longest_activity = top_three_acts.get('second')[0];
	}
	else if (longest_distance == top_three_acts.get('third')[2]) {
		longest_activity = top_three_acts.get('third')[0];
	}

	var shortest_distance = Math.min(top_three_acts.get('first')[2], top_three_acts.get('second')[2], top_three_acts.get('third')[2]);
	var shortest_activity;
	if (shortest_distance == top_three_acts.get('first')[2]) {
		shortest_activity = top_three_acts.get('first')[0];
	}
	else if (shortest_distance == top_three_acts.get('second')[2]) {
		shortest_activity = top_three_acts.get('second')[0];
	}
	else if (shortest_distance == top_three_acts.get('third')[2]) {
		shortest_activity = top_three_acts.get('third')[0];
	}

	document.getElementById("longestActivityType").innerHTML = longest_activity;
	document.getElementById("shortestActivityType").innerHTML = shortest_activity;

	var day_of_the_week_averages = new Map();
	day_of_the_week_averages.set('weekday', (weekday_distance_total/weekday_ct));
	day_of_the_week_averages.set('weekend', (weekend_distance_total/weekend_ct));
	console.log(day_of_the_week_averages);
	var weekday_or_weekend_longer = Math.max(day_of_the_week_averages.get('weekday'), day_of_the_week_averages.get('weekend'));
	if (weekday_or_weekend_longer == day_of_the_week_averages.get('weekday')) {
		document.getElementById("weekdayOrWeekendLonger").innerHTML = "weekdays";
	}
	else {
		document.getElementById("weekdayOrWeekendLonger").innerHTML = "weekends";
	}
	

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