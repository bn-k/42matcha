FROM postgres

COPY db/init/init.sql /docker-entrypoint-initdb.d/
EXPOSE 5432