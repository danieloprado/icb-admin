const gith = require('gith').create(9001);
const execFile = require('child_process').execFile;

const execOptions = {
  maxBuffer: 1024 * 1024
};

gith({
  repo: 'danieloprado/icb-admin'
}).on('all', function(payload) {
  if (payload.branch === 'master') {
    execFile('hook.sh', execOptions, function(error, stdout, stderr) {
      console.log('exec complete');
    });
  }
});