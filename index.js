const http = require("http");
const { read, write } = require("./utils");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((request, response) => {
    switch (request.url) {
        case "/add":
            const messages = read("messages");

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
            const msg = read('messages');;

            write("messages", msg.slice(0, msg.length - 1));
            break;
    }

    response.end(JSON.stringify(read("messages")));
});

server.listen(port, hostname, () => {
    console.log(`Server is listening ${hostname}:${port}`);
});