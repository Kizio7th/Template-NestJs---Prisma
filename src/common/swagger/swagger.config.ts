
const customfavIcon = "https://en.wikipedia.org/wiki/Swagger_%28software%29#/media/File:Swagger-logo.png";      //adding our favicon to swagger

const customCss = `
    .topbar{
        animation: navanimation linear both;
        animation-range: 0 300px;
        animation-timeline: scroll(root);
        position: sticky;
        top: 0px;
        z-index: 1
    }
    .topbar-wrapper {
        content: Prueba; color: white;
    }  
    .topbar-wrapper a {
        content:url(https://res.cloudinary.com/dphleqb5t/image/upload/v1713730346/rest-api-template/Logo-Swagger_ukcytn.png); width:200px; height:auto;
    }
    .swagger-ui .opblock .opblock-summary-description { 
        font-weight: 900 
    }
    .description .renderedMarkdown p {
        font-size: 1rem;
    }
    @keyframes navanimation {
        to {
            opacity: 0.9;
            backdrop-filter: blur(10px);
        }
    }
`

const customSiteTitle = "Shopping_Dating API docs";   //add site title to swagger for nice SEO

const customJs = "script url";                  //uncomment this line to add a custom script file
const customJsStr = "alert('prueba')";          //uncomment this line to add a custom script


const swaggerOptions = {
    customfavIcon,
    customCss,
    customSiteTitle,
    // customJs,   //uncomment this line to add a custom script file
    // customJsStr,  //uncomment this line to add a custom script
    swaggerOptions: {
        persistAuthorization: true, // this helps to retain the token even after refreshing the (swagger UI web page)
        // defaultModelsExpandDepth: -1 //uncomment this line to stop seeing the schema on swagger ui

    },
}

const swaggerTitle = "Nest APIDocumentation"

const swaggerDescription = `
 
`

export {
    swaggerOptions,
    swaggerTitle,
    swaggerDescription
}