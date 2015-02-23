module.exports = {
  log: function(logject){
      var logs = '\u001B[2J\u001B[0;0f'; // resets terminal cursor position;
      for(var key in logject){
        if(Array.isArray(logject[key])){
          logject[key].forEach(function(item){
            logs += key+': '+item+'\n';
          })
        } else {
          logs += key+': '+logject[key]+'\n';
        }
      }
      process.stdout.write(logs);
      // If previous doesn't work, replace with this next line instead:
      // console.log(JSON.stringify(logject));
  }
};
