var menu= document.querySelector("#menu");

var menuItems=[
	{"item":"Dashboard", "state":"dashboard", "icon":"home"},
	{"item":"Actividad Fisica", "state":"actividadFisica", "icon":"directions_bike"},
	{"item":"Pasos", "state":"pasos", "icon":"directions_run"},
	{"item":"Sueño", "state":"sueno", "icon":"airline_seat_individual_suite"},
	{"item":"Retos", "state":"retos", "icon":"fitness_center"}
];

var menuContext= {menuItems};
menu.innerHTML= PhysicalActivity.menu(menuContext);

var appContent= document.querySelector("#appContent");

//obtener el titulo del enlace
function getStateTitle(state) {
	for(var i=0; i<menuItems.length; i++){
		if (menuItems[i].state===state) {
			return menuItems[i].item;
		}
	}
}

function changeState(state){
	var appContentContext= {"state":state, "title":getStateTitle(state)};	
	appContent.innerHTML= PhysicalActivity.content(appContentContext);
	var statePage= document.querySelector("#"+state);
	$(".menuLinks").removeClass("menuActive");
	$("#"+state+"Link").addClass("menuActive");
	statePage.innerHTML= PhysicalActivity[state]();
$(".button-collapse").sideNav();
	switch(state){
		case "dashboard":
			calcularSuenio();
			calcularActividadFisica();
			
		break;

		case "actividadFisica":
			var tablaActividad= document.querySelector("#tablaActividad");
			var actividad= [
				{"deporte":"Baloncesto", "tiempo":"1:15:09", "distancia":"3 km", "calorias":"2000 kcal", "fecha":"08-marzo-2018"},
				{"deporte":"Voleibol", "tiempo":"2:00:09", "distancia":"2 km", "calorias":"1000 kcal", "fecha":"08-marzo-2018"}
			];
			tablaActividad.innerHTML= PhysicalActivity.tablaActividadFisica({activity: actividad});
			
			$("input.autocomplete").autocomplete({
				data:{
					"Baloncesto":null,
					"Futbol":null,
					"Patinaje":null,
					"Voleibol":null
				}
			});
			$(".button-collapse").sideNav();
			$('.datepicker').pickadate({
			    selectMonths: true, // Creates a dropdown to control month
			    selectYears: 15, // Creates a dropdown of 15 years to control year,
			    today: 'Today',
			    clear: 'Clear',
			    close: 'Ok',
			    closeOnSelect: false // Close upon selecting a date,
			});
			
		break;

		case "pasos":
			var tablaPasos= document.querySelector("#tablaPasos");
			var pasos= [
				{"fecha":"06-marzo-2018", "pasos":"10000", "distancia":"1 km", "calorias":"2000 kcal"},
				{"fecha":"07-marzo-2018", "pasos":"5000", "distancia":"1 km", "calorias":"1000 kcal"},
				{"fecha":"08-marzo-2018", "pasos":"10000", "distancia":"1 km", "calorias":"1500 kcal"}
			];
			tablaPasos.innerHTML= PhysicalActivity.tablaPasosDados({paso: pasos});
			$('.datepicker').pickadate({
			    selectMonths: true, // Creates a dropdown to control month
			    selectYears: 15, // Creates a dropdown of 15 years to control year,
			    today: 'Today',
			    clear: 'Clear',
			    close: 'Ok',
			    closeOnSelect: false // Close upon selecting a date,
			});
			
		break;

		case "sueno":
			$('select').material_select();
			$('.timepicker').pickatime({
			    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
			    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
			    twelvehour: true, // Use AM/PM or 24-hour format
			    donetext: 'OK', // text for done-button
			    cleartext: 'Clear', // text for clear-button
			    canceltext: 'Cancel', // Text for cancel-button
			    autoclose: false, // automatic close timepicker
			    ampmclickable: true, // make AM PM clickable
			    aftershow: function(){} //Function for after opening timepicker
			});
			$('.datepicker').pickadate({
			    selectMonths: true, // Creates a dropdown to control month
			    selectYears: 15, // Creates a dropdown of 15 years to control year,
			    today: 'Today',
			    clear: 'Clear',
			    close: 'Ok',
			    closeOnSelect: false // Close upon selecting a date,
			});
			var tablaSueno= document.querySelector("#tablaSueno");
			var sueno= [
				{"fecha":"07-marzo-2018", "tipo":"Siesta", "horaIni":"01:00:00 pm", "horaFin":"01:45:02 pm", "recuperacion":"Buena"},
				{"fecha":"07-marzo-2018", "tipo":"Nocturna", "horaIni":"01:00:00 am ", "horaFin":"04:00:02 am", "recuperacion":"Baja"}
			];
			tablaSueno.innerHTML=PhysicalActivity.tablaSuenoDatos({suenos:sueno});
			
		break;

		case "retos":
			$('.datepicker').pickadate({
			    selectMonths: true, // Creates a dropdown to control month
			    selectYears: 15, // Creates a dropdown of 15 years to control year,
			    today: 'Today',
			    clear: 'Clear',
			    close: 'Ok',
			    closeOnSelect: false // Close upon selecting a date,
			});			
		break;
	}	
}

