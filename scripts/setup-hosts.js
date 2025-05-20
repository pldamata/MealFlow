const fs = require('fs');
const { execSync } = require('child_process');

const HOSTS_FILE = process.platform === 'win32' 
  ? 'C:\\Windows\\System32\\drivers\\etc\\hosts'
  : '/etc/hosts';

const DOMAINS = [
  '127.0.0.1 root.mealflow.net',
  '127.0.0.1 demo.mealflow.net'
];

try {
  // Read current hosts file
  const currentHosts = fs.readFileSync(HOSTS_FILE, 'utf8');
  
  // Check if domains are already added
  const needsUpdate = DOMAINS.some(domain => !currentHosts.includes(domain));
  
  if (needsUpdate) {
    // Add domains to hosts file
    const newHosts = `${currentHosts}\n\n# MealFlow Development\n${DOMAINS.join('\n')}`;
    
    if (process.platform === 'win32') {
      // For Windows, write to a temp file and provide instructions
      fs.writeFileSync('hosts.tmp', newHosts);
      console.log('\nPor favor, adicione as seguintes linhas ao seu arquivo hosts (C:\\Windows\\System32\\drivers\\etc\\hosts):\n');
      console.log(DOMAINS.join('\n'));
    } else {
      // For Unix-like systems, try to write directly
      try {
        execSync(`sudo echo "${newHosts}" > ${HOSTS_FILE}`);
        console.log('Domínios adicionados com sucesso ao arquivo hosts!');
      } catch (error) {
        console.log('\nPor favor, adicione as seguintes linhas ao seu arquivo hosts (/etc/hosts):\n');
        console.log(DOMAINS.join('\n'));
      }
    }
  } else {
    console.log('Os domínios já estão configurados no arquivo hosts.');
  }
} catch (error) {
  console.error('Erro ao configurar os domínios:', error);
  console.log('\nPor favor, adicione manualmente as seguintes linhas ao seu arquivo hosts:\n');
  console.log(DOMAINS.join('\n'));
}