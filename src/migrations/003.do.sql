-- for admin role:
INSERT INTO ACL(acl_id, role_id, name) VALUES ('2ab2804d-99be-4e0a-b6eb-6e45c453add1', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'users-CREATE');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('848fb928-b709-40c5-860c-82266b3ef2c7', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'users-READ');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('40a833a4-5fba-4552-838c-428545cf1424', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'users-UPDATE');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('11b0009a-b73c-4aee-891f-8542bb834d99', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'users-DELETE');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('c2e5d173-0114-46b1-b272-cfe53c322c84', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'roles-CREATE');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('9054085b-a21c-4364-b960-684fdb6f78f4', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'roles-READ');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('27dd5299-4a9f-4b8c-82de-a53de36a4339', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'roles-UPDATE');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('6c0c0238-b2bf-4300-8e52-6029863bb609', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'roles-DELETE');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('f2b0ad1e-9c89-4571-9874-e9b930fa0a81', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'acl-CREATE');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('6331ca1b-605c-4cd3-91e3-6c56864ba9ea', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'acl-READ');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('e9dd7a69-f041-4392-98f3-071696fd6ad1', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'acl-UPDATE');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('6bc41d12-1106-43af-b7b4-418026c71055', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'acl-DELETE');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('17530fe9-972a-46da-954b-3bfe1c223c13', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'categories-CREATE');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('fe6ebae6-42fd-4c44-8d07-2b262b254f26', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'categories-READ');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('a63dd39d-cdae-4b3e-9d2e-945201b61b9f', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'categories-UPDATE');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('bf7106ab-47c2-4aef-a807-77034a35511e', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'categories-DELETE');

-- for user role:
INSERT INTO ACL(acl_id, role_id, name) VALUES ('1c779b0c-75e7-4e7d-a16e-3e05dc80d713', 'e8df5992-9aa5-4019-a7b5-b0e38243ee5d', 'users-READ');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('385e9273-106d-4299-a7cc-08f5777af9fb', 'e8df5992-9aa5-4019-a7b5-b0e38243ee5d', 'users-UPDATE');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('be6f7b7c-7671-4f2a-a411-17b3ce83591c', 'e8df5992-9aa5-4019-a7b5-b0e38243ee5d', 'roles-READ');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('627a3c67-1e24-42fa-aab1-29779ecef646', 'e8df5992-9aa5-4019-a7b5-b0e38243ee5d', 'acl-READ');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('b2b0c9c9-0b9e-4b9e-9b9a-2b8e9e9b8b9e', 'e8df5992-9aa5-4019-a7b5-b0e38243ee5d', 'categories-READ');

-- for product role:
INSERT INTO ACL(acl_id, role_id, name) VALUES ('7c56d812-ccec-4544-82b3-b3f81d494859', 'e8df5992-9aa5-4019-a7b5-b0e38243ee5d', 'products-READ');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('d46b9ab3-4eff-4300-883e-7b75dffe28c2', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'products-UPDATE');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('dfba3850-6a8f-4c47-acd3-07a285b5f1dc', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'products-DELETE');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('ccf13991-ba12-40d2-bd09-8464dde4e6ec', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'products-CREATE');

