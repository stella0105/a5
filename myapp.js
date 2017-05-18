
var skycons = new Skycons();


$('#dropdown li').on('click', function(){
    window.location.reload();

});

if(location.hash != "66666"){
  $("#dropdown li").each(function(){
    var iii = $(this).text().substr(4,20);
    var jjj = $(this).text().substr(0,3);
    $.getWeatherJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+$(this).text().substr(4,20)+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",function(data){
      var NTemperature = data.query.results.channel.item.condition.temp;
      document.getElementById(iii).text = jjj+" "+formatFloat((parseFloat(NTemperature)+40)/1.8-40,1)+"℃";
    })
  });


  if(location.hash == ""){
    var lo = "Taipei City";
  }else{
    var lo = location.hash.substr(1,20);
  }
  $('#location').html(document.getElementById(lo).text.substr(0,3));
  $.getWeatherJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"+lo+"%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",function(data){
  	console.log (data) ;


  	var currentTemperature = data.query.results.channel.item.condition.temp;
    var currentDate = data.query.results.channel.item.forecast[0].date;
    var currentText = data.query.results.channel.item.condition.text;
    currentTemperature = (parseFloat(currentTemperature)+40)/1.8-40;
    $('#Ntem').html(formatFloat(currentTemperature,1));
    $('#Ntext').html(currentText);
    $('#Ndate').html(currentDate);
    skycons.add("today", icon(currentText));


    //明天
    var currentDate1 = data.query.results.channel.item.forecast[1].date;
    var currentText1 = data.query.results.channel.item.forecast[1].text;
    var currentH1 = data.query.results.channel.item.forecast[1].high;
    var currentL1 = data.query.results.channel.item.forecast[1].low;
    currentH1 = (parseFloat(currentH1)+40)/1.8-40;
    currentL1 = (parseFloat(currentL1)+40)/1.8-40;
    $('#Date1').html(currentDate1);
    $('#tem1').html(formatFloat(currentL1,0)+"-"+formatFloat(currentH1,0)+" ℃");
    skycons.add("day1", icon(currentText1));


    //後天
    var currentDate2 = data.query.results.channel.item.forecast[2].date;
    var currentText2 = data.query.results.channel.item.forecast[2].text;
    var currentH2 = data.query.results.channel.item.forecast[2].high;
    var currentL2 = data.query.results.channel.item.forecast[2].low;
    currentH2 = (parseFloat(currentH2)+40)/1.8-40;
    currentL2 = (parseFloat(currentL2)+40)/1.8-40;
    $('#Date2').html(currentDate2);
    $('#tem2').html(formatFloat(currentL2,0)+"-"+formatFloat(currentH2,0)+" ℃");
    skycons.add("day2", icon(currentText2));


    //大後天
    var currentDate3 = data.query.results.channel.item.forecast[3].date;
    var currentText3 = data.query.results.channel.item.forecast[3].text;
    var currentH3 = data.query.results.channel.item.forecast[3].high;
    var currentL3 = data.query.results.channel.item.forecast[3].low;
    currentH3 = (parseFloat(currentH3)+40)/1.8-40;
    currentL3 = (parseFloat(currentL3)+40)/1.8-40;
    $('#Date3').html(currentDate3);
    $('#tem3').html(formatFloat(currentL3,0)+"-"+formatFloat(currentH3,0)+" ℃");
    skycons.add("day3", icon(currentText3));

    skycons.play();
  })
}

function formatFloat(num, pos)
{
  var size = Math.pow(10, pos);
  return Math.round(num * size) / size;
}

function icon(weather)
{
  var a;
  switch(weather){
    case "Freezing Drizzle":
     a=Skycons.SLEET;
     break;
    case "Drizzle":
     a=Skycons.RAIN;
     break;
    case "Freezing Rain":
     a=Skycons.SLEET;
     break;
    case "Rain":
     a=Skycons.RAIN;
     break;
    case "Light Rain":
     a=Skycons.RAIN;
     break;
    case "Showers":
     a=Skycons.RAIN;
     break;
    case "Blustery":
     a=Skycons.WIND;
     break;
    case "Windy":
     a=Skycons.WIND;
     break;
    case "Breezy":
     a=Skycons.WIND;
     break;
    case "Cold":
     a=Skycons.WIND;
     break;
    case "Cloudy":
     a=Skycons.CLOUDY;
     break;
    case "Mostly Cloudy":
     a=Skycons.CLOUDY;
     break;
    case "Partly Cloudy":
     a=Skycons.PARTLY_CLOUDY_DAY;
     break;
    case "Clear":
     a=Skycons.PARTLY_CLOUDY_NIGHT;
     break;
    case "Mostly Sunny":
     a=Skycons.CLEAR_DAY;
     break;
    case "Sunny":
     a=Skycons.CLEAR_DAY;
     break;
    case "Thunderstorms":
     a=Skycons.RAIN;
     break;
    case "Fair":
     a=Skycons.CLEAR_NIGHT;
     break;
    case "Hot":
     a=Skycons.CLEAR_DAY;
     break;
    case "Isolated Thunderstorms":
     a=Skycons.RAIN;
     break;
    case "Scattered Thunderstorms":
     a=Skycons.RAIN;
     break;
    case "Scattered Showers":
     a=Skycons.RAIN;
     break;
    case "Thundershowers":
     a=Skycons.RAIN;
     break;
    case "Isolated Thundershowers":
     a=Skycons.RAIN;
     break;
    case "Haze":
     a=Skycons.FOG;
     break;
    case "Fog":
     a=Skycons.FOG;
     break;
    case "not available":
     break;
    }
    return a;
}
