
-- roles
INSERT INTO public.roles
(role_id, role_name)
VALUES(1, 'ROLE_USER');

-- user position
INSERT INTO public.user_positions
(user_position_id, "name", description)
VALUES(1, 'test', 'desc');

-- users
INSERT INTO public.users
(user_id, firstname, lastname, username, "password", user_position_id)
VALUES(1, 'a', 'test', 'user', '$2y$10$NpJHJ7w5RABsYNiedV6/NeJ9tbk3K9og0u6nMOd.aEokFyN1CrIQS', 1);

-- user roles
INSERT INTO public.user_roles
(user_id, role_id)
VALUES(1, 1);

-- product
INSERT INTO public.products
(product_id, "name", atc, supplier_id, packaging, description, inn, releasable)
VALUES(99, 'testproduct', NULL, NULL, NULL, NULL, NULL, true);

-- orders
INSERT INTO public.orders
(order_id, user_id, description, created_date, last_modified_date)
VALUES(1, 1, 'tester', '2022-07-10 13:53:27.292', '2022-07-10 13:53:27.292');
INSERT INTO public.orders
(order_id, user_id, description, created_date, last_modified_date)
VALUES(2, 1, 'tester', '2022-07-10 13:53:27.292', '2022-07-10 13:53:27.292');

-- order details
INSERT INTO public.order_details
(order_detail_id, order_id, product_id, quantity, order_type, start_date, end_date)
VALUES(1, 1, 99, 5, 'other', '2022-06-18', '2022-06-18');
INSERT INTO public.order_details
(order_detail_id, order_id, product_id, quantity, order_type, start_date, end_date)
VALUES(2, 1, 99, 2, 'other', '2022-06-18', '2022-06-18');
INSERT INTO public.order_details
(order_detail_id, order_id, product_id, quantity, order_type, start_date, end_date)
VALUES(3, 2, 99, 8, 'other', '2022-06-18', '2022-06-18');
INSERT INTO public.order_details
(order_detail_id, order_id, product_id, quantity, order_type, start_date, end_date)
VALUES(4, 2, 99, 4, 'other', '2022-06-18', '2022-06-18');
