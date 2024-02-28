const fs = require('fs');
const os = require('os');

const getip = () => {
  const interfaces = os.networkInterfaces();
  let hostIp;
  Object.keys(interfaces).forEach((iface) => {
    interfaces[iface].forEach((ifaceInfo) => {
      if (ifaceInfo.family === 'IPv4' && !ifaceInfo.internal) {
        hostIp = ifaceInfo.address;
      }
    });
  });
  return hostIp;
}


function generateDockerCompose() {
  try {
    const hostIp = getip();
    let dockerComposeTemplate = fs.readFileSync('docker-compose.yml', 'utf8');
    dockerComposeTemplate = dockerComposeTemplate.replace(/\${HOST_IP_FOR_KAKFA}/g, hostIp);
    fs.writeFileSync('docker-compose.yml', dockerComposeTemplate);
    console.log('Docker Compose file generated successfully!');
  } catch (error) {
    console.error('Error generating Docker Compose file:', error);
  }
}

generateDockerCompose();
