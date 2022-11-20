# TRANSCENDENCE (ping pong game with chat)

## Запуск

### Для разработки

Приложение состоит из трёх частей, фронт, бэк, и база данных. Для разработки каждую часть разворачиваем отдельно:

Фронт, нужно перейти в папку **client**, установить зависимые пакеты с помощью команды **yarn**, а после запустить само
приложение **yarn start**.

```
cd client
yarn 
yarn start
```

Бэк, нужно перейти в папку server, установить пакеты и запустить приложение.

```
cd server
yarn 
yarn start:dev
```

База данных, достаточно запустить скрипт в корневой папке проекта **startLocalDatabase.sh**. Или исполнить команду

```
docker run --name local-database -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=root -e POSTGRES_DB=mydb  -d postgres:15.0
```

### Продакшн версия

Просто исполнить команду ниже

```
docker-compose up --build
```

## Описание предыдущей версии

[Пояснительная записка](https://docs.google.com/document/d/1Ur2WKnzVjxz4nHMs6RouXxc1BD4ycoFT/edit?usp=sharing&ouid=114098491973806463007&rtpof=true&sd=true)
c описанием курсовой работы, процесса разработки и выбранных технологий

## Стек технологий

- Серверная часть выполнена с использованием NestJs
- Frontend на ReactJs
- СУБД - PostgreSQL
