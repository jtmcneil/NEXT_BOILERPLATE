This is a custom [Next.js](https://nextjs.org) boilerplate project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). Use this boilerplate to accelerate your dev of custom web apps!

## Getting Started

### 1 - Repository Setup

First, clone into a fresh new git repo:

```bash
mkdir PROJECT_NAME
git clone https://github.com/jtmcneil/NEXT_BOILERPLATE.git PROJECT_NAME/
cd PROJECT_NAME
rm -rf .git
git init
```

Now you have a brand new git repo! Next, update the project name / description in your `package.json` and install the dependencies:

```bash
npm install
```

### 2 - Running the Dev Server

You can now run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
**Welcome to your new app!**

### 3 - Setting Environment Variables

Create a `.env` file in the root directory.

To use the built in **Auth JS** functinoality, add the below variables:

```bash
AUTH_SECRET # or just run npm exec auth secret (may place the secret in a .env.local file)
AUTH_RESEND_KEY # get this one from [resend](https://resend.com/) to enable email sending
```

To connect to your **Postgres DB**, add the below variable:

```bash
USER_DATABASE_URL # set this to your postgres db connection string (try [neon](https://neon.tech//))
```

## Features

-   [Auth JS](https://authjs.dev/) with email only authentication
-   [Prisma ORM](https://www.prisma.io/docs) ready to connect to your database
-   [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite) for easy in-line styling and reponsive design
-   [Shadcn](https://ui.shadcn.com/) for some basic components to get you started
-   [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
