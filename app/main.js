const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this block to pass the first stage
const server = net.createServer((connection) => {
  let keyValueStore = new Map();
   // Handle connection
   connection.on("data", (data) => {
    const command = data.toString().split("\r\n");
    // create a map to store the keys with their values
    
    if (command[2].toLowerCase() === "ping") connection.write("+PONG\r\n");
    else if (command[2].toLowerCase() === "echo") connection.write('$' + command[4].length + '\r\n' + command[4] + '\r\n');
    else if (command[2].toLowerCase() === "set") {
      const key = command[4];
      const value = command[6];
      keyValueStore.set(key, value);
      connection.write("+OK\r\n");
    }
    else if (command[2].toLowerCase() === "get") {
      const key = command[4];
      if (keyValueStore.has(key)) {
        const value = keyValueStore.get(key);
        connection.write('$' + value.length + '\r\n' + value + '\r\n');
      } else {
        connection.write("$-1\r\n");
      }
    }
   });
 });
//
 server.listen(6379, "127.0.0.1");
