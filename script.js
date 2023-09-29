const config = require('configuration.json');
const axios = require('axios');
let Count = 0;

const intervalIdentifier = setInterval(() => {

    Count++;
    
    if(Count >= config.limit)
        clearInterval(intervalIdentifier);

    var randomMessage = Math.floor(Math.random() * config.messages.length);
  
    var message = config.messages[randomMessage];

    axios.get(config.settings.url, {
        params: {
            id_group    :   config.id_group,
            id_post     :   config.id_post,
            from_group  :   config.settings.from_group,
            message     :   message,
            v           :   config.settings.vk_api_version,
            access_token:   config.api_token
        }
    }).then( (response) => {

        var data = response.data;

        if('error' in data)
        {
            console.log('ERROR');        
        } 
        
        else 
        {
            console.log('[VK-SPAM]');
            console.log(`[${Count}]`, " Message: ", message);
            console.log('[VK-SPAM]', "\n");
        }

    }).catch( (error) => {
        console.log(error);
        clearInterval(intervalIdentifier);
    });

}, 
config.interval);