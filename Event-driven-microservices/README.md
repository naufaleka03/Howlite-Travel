===PACKAGE JSON SCRIPTS===
"scripts": {
    "build": "tailwindcss -i ./src/styles/tailwind.css -o ./public/css/output.css",
    "start": "node --watch src/app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

===BROWSER SYNC CONFIGURATION===
browser-sync start --proxy "http://localhost:3000" --files "services/booking-service/public/css/*.css, services/booking-service/src/**/*.js, services/booking-service/src/views/**/*.ejs" --no-notify
browser-sync start --proxy "http://localhost:3000" --files "../booking-service/public/css/*.css, ../booking-service/src/**/*.js, ../booking-service/src/views/**/*.ejs" --no-notify

===RABBITMQ INSTALATION VIA DOCKER===
docker pull rabbitmq
docker run -d --name my-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management

===DATABASE SCHEMA MIGRATION SQL===

== login-register ==
CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('"User_id_seq"'::regclass),
    email character varying COLLATE pg_catalog."default" NOT NULL,
    password_hash character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY (id),
    CONSTRAINT unique_items UNIQUE (email, password_hash)
)

TABLESPACE pg_default;

CREATE TABLE IF NOT EXISTS public.tokens
(
    id integer NOT NULL DEFAULT nextval('token_id_seq'::regclass),
    user_id integer NOT NULL,
    token character varying COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT token_pkey PRIMARY KEY (id),
    CONSTRAINT user_reference FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tokens
    OWNER to postgres;

ALTER TABLE IF EXISTS public.users
    OWNER to postgres;

== booking-service ==
CREATE TABLE IF NOT EXISTS public.available_tickets
(
    id integer NOT NULL DEFAULT nextval('available_tickets_id_seq'::regclass),
    destination character varying COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL,
    departure_time time without time zone NOT NULL,
    price integer NOT NULL,
    passenger character varying COLLATE pg_catalog."default" NOT NULL,
    departure character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT available_tickets_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.available_tickets
    OWNER to postgres;

CREATE TABLE IF NOT EXISTS public.bookings
(
    id character varying COLLATE pg_catalog."default" NOT NULL,
    departure character varying COLLATE pg_catalog."default" NOT NULL,
    destination character varying COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL,
    "time" time without time zone NOT NULL,
    price integer NOT NULL,
    "seatNumber" character varying COLLATE pg_catalog."default" NOT NULL,
    status character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT bookings_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.bookings
    OWNER to postgres;

== payment-service ==
CREATE TABLE IF NOT EXISTS public.tiket
(
    id integer NOT NULL,
    departure character varying COLLATE pg_catalog."default" NOT NULL,
    destination character varying COLLATE pg_catalog."default" NOT NULL,
    date date NOT NULL,
    departure_time time without time zone NOT NULL,
    price integer NOT NULL,
    passenger character varying COLLATE pg_catalog."default" NOT NULL,
    transportation character varying COLLATE pg_catalog."default",
    transport_type character varying COLLATE pg_catalog."default",
    CONSTRAINT tiket_pkey PRIMARY KEY (id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.tiket
    OWNER to postgres;


== inventory-service ==
CREATE TABLE IF NOT EXISTS public.payment
(
    id integer NOT NULL DEFAULT nextval('payment_id_seq'::regclass),
    "userId" integer,
    "bookingId" integer,
    username character varying COLLATE pg_catalog."default",
    email character varying COLLATE pg_catalog."default",
    phone character varying COLLATE pg_catalog."default",
    amount integer,
    "paymentDate" time without time zone,
    status character varying COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.payment
    OWNER to postgres;

== user-service ==
CREATE TABLE IF NOT EXISTS public.profiles
(
    id integer NOT NULL DEFAULT nextval('profiles_id_seq'::regclass),
    user_id integer,
    username character varying COLLATE pg_catalog."default",
    email character varying COLLATE pg_catalog."default",
    phone character varying COLLATE pg_catalog."default",
    gender character varying COLLATE pg_catalog."default",
    CONSTRAINT profiles_pkey PRIMARY KEY (id),
    CONSTRAINT unique_user_id UNIQUE (user_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.profiles
    OWNER to postgres;