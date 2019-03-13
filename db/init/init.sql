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
  genre                     varchar(64),
  interest                  varchar(255)             default 'bi' :: character varying,
  city                      varchar(65)              default '' :: character varying,
  zip                       int                          default 0,
  country                   varchar(65)              default '' :: character varying,
  latitude                  numeric(20, 6)           default 0.0,
  longitude                 numeric(20, 6)           default 0.0,
  geo_allowed               boolean default false not null,
  online                    boolean default false not null,
  rating                    numeric(9, 6)            default 2.5,
  access_lvl                int                      default 0,
);

alter table users
  owner to matcha;
