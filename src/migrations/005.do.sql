-- add access to admin to TEMPLATE endpoint
INSERT INTO ACL(acl_id, role_id, name) VALUES ('bfc9b794-5a0e-44b4-98e4-22f45cc79ef4', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'TEMPLATE-CREATE');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('67621e77-0b96-4e0e-8840-8ea63941585c', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'TEMPLATE-READ');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('2541b6ff-fb28-4f28-82b5-01ca3d8bad4d', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'TEMPLATE-UPDATE');
INSERT INTO ACL(acl_id, role_id, name) VALUES ('87ba8241-4072-44db-a841-4b42226cd49e', 'ced620fa-c5c7-4027-b188-f434104e3f74', 'TEMPLATE-DELETE');