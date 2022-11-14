# Запуск

## Через докер

```
docker build -t backend-transcendence .
docker run -dp 3000:3000 backend-transcendence
```

## Локально

При первом запуске нужно установить пакеты зависимости

```
yarn
```

После этого можно запустить проект в режиме разработчика

```
yarn start:dev
```
