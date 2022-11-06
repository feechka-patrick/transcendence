# Разработка информационной системы - веб-сайта с игрой

[Пояснительная записка](https://docs.google.com/document/d/1Ur2WKnzVjxz4nHMs6RouXxc1BD4ycoFT/edit?usp=sharing&ouid=114098491973806463007&rtpof=true&sd=true) c описанием курсовой работы, процесса разработки и выбранных технологий

## Запуск
### Докер
```
docker-compose up --build
```

Так же можно запустить контейнеры раздельно, смотреть readme в client и в server

### Локально
Перейти в client, затем в server и запустить команды. Локально должна работать PostgreSQL

```
yarn
yarn start
```

Продакшн версия

### Стек технологий
 - Серверная часть выполнена с использованием NestJs
 - Frontend на ReactJs
 - СУБД - PostgreSQL
