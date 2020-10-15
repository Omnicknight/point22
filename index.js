const http = require("http");
const { read, write } = require("./utils");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((request, response) => {
  const messages = read("messages");

  switch (request.url) {
    case "/add":

      const newData = [
        ...messages,
        {
          id: messages[messages.length - 1].id + 1,
          name: "No-name",
        },
      ];

      write("messages", newData);
      break;

    case "/delete":

      write("messages", messages.slice(0, messages.length - 1));
      break;
  }

  response.end(JSON.stringify(read("messages")));
});

server.listen(port, hostname, () => {
  console.log(`Server is listening ${hostname}:${port}`);
});
