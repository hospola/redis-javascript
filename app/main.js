const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const addr = new Map();
const argumentos = process.argv.slice(2);
const [fdir, fname] = [argumentos[1] ?? null, argumentos[3] ?? null];
if (fdir && fname) {
  addr.set("dir", fdir);
  addr.set("dbfilename", fname);
}


const server = net.createServer((connection) => {

  let keyValueStore = new Map();
   // Handle connection
   connection.on("data", (data) => {
    const command = data.toString().split("\r\n");
    // create a map to store the keys with their values
    
    if (command[2].toLowerCase() === "ping") connection.write("+PONG\r\n");
    else if (command[2].toLowerCase() === "echo") connection.write('$' + command[4].length + '\r\n' + command[4] + '\r\n');
    else if (command[2].toLowerCase() === "set") {
      if (command.length < 9) {
        const key = command[4];
        const value = command[6];
        keyValueStore.set(key, value);
        connection.write("+OK\r\n");
      }
      else if (command[8].toLowerCase() === "px") {
        const key = command[4];
        const value = command[6];
        const expiration = parseInt(command[10], 10);
        keyValueStore.set(key, value);
        setTimeout(() => {
          keyValueStore.delete(key);
        }, expiration);
        connection.write("+OK\r\n");
      }
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
    else if (command[2].toLowerCase() === "config" && command[4].toLowerCase() === "get") {
      if (addr.has(command[6])) connection.write("*2\r\n$" + command[6].length + "\r\n" + command[6] + "\r\n$" + addr.get(command[6]).length + "\r\n" + addr.get(command[6]) + "\r\n");
      else connection.write("$-1\r\n");
    }
   });
 });
//
 server.listen(6379, "127.0.0.1");