changeState("dashboard");   
$(".button-collapse").sideNav();

function calcularSuenio(){
	var activitySleep= document.getElementById('activitySleep');
			Chart.defaults.global.defaultFontFamily = "Lato";
			Chart.defaults.global.defaultFontSize = 18;
			var speedData = {
			  labels: ["0", "1", "2", "3", "4"],
			  datasets: [{
			    label: "sueño",
			    data: [0, 59, 75, 20, 20, 55, 40],
			    lineTension: 0,
			    fill: false,
			    borderColor: 'orange',
			    backgroundColor: 'transparent',
			    borderDash: [5, 5],
			    pointBorderColor: 'orange',
			    pointBackgroundColor: 'rgba(255,150,0,0.5)',
			    pointRadius: 5,
			    pointHoverRadius: 10,
			    pointHitRadius: 30,
			    pointBorderWidth: 2,
			    pointStyle: 'rectRounded'
			  }]
			};

			var chartOptions = {
			  legend: {
			    display: true,
			    position: 'top',
			    labels: {
			      boxWidth: 80,
			      fontColor: 'black'
			    }
			  }
			};

			var lineChart = new Chart(activitySleep, {
			  type: 'line',
			  data: speedData,
			  options: chartOptions
			});
}

function calcularActividadFisica(){
	var contAct = document.getElementById("actividadFisica");
	Chart.defaults.global.defaultFontFamily = "Lato";
	Chart.defaults.global.defaultFontSize = 18;

	var dataFirst = {
	    label: "Mes Pasado",
	    data: [0, 59, 75, 20, 20],
	    lineTension: 0.3,
	    fill: false,
	    borderColor: 'red',
	    backgroundColor: 'transparent',
	    pointBorderColor: 'red',
	    pointBackgroundColor: 'lightgreen',
	    pointRadius: 5,
	    pointHoverRadius: 15,
	    pointHitRadius: 30,
	    pointBorderWidth: 2,
	    pointStyle: 'rect'
	  };

	var dataSecond = {
	    label: "Mes Actual",
	    data: [20, 15, 60, 60, 65],
	    lineTension: 0.3,
	    fill: false,
	    borderColor: 'purple',
	    backgroundColor: 'transparent',
	    pointBorderColor: 'purple',
	    pointBackgroundColor: 'lightgreen',
	    pointRadius: 5,
	    pointHoverRadius: 15,
	    pointHitRadius: 30,
	    pointBorderWidth: 2
	  };

	var speedData = {
	  labels: ["0", "1", "2", "3", "4"],
	  datasets: [dataFirst, dataSecond]
	};

	var chartOptions = {
	  legend: {
	    display: true,
	    position: 'top',
	    labels: {
	      boxWidth: 80,
	      fontColor: 'black'
	    }
	  }
	};

	var lineChart = new Chart(contAct, {
	  type: 'line',
	  data: speedData,
	  options: chartOptions
	});
}  


