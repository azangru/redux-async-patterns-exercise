Для установки приложения нужно:

0. Установить node.js (желательно последнюю версию)

Для этого:

- поставить пакет nvm (node version manager)

(см. инструкцию здесь: https://github.com/creationix/nvm#install-script)

`curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash`

- поставить node.js

`nvm install v6.6.0`

- убедиться, что node.js установлен, прописан в PATH, и используется правильная версия из nvm:

`node -v`
(должно вывестись v6.6.0)

- если команда `node -v` выводит старую версию node.js, то переключиться на новую:

`nvm list`
(выводит доступные версии)

`nvm use v6.6.0`
(выбираем нужную версию)

`nvm alias default node`
(выполняется после переключения на нужную версию; после этого в любой терминальной сессии будет использоваться данная версия node.js)

1. Разархивировать архив в нужную папку, после чего установить пакеты node.js командой:

`npm install`

2. Запустить приложение командой

`npm run backend`

==========================
For local development:

nginx settings:

```
server {
    listen 8080;
    location / {
      proxy_pass <path_to_node_server>;
    }
    location /api/ {
      proxy_pass <path_to_django_server>;
    }
}

```
