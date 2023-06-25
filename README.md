# **Next.JS 13 Template**

This template include the following features,
* **Database Management** with [`Drizzle ORM`](https://orm.drizzle.team/) and [`Planelscale`](https://planetscale.com/).
* **Data Caching** with [`ioredis`](https://github.com/redis/ioredis) and [`Upstash`](https://upstash.com/).
* **UI Library Management** with [`ShadCN UI`](https://ui.shadcn.com/).
* **Environment Management** with [`T3 ENV`](https://env.t3.gg/docs/introduction).
* **Icon Management** with [`Lucide`](https://lucide.dev/).
* **CSS Management** with [`Tailwind CSS`](https://tailwindcss.com/).
* **Package Manager** as [`pnpm`](https://pnpm.io/).

## **Message from the Creator**
---
Hey, **DRVGO** here. All the needed documentations are hyper-linked with the package names. I myself current am using this stack, although for authentication, I'm kinda in a middle of choosing between [`Clerk`](https://clerk.com/) & [`Auth.JS`](https://authjs.dev/).

The only reason, I'm currently not using `Auth.JS` in this template is, it's still in experimental stage and all the feature have not been implemented and tested. Also, a `Drizzle Adapter` for `next-auth` is still on the way. So, we need to wait until `Auth.JS` officially releases it.

## **How to Run the Application**
---
1. Clone the project in your local system.
2. Open the terminal and install using `pnpm i` (if you're using npm, you might wanna migrate the package manager).
3. Once all the packages are installed, run `pnpm dev` (if you're on development mode). To make a production build, first use `pnpm build`, and then `pnpm start`.
4. The application will be hosted locally on `http://localhost:3000`.
5. To install UI components, make sure you read the [guide](https://ui.shadcn.com/).

## **TODOS**
---
* Add authenticaton with `Clerk` or `Auth.JS`.
* Adding API routes for examples with simple requests.

## **SOCIALS**
---

[![Discord](https://img.shields.io/badge/Discord-%237289DA.svg?logo=discord&logoColor=white)](https://dsc.gg/drvgo) [![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://instagram.com/itsdrvgo) [![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?logo=Twitter&logoColor=white)](https://twitter.com/itsdrvgo) [![YouTube](https://img.shields.io/badge/YouTube-%23FF0000.svg?logo=YouTube&logoColor=white)](https://youtube.com/@itsdrvgo) 