docker run --name local-database -p 5432:5432 -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=root -e POSTGRES_DB=mydb  -d postgres:15.0
