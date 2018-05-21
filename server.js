import express from 'express';
import path from 'path';
// import webpack from 'webpack';
// import webpackConfig from './webpack.config';
// const compiler = webpack(webpackConfig);

const app = express();
// console.log(webpackConfig.output.publicPath);
// app.use(require("webpack-dev-middleware")(compiler, {
//     noInfo: true, publicPath: webpackConfig.output.publicPath
// }));

// app.use(require("webpack-hot-middleware")(compiler));

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
//   // const HTML = `
//   //   <!DOCTYPE html>
//   //   <html>
//   //     <head>
//   //       <meta charset="utf-8">
//   //       <title>Skins DashBoard</title>
//   //       <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
//   //       <link rel="stylesheet" href="/css/styles.css">
//   //     </head>
//   //     <body>
//   //       <div id="root"></div>
//   //       <script type="application/javascript" src="/app.bundle.js"></script>
//   //     </body>
//   //   </html>
//   // `;
  res.sendFile( path.join(__dirname, 'public/index.html') );
//   // res.send(HTML);
})

export default app;