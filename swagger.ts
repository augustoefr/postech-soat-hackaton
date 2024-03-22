const swaggerAutoGen = require('swagger-autogen')();

const outputFile = './swagger_output.json';
const endpointsFiles = ['./src/adapter/http/routes/*.{ts,js}'];

const doc = {
	info: {
		version: "1.0.0",
		title: "Postech Soat Hackaton - Time Punch",
		description: "Documentação sobre os endpoints fornecidos pela API."
	},
	host: "localhost:3000",
	basePath: "/",
	schemes: ['http', 'https'],
	consumes: ['application/json'],
	produces: ['application/json'],
	tags: [
		{
			"name": "TimePunch",
			"description": "Endpoints"
		},
		{
			"name": "Employee",
			"description": "Endpoints"
		}
	],
	definitions: {
		TimePunch: {
			id: 1,
			employee: 2,
			time: '2024-03-22 08:00:00'
		},
		TimePunchesList: [
			{
				$ref: "#/definitions/TimePunch"
			}
		]
	}
}


swaggerAutoGen(outputFile, endpointsFiles, doc);