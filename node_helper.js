//===========================
//	Magic Mirror
//	Module: MMM-MyMinecraft
//	https://github.com/framboise-pi/MMM-MyMinecraft
//	Copyright(C) 2020 Cedric Camille Lafontaine http://www.framboise-pi.fr,
//	version 0.0.1
//===========================
var NodeHelper = require("node_helper");
var mc = require('minecraft-protocol');
var fs = require('fs');

//
round = 0;

module.exports = NodeHelper.create({

	start: function() {

	},
//
//
	sendzeping: function(ping, server_round,err) {
			var self = this;
			error = "";
			description = "";
			if (err) { error = "error: " + err.code; };
			if (!ping){
				error = "@" + server_round[1] + " : aucune information.";
				payload = {
					players_online: "n",
					players_max: "a",
					version_name: "n/a",
					version_protocol: "n/a",
					latency: "n/a",
					motd: "n/a",
					server_round: server_round,
					error: error
				}
			} else {
				if (ping.description.text) {
					description = ping.description.text;
					description = "\n" + description.replace(/§./g, "");
				}
				var latency_format = ping.latency + '';
				while (latency_format.length < 4) {
					latency_format = '0' + latency_format;
				};
				payload = {
					players_online: ping.players.online,
					players_max: ping.players.max,
					version_name: ping.version.name,
					version_protocol: ping.version.protocol,
					latency: latency_format,
					motd: description,
					server_round: server_round,
					error: error
				}
			}	
			this.sendSocketNotification('MMM_MyMinecraft_Pinged',payload);
	},
//
	socketNotificationReceived: function (notification, payload) {
		//
		var self = this;
		if (notification === "MMM_MyMinecraft_Ping"){
			let rawdata = fs.readFileSync(self.path + '/servers.json');
			let listing = JSON.parse(rawdata);
			server_round = listing.servers;
			if (round >= (server_round.length)){
				round = 0;
			}
			
			server_round = server_round[round];
			mc.ping({"host":server_round[1],"port":server_round[2]}, function(err, ping) {
				self.sendzeping(ping, server_round, err);
			});
		}
		if (notification === "MMM_MyMinecraft_Round"){
			round = round + 1;
		}
	}

});
