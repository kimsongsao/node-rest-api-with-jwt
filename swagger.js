const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./app.js']

const doc = {
    info: {
        title: 'Node JS RESTful API with JWT',
        description: 'This is a simple project structure to get you started creating your own RESTful APIs using Express framework and MongoDB.',
        version: '1.0.0',
        license: {
            name: 'MIT',
            url: 'https://spdx.org/licenses/MIT.html',
        },
        contact: {
            name: 'Kimsong SAO',
            url: 'https://www.linkedin.com/in/kimsongsao/',
            email: 'saokimsong@email.com',
        },
    },
    host: 'localhost:3001',
    basePath: '/',
    schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc)