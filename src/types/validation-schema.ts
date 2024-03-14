import * as yup from 'yup';

export const querySchemaValidation = yup.object().shape({
    search: yup.string().nullable(),
    search_by: yup.string().nullable(),
    page: yup.number().nullable(),
    limit: yup.number().nullable(),
    sort: yup.string().nullable(),
    sort_by: yup.string().nullable()
});

export const paramIdSchemaValidation = yup.object().shape({
    id: yup.string().uuid('invalid-uuid')
});

export const registerSchemaValidation = yup.object().shape({
    username: yup.string().required('missing-username'),
    email: yup.string().email('invalid-email-format').required('missing-email'),
    password: yup.string().required('missing-password').min(8),
    name: yup.string().required('missing-name').min(5),
    phone: yup.string().matches(/^0\d{9,12}$/,'invalid-phone-number-format').required('missing-phone-number'),
    address: yup.string().nullable(),
    profile_picture: yup.string().url().nullable()
});

export const loginSchemaValidation = yup.object().shape({
    username: yup.string().nullable(),
    email: yup.string().email('invalid-email-format').nullable(),
    password: yup.string().required('missing-password').min(8)
});

export const userAddSchemaValidation = yup.object().shape({
    username: yup.string().min(5, "username-not-met-minimum-char").required('missing-username'),
    email: yup.string().email('invalid-email-format').required('missing-email'),
    password: yup.string().required('missing-password').min(8, "password-not-met-minimum-char"),
    name: yup.string().required('missing-name').min(5, "name-not-met-minimum-char"),
    phone: yup.string().matches(/^0\d{9,12}$/,'invalid-phone-number').required('missing-phone-number'),
    address: yup.string().nullable(),
    profile_picture: yup.string().url('invalid-url-format').nullable(),
    created_at: yup.string().nullable(),
    created_by: yup.string().uuid('invalid-uuid-format').required('missing-created-by'),
});

export const ACLAddSchemaValidation = yup.object().shape({
    role_id: yup.string().uuid('invalid-uuid').required('missing-role-id'),
    name: yup.string().required('missing-name').min(5),
    created_at: yup.string().nullable(),
    created_by: yup.string().uuid().required('missing-created-by'),
    updated_at: yup.string().nullable(),
    updated_by: yup.string().uuid().required('missing-updated-by')
});

export const userRolesAddSchemaValidation = yup.object().shape({
    role_name: yup.string().required('missing-role-name'),
    created_at: yup.string().nullable(),
    created_by: yup.string().uuid().required('missing-created-by'),
    updated_at: yup.string().nullable(),
    updated_by: yup.string().uuid().required('missing-updated-by')
});

export const userUpdateSchemaValidation = yup.object().shape({
    username: yup.string().nullable().min(5, 'username-not-met-minimum-char'),
    email: yup.string().email('invalid-email-format').nullable(),
    password: yup.string().nullable().min(8, 'password-not-met-minimum-char'),
    name: yup.string().nullable().min(5, 'name-not-met-minimum-char'),
    phone: yup.string().matches(/^0\d{9,12}$/,'invalid-phone-number-format').nullable(),
    address: yup.string().nullable(),
    profile_picture: yup.string().url('invalid-url-format').nullable(),
    updated_at: yup.string().nullable(),
    updated_by: yup.string().uuid('invalid-updated-by-format').required('missing-updated-by')
});

export const ACLUpdateSchemaValidation = yup.object().shape({
    id: yup.string().uuid('invalid-id-uuid').required('missing-id'),
    role_id: yup.string().uuid('invalid-uuid').nullable(),
    name: yup.string().nullable().min(5),
    updated_at: yup.string().nullable(),
    updated_by: yup.string().uuid('invalid-updated-by-uuid').required('missing-updated-by')
});

export const userRolesUpdateSchemaValidation = yup.object().shape({
    id: yup.string().uuid('invalid-id-uuid').required('missing-id'),
    role_name: yup.string().nullable(),
    updated_at: yup.string().nullable(),
    updated_by: yup.string().uuid('invalid-updated-by-uuid').required('missing-updated-by')
});