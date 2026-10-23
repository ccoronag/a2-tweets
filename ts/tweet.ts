class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        var normalized_text = this.text.toLowerCase();

        if (normalized_text.includes("achieved") 
            || normalized_text.includes("pb")) {
            return 'achievement';
        }
        else if (normalized_text.startsWith("just completed") || normalized_text.startsWith("just posted")) {
            return 'completed_event';
        }
        else if (normalized_text.includes("live")) {
            return 'live_event';
        }
        return 'miscellaneous';
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        var normalized = this.text.toLowerCase();
        var link_beginning = normalized.indexOf("https");
        var removed_link = normalized.slice(0, link_beginning).trim();

        if (removed_link.endsWith("with @runkeeper. check it out!")) {
            return false;
        }
        return true;
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        var written_text_beginning = this.text.indexOf(" - ") + 3;
        var written_text_ending = this.text.indexOf("https");
        var written_text = this.text.slice(written_text_beginning, written_text_ending);
        return written_text;
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        let activities_list:Array<string> = new Array(" run ", 
            " walk ", " elliptical ", " bike ", " swim ", 
            " row ", " mysports freestyle ", " mtn bike ", " hike ", 
            " ski ", " chair ride ", " nordic walk ", " skate ", 
            " snowboard ", " circuit workout ");
        var normalized = this.text.toLowerCase();
        var normalized = normalized.replace("runkeeper", "");
        for (var i = 0; i < activities_list.length; i++) {
            if (normalized.includes(activities_list[i])) {
                return activities_list[i];
            }
        }
        return "unknown";
    }

    get distance():number {
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        var normalized = this.text.toLowerCase();
        var split_text = normalized.split(" ");
        for (var i = 0; i < split_text.length; i++) {
            if (split_text[i] === "km") {
                return parseFloat(split_text[i - 1]) / 1.609;
            }
            else if (split_text[i] === "mi") {
                return parseFloat(split_text[i - 1]);
            }
        }
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}