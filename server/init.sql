create table users
(
  id                        serial                not null
    constraint users_pkey
    primary key,
  username                  varchar(65)           not null,
  email                     varchar(255)          not null,
  lastname                  varchar(65)           not null,
  firstname                 varchar(65)           not null,
  password                  varchar(65)           not null,
  created_at                timestamp with time zone default CURRENT_TIMESTAMP,
  random_token              varchar(254)             default '' :: character varying,
  img1                      varchar(255)             default '' :: character varying,
  img2                      varchar(255)             default '' :: character varying,
  img3                      varchar(255)             default '' :: character varying,
  img4                      varchar(255)             default '' :: character varying,
  img5                      varchar(255)             default '' :: character varying,
  biography                 varchar(2048)            default '' :: character varying,
  birthday                  timestamp,
  genre                     varchar(64)              default 'male' :: character varying,
  interest                  varchar(255)             default 'bisexual' :: character varying,
  city                      varchar(65)              default '' :: character varying,
  zip                       varchar(65)              default '' :: character varying,
  country                   varchar(65)              default '' :: character varying,
  latitude                  numeric(20, 6)           default 0.0,
  longitude                 numeric(20, 6)           default 0.0,
  geo_allowed               boolean default false not null,
  online                    boolean default false not null,
  rating                    numeric(9, 6)            default 2.5,
  admin                     boolean                  default false
);

alter table users
  owner to matcha;

INSERT INTO "public"."users" ("id", "username", "email", "lastname", "firstname", "password", "created_at", "random_token", "img1", "img2", "img3", "img4", "img5", "biography", "birthday", "genre", "interest", "city", "zip", "country", "latitude", "longitude", "geo_allowed", "online", "rating", "admin") VALUES (DEFAULT, 'username', 'email_test', 'lastname', 'firstname', 'password', '2019-03-01 16:28:47.687000', 'fasdfi', 'asdf', 'fasdf', 'dsf', 'adsf', '', 'dasfdi', '2019-03-01 15:28:59.522000', 'genre_test', DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT, DEFAULT)
