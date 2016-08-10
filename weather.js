class Utilities{

	static kelvinToFahren(temp){
		return Math.floor(temp*(9.0/5.0)-459.67);
	}

	static kelvinToCels(temp){
		return Math.floor(temp-273.15)
	}

	static domUpdater(respObj){
		let textArea = document.getElementById("text-area");
		textArea.innerHTML += "<h1>Weather in  " + respObj.name + "</h1>";
		textArea.innerHTML += "<h2>Conditions: " + respObj.weather[0].description + "</h2>";
		textArea.innerHTML += "<h2>Temp: " + Utilities.kelvinToFahren(respObj.main.temp) + "F " + Utilities.kelvinToCels(respObj.main.temp) + "C</h2>";
		if(respObj.weather[0].description === "hail")textArea.innerHTML+="<h1>Hail: It's gonna HAIL!!!!!!!!!!!</h1>";
		else textArea.innerHTML+="<h1>Hail: Looks like no!</h1>";
	}
}


class Weather{
	
	constructor(apiKey){
		this.apiKey = apiKey;
		this.long = 0.0;
		this.lat = 0.0;
		this.url = "";
		this.response = null;
	}

	toString(){
		let str = "";
		str += "apiKey: " + this.apiKey;
		str += "city: " + this.response.name;
		str += "weather-description: " + this.response.weather.description;
		return str;
	}

	apiCall(url){
		fetch(url).then(function(response){
		return response.json();
		})
		.then(function(respObj){
			Utilities.domUpdater(respObj);
		});
	}

	getHailByCoord(lon,lat){
		this.lon = lon;
		this.lat = lat;
		this.url = "http://api.openweathermap.org/data/2.5/weather?lat="+this.lat+"&lon="+this.lon+"&appid=" + this.apiKey;
		this.apiCall(this.url);
	}
}