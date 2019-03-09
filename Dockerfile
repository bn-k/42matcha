FROM postgres

COPY ./server/database /data/postgres
EXPOSE 5432