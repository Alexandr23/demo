# BMP
[react, redux, typescript, tslint, ssr, scss, yarn, webpack 3, hot-reload]


### Нужны:

* git
* node - 8.9.3 и выше
* yarn - 1.0.1 и выше


### Чего и как делать для начала работы?

##### 1. Скачиваем репу  
>`git clone <путь до репы с кодом> <куда ставим>`

##### 2. Ставим зависимости
>`yarn install` для разработки

> `yarn install --p` для production

##### 3. Запускаем проект
>`yarn run start:dev` в dev-режиме

>`STATIC_URL=<url до статики> API_URL=<url до api> yarn run start:prod` в prod-режиме 

##### 4. Открываем в браузере
> `http://localhost:8889`

##### Сборка и запуск в production-режиме
> `yarn run build:prod` сборка в prod-режиме

> `STATIC_URL=<url до статики> API_URL=<url до api> yarn run server:start` запуск сервера

или

> `STATIC_URL=<url до статики> API_URL=<url до api> yarn run start:prod` сборка и запуск сервера в prod-режиме