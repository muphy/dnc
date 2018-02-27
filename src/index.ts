import "reflect-metadata";

import { Container } from "typescript-ioc";

import App from "./app";

const app: App = Container.get(App);

app.start();
