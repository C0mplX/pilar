import Pilar from "./Pilar/Pilar";

const pilar = new Pilar({
  port: 5000,
  cors: true,
  baseRoute: '/api',
  controllers: [],
  middleWares: []
});
pilar.listen();

