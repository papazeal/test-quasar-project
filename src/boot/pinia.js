import { createPinia } from "pinia";
export default ({ app, router, store }) => {
  // something to do
  console.log("pinia");
  const pinia = createPinia();
  app.use(pinia);
};
