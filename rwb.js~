//
// Global state
//
// map     - the map object
// usermark- marks the user's position on the map
// markers - list of markers on the current map (not including the user position)
// 
//

//
// First time run: request current location, with callback to Start
//
if (navigator.geolocation)  {
    navigator.geolocation.getCurrentPosition(Start);
}

var latitude;
var longitude;

function UpdateMapById(id, tag) {

    var target = document.getElementById(id);
    var data = target.innerHTML;

    var rows  = data.split("\n");
   
    for (i in rows) {
	var cols = rows[i].split("\t");
	var lat = cols[0];
	var long = cols[1];
        var image;
        if(id=="opinion_data"){
	var color = cols[2];
        if(color == -1)
         image="http://www.enzygo.com/images/map-marker-red.gif";
        else if(color==0)
          image="/~jdt367/rwb/images/white.png"; //"http://infiniteatlas.com/images/Map-Marker-Reg-white.png";
        else
         image="http://maps.google.com/mapfiles/ms/micons/blue-dot.png";
         }
         if(image)
         markers.push(new google.maps.Marker({ map:map,
						    position: new google.maps.LatLng(lat,long),
						    title: tag+"\n"+cols.join("\n"),icon:image}));
        else
	markers.push(new google.maps.Marker({ map:map,
						    position: new google.maps.LatLng(lat,long),
						    title: tag+"\n"+cols.join("\n")}));
	
    }
}

function ClearMarkers()
{
    // clear the markers
    while (markers.length>0) { 
	markers.pop().setMap(null);
    }
}


function UpdateMap()
{
    var color = document.getElementById("color");
    
    color.innerHTML="<b><blink>Updating Display...</blink></b>";
    color.style.backgroundColor='white';

    ClearMarkers();

    if(document.getElementById("comm").checked) UpdateMapById("committee_data","COMMITTEE");
    if(document.getElementById("cand").checked) UpdateMapById("candidate_data","CANDIDATE");
    if(document.getElementById("indi").checked) UpdateMapById("individual_data", "INDIVIDUAL");
    if(document.getElementById("opin").checked) UpdateMapById("opinion_data","OPINION");


    color.innerHTML="Ready";
    if(document.getElementById("comm").checked){
    var comm_color = $('#comm_color').val();
    var rep_total = $('#comm_rep_total').val();
    var dem_total = $('#comm_dem_total').val();
    color.style.backgroundColor=comm_color;
    color.innerHTML="<p style=\"font-family:arial;color:white;font-size:20px;\">Total Republician Contribution="+rep_total+"<br>Total Democratic Contribution="+dem_total+"</p>";
    }
    if(document.getElementById("indi").checked){
      var ind_color = $('#ind_color').val();
      var rep_total = $('#ind_rep_total').val();
      var dem_total = $('#ind_dem_total').val();
	color.style.backgroundColor=ind_color;
       color.innerHTML="<p style=\"font-family:arial;color:white;font-size:20px;\">Total Republician Contribution="+rep_total+"<br>Total Democratic Contribution="+dem_total+"</p>";
    }
    if(document.getElementById("opin").checked){
      var opin_color = $('#opinion_color').val();
      var avg = $('#opin_avg').val();
      var stddev = $('#opin_stddev').val();
	color.style.backgroundColor=opin_color;
        color.innerHTML="<p style=\"font-family:arial;color:black;font-size:20px;\">Average of Colors="+avg+"<br>Standard Deviation of Colors="+stddev+"</p>";
    }
    
    
   // if (Math.random()>0.5) { 
	//color.style.backgroundColor='blue';
   // } else {
	//color.style.backgroundColor='red';
    //}

}

function NewData(data)
{
  var target = document.getElementById("data");
  
  target.innerHTML = data;

  UpdateMap();

}

function ViewShift()
{
    var bounds = map.getBounds();

    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();

    var color = document.getElementById("color");

    color.innerHTML="<b><blink>Querying...("+ne.lat()+","+ne.lng()+") to ("+sw.lat()+","+sw.lng()+")</blink></b>";
    color.style.backgroundColor='white';
    var seldata = "";
    var cm = document.getElementById("comm");
    var cd = document.getElementById("cand");
    var ind = document.getElementById("indi");
    var op = document.getElementById("opin");
    if(cm.checked) {seldata +=cm.value+",";}
    if(cd.checked) {seldata +=cd.value+",";}
    if(ind.checked) {seldata +=ind.value+",";}
    if(op.checked) {seldata +=op.value+",";}
     if(seldata=="") {seldata="committees";cm.checked=true;}
    else{
    var len = seldata.length -1;
    seldata = seldata.substring(0,len);
    }
    var cycle = document.getElementById("cycle");
    var c="";
    for (var i=0; i<cycle.length; i++){
     if(cycle.options[i].selected)
     c += cycle.options[i].text + ",";
    }
    var l = c.length-1;
    c = c.substring(0,l);

    // debug status flows through by cookie
    $.get("rwb.pl?act=near&latne="+ne.lat()+"&longne="+ne.lng()+"&latsw="+sw.lat()+"&longsw="+sw.lng()+"&format=raw&what="+seldata+"&cycle="+c, NewData);
}


function Reposition(pos)
{
    var lat=pos.coords.latitude;
    var long=pos.coords.longitude;

    map.setCenter(new google.maps.LatLng(lat,long));
    usermark.setPosition(new google.maps.LatLng(lat,long));
}


function Start(location) 
{
  var lat = location.coords.latitude;
  var long = location.coords.longitude;
  var acc = location.coords.accuracy;
  latitude = lat;
  longitude = long;
  
  var mapc = $( "#map");

  map = new google.maps.Map(mapc[0], 
			    { zoom:16, 
				center:new google.maps.LatLng(lat,long),
				mapTypeId: google.maps.MapTypeId.HYBRID
				} );

  usermark = new google.maps.Marker({ map:map,
					    position: new google.maps.LatLng(lat,long),
					    title: "You are here"});

  markers = new Array;

  var color = document.getElementById("color");
  color.style.backgroundColor='white';
  color.innerHTML="<b><blink>Waiting for first position</blink></b>";

  google.maps.event.addListener(map,"bounds_changed",ViewShift);
  google.maps.event.addListener(map,"center_changed",ViewShift);
  google.maps.event.addListener(map,"zoom_changed",ViewShift);

  navigator.geolocation.watchPosition(Reposition);

}

function getUserLocation(){
console.log(latitude+" "+longitude);
document.GiveOpinion["lat"].value=latitude;
console.log(document.GiveOpinion["lat"].value);
document.GiveOpinion["long"].value=longitude;
}


