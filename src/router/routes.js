export const routes = [
    {
        path: "/",
        component: () => import("@/components/layout/Container/TheContainer"),
        children: [
            {
                path: "/",
                component: () => import("@/views/employee/EmployeeList/EmployeeList.vue"),
            },
            {
                path: "account",
                component: () => import("@/views/cash/account/AccountList.vue")
            },
            {
                path: "category",
                component: () => import("@/views/category/CategoryHome.vue")
            }
            
        ]
    },
    {
        path: "/cash",
        component: () => import("@/components/layout/TabRouter.vue"),
        children: [
            {
                path: "procedure",
                component: () => import("@/views/cash/procedure/Procedure.vue"),
            },
            {
                path: "pay",
                component: () => import("@/views/cash/pay/PayList.vue"),
            },
           
        ]
    },
    {
        path: "/pay",
        component: () => import ("@/components/layout/TheSecondLayOut.vue"),
        children: [
            {
                path: "pay-detail",
                component: () => import("@/views/cash/pay/PayDetail.vue"),
            }
        ]
    }
]