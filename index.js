
//make de request from the images and get a random image from hubble telescope
const axios = require("axios").default;

var randPage = Math.floor(Math.random() * 11);

var searchQuery = "";

var keywords = ""


const imagesUrl = `https://images-api.nasa.gov/search?q=${searchQuery}&page=${randPage}&media_type=image`;

const collectionLinks = [];

const getImages = async (url) => {

	if(searchQuery === "james webb"){
		randPage = 1;
	}

	const response = await axios.get(url);

	const data = response.data;

	const dataItems = data.collection.items;

	dataItems && dataItems.map((link) => {
		collectionLinks.push(link.href);
	})

	const randNumber = Math.floor(Math.random() * 101);

	const randUrl = collectionLinks[randNumber];

	const randImg = await getRandImage(randUrl);
	
	return randImg;
}

const getRandImage = async (url) => {
	const response = await axios.get(url);
	
	const data = response.data;
	
	const randResult = data[0];
	
	return randResult;

}


//bot starts here 

const Discord = require("discord.js");

const client = new Discord.Client();

const configs = require("./configs.json");

const prefix = configs.PREFIX;


client.on("ready", () => {
	console.log(`logged in as ${client.user.tag}`)
});

client.on("message", async (message) => {
	if(message.content.startsWith(prefix + "ping")){
		message.reply("Pong")
	}

	if(message.content.startsWith(prefix + "hubble")){
		keywords = "Hubble Space"
		searchQuery = "hubble";
		const imgUrl = await getImages(imagesUrl);
		message.channel.send("get a random pic from hubble, the telescope");
		message.channel.send(imgUrl);
	}

	if(message.content.startsWith(prefix + "mars rover")){
		keywords = "Mars Exploration Rover"
		searchQuery = "mars rover";
		const imgUrl = await getImages(imagesUrl);
		message.channel.send("get a random pic from mars rover");
		message.channel.send(imgUrl);
	}

	if(message.content.startsWith(prefix + "james webb")){
		keywords = "James Webb Space "
		searchQuery = "james webb";
		const imgUrl = await getImages(imagesUrl);
		message.channel.send("get a random pic from james webb, the telescope");
		message.channel.send(imgUrl);
	}
});

client.login(configs.DISCORD_TOKEN);



















