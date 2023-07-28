# Simple Mail Ts

**Simple Mail Ts** is an editable microservice in nestJs where you can insert your template handlebars and send emails with queue control with **Bull** support.

## Installation and Build

The Installation process is simple. You need to fill in the details of your .env file in place of the .env.example, inserting your SMTP information (Compatibility with GMAIL and others), your redis container access information and also a configuration for your Bull dashbard.

### Docker network configuration

To use containers you need to create a docker network with:

```bash
docker network create name-your-network
```

Having done this, connect the redis container to the network and get the ip of the redis container with:

```bash
docker network inspect name-your-network
```

Having performed these steps, add the REDIS_HOST in the .env and build the image with:

```bash
docker build -t samples-mail-ts .
```


    
## Demonstration

To use the email service after it has been configured, you can test it by accessing host:3000/admin/bull and inserting your credentials, if you have access to the queue everything is fine.

### Request for use

Example:

Make a POST Request to http://localhost:3000/send-email
```json
{
   "to":"mail@gmail.com",
   "from":"mail@noreply.com.br",
   "subject":"Test",
   "context":{
     "name":"Jarvan Five"
   }
}
```