# Amanda Welt — tech portfolio

## Local development (auto-refresh)

Run **once** and leave the terminal open — you do not need to restart after each edit:

```bash
npm install --legacy-peer-deps
npm start
```

Open [http://localhost:3000](http://localhost:3000). Saves to `.tsx`, `.css`, and `public/` files hot-reload in the browser.

If changes do not appear on Windows, `.env.development` already enables file polling. Stop with `Ctrl+C` only when you are done for the day.

## Live site (auto-deploy)

Every **push to `main`** triggers [GitHub Actions](.github/workflows/deploy.yml) to build and publish to GitHub Pages.

**One-time setup** (repo [AmandaWelt/tech-portfolio](https://github.com/AmandaWelt/tech-portfolio)):

1. **Settings → Pages → Build and deployment → Source:** `GitHub Actions`
2. Push to `main` — the **Actions** tab shows the deploy workflow
3. Site URL: **https://amandawelt.github.io/tech-portfolio**

Custom domain (`amandawelt.com`): add it under **Settings → Pages → Custom domain** and follow GitHub’s DNS instructions.

## Scripts

### `npm start`

Development server with hot reload (see above).

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
