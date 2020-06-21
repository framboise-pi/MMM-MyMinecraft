/* global Module */

/*	Magic Mirror
 *	Module: MMM-MyMinecraft
 *	https://github.com/framboise-pi/MMM-MyMinecraft
 *	Copyright(C) 2020 Cedric Camille Lafontaine http://www.framboise-pi.fr,
 *	version 0.0.1
 */
//var fs = require('fs');
	
Module.register("MMM-MyMinecraft",{
	// CONFIG
	defaults: {
			config: {
				/*ping_interval : 5,
				slide_interval: 30*/
				}

	},

	//VARIABLES USED
	players_online: "online",
	players_max: "max",
	version_name: "version",
	version_protocol: "protocol",
	motd: "message of the day",
	latency: "latency",
	server_round: ["name","ip","port"],
	error: "",

	// CSS
	getStyles: function () {
		return ["MMM-MyMinecraft.css", "font-awesome.css"];
	},
	//
	start: function() {
		this.updateDom();
		this.pingminecraft();
	},
    //
    pingminecraft: function(){
		var self = this;
		setInterval(function(){
			self.sendSocketNotification("MMM_MyMinecraft_Ping");
		}, self.config.ping_interval * 1000);
		setInterval(function(){
			self.sendSocketNotification("MMM_MyMinecraft_Round");
		}, self.config.slide_interval * 1000);
	},
	
	socketNotificationReceived: function (notification, payload) {
		var self = this;
		if (notification === "MMM_MyMinecraft_Pinged"){
			this.players_online = payload.players_online,
			this.players_max = payload.players_max,
			this.version_name = payload.version_name,
			this.version_protocol = payload.version_protocol,
			this.motd = payload.motd,
			this.latency = payload.latency,
			this.server_round = payload.server_round,
			this.error = payload.error,
			this.updateDom();
		}
	},
	

	//#end socketNotif SensorsData
	getDom: function() {
		var self = this;
		var body = document.getElementsByTagName("body")[0];

		var tbl = document.createElement("table");
		var tblBody = document.createElement("tbody");
	 
		var row_name = document.createElement("tr");
		var cell_name = document.createElement("td");
		var cellText_name = document.createTextNode(this.server_round[0]);
		cell_name.style.background = "rgb(20,30,30)";
		cell_name.appendChild(cellText_name);
		cell_name.colSpan = 4;
		row_name.appendChild(cell_name);
		tblBody.appendChild(row_name);
////////////// ERROR
		if (this.error != "") {
			var row_error = document.createElement("tr");
			var cell_error = document.createElement("td");
			var cellText_error = document.createTextNode(this.error);
			//cell_error.style.background = "rgb(200,30,30)";
			cell_error.appendChild(cellText_error);
			cell_error.colSpan = 4;
			cell_error.setAttribute('class', 'error');
			row_error.appendChild(cell_error);
			tblBody.appendChild(row_error);
			
		} else {
	/////////// DESCRIPTION
			var row_motd = document.createElement("tr");
			var cell_motd = document.createElement("td");
			cell_motd.setAttribute('class', 'motd');
			var cellText_motd = document.createTextNode(this.motd);
			cell_motd.style.background = "rgb(30,50,50)";
			cell_motd.appendChild(cellText_motd);
			cell_motd.colSpan = 4;
			row_motd.appendChild(cell_motd);
			tblBody.appendChild(row_motd);
	////////////// PLAYERS
			var row2 = document.createElement("tr");
			var cell_players_fa = document.createElement("td");
			var cell_players_div = document.createElement("div");
			ihtml =  "<div class='container'>";
			ihtml += "<i class=\"fa fa-group\" style=\"color:#669999\"></i>";
			ihtml += "</div>";
			cell_players_div.innerHTML = ihtml;
			cell_players_div.style.background = "rgb(255,255,255)";
			cell_players_fa.appendChild(cell_players_div);
			row2.appendChild(cell_players_fa);
			var cell_players = document.createElement("td");
			var cellText_players = document.createTextNode(this.players_online + "/" + this.players_max + " joueurs");
			cell_players.setAttribute('class', 'players');
			//cell_players.style.background = "rgb(40,60,60)";
			cell_players.appendChild(cellText_players);
			row2.appendChild(cell_players);
	////////////// LATENCY
			var cell_latency_fa = document.createElement("td");
			var cell_latency_div = document.createElement("div");
			ihtml =  "<div class='container'>";
			ihtml += "<i class=\"fa fa-retweet\" style=\"color:#669999\"></i>";
			ihtml += "</div>";
			cell_latency_div.innerHTML = ihtml;
			cell_latency_div.style.background = "rgb(255,255,255)";
			cell_latency_fa.appendChild(cell_latency_div);
			row2.appendChild(cell_latency_fa);
			var cell_latency = document.createElement("td");
			var cellText_latency = document.createTextNode(this.latency + " ms");
			cell_latency.setAttribute('class', 'latency');
			//cell_latency.style.background = "rgb(40,60,60)";
			cell_latency.appendChild(cellText_latency);
			row2.appendChild(cell_latency);
			tblBody.appendChild(row2);
			
	////////////// VERSION - PROTOCOL
			var row = document.createElement("tr");
			var cell_version_fa = document.createElement("td");
			var cell_version_div = document.createElement("div");
			ihtml =  "<div class='container'>";
			ihtml += "<i class=\"fa fa-info-circle\" style=\"color:#FFFFFF\"></i>";
			ihtml += "</div>";
			cell_version_div.innerHTML = ihtml;
			cell_version_div.style.background = "rgb(100,150,150";
			cell_version_fa.appendChild(cell_version_div);
			row.appendChild(cell_version_fa);
			var cell = document.createElement("td");
			var cellText = document.createTextNode(this.version_name);
			//cell.style.background = "rgb(40,60,60";
			cell.setAttribute('class', 'version');
			cell.appendChild(cellText);
			row.appendChild(cell);
			var cell_protocol = document.createElement("td");
			var cellText_protocol = document.createTextNode("protocol: " + this.version_protocol);
			//cell_protocol.style.background = "rgb(100,150,150)";
			cell_protocol.setAttribute('class', 'protocol');
			cell_protocol.appendChild(cellText_protocol);
			cell_protocol.colSpan = 2
			row.appendChild(cell_protocol);		

			tblBody.appendChild(row);
		}
		tbl.appendChild(tblBody);
		body.appendChild(tbl);
		tbl.setAttribute("border", "0");
		tbl.setAttribute("class", "center");
		tbl.style.width  = '90%';
		return tbl;
		
	},
});
