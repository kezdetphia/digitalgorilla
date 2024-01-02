"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
exports.Users = {
    slug: "users",
    auth: {
        verify: {
            generateEmailHTML: function (_a) {
                var token = _a.token;
                return "<a href='".concat(process.env.NEXT_PUBLIC_SERVER_URL, "/verify-email?token=").concat(token, "'>Verify Account</a>");
            },
        },
    },
    access: {
        read: function () { return true; }, // Anyone can view the collection
        create: function () { return true; }, // Only authenticated users can add to the collection
    },
    fields: [
        {
            name: "role",
            defaultValue: 'user',
            required: true,
            // admin: {
            //   condition: ()=>false,
            // },
            type: "select",
            options: [
                { label: "Admin", value: "admin" },
                { label: "User", value: "user" },
            ],
        },
    ],
};
