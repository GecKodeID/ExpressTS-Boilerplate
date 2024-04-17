CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE UserRoles (
    role_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    role_name VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_at TIMESTAMPTZ,
    updated_by UUID,
    deleted_at TIMESTAMPTZ
);

CREATE TABLE Users (
    user_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    role_id UUID,
    name VARCHAR(255),
    address VARCHAR(255),
    phone VARCHAR(255),
    profile_picture VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_at TIMESTAMPTZ,
    updated_by UUID,
    deleted_at TIMESTAMPTZ,
    FOREIGN KEY (role_id) REFERENCES UserRoles(role_id)
);

CREATE TABLE ACL (
    acl_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    role_id UUID,
    name VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_at TIMESTAMPTZ,
    updated_by UUID,
    deleted_at TIMESTAMPTZ,
    FOREIGN KEY (role_id) REFERENCES UserRoles(role_id)
);