
//make de request from the images and get a random image from hubble telescope
const axios = require("axios").default;

const searchQuery = "hubble";

const randPage = Math.floor(Math.random() * 2);


const imagesUrl = `https://images-api.nasa.gov/search?q=${searchQuery}&page=${randPage}&media_type=image`;

const collectionLinks = [];

const getImages = async (url) => {
	const response = await axios.get(url);

	const data = response.data;

	const dataItems = data.collection.items;

	dataItems && dataItems.map((link) => {
		collectionLinks.push(link.href);
	})

	const randNumber = Math.floor(Math.random() * 101);

	const randUrl = collectionLinks[randNumber];

	const randImg = await getRandImage(randUrl);

	console.log(randImg);
	
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
		const imgUrl = await getImages(imagesUrl);
		message.channel.send("get a random pic from hubble, the telescope");
		message.channel.send(imgUrl);
	}
});

client.login(configs.DISCORD_TOKEN);



















